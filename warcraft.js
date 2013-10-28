(function($) {

    $.test = function(options) {
    	getChar(options);//fires everything
    

    	

    	function getChar(options) {
    		console.log("getchar");
		    	
		    		function capitaliseFirstLetter(string)
				{
				    return string.charAt(0).toUpperCase() + string.slice(1);
				    //function that caps the first letter in whatever string is being passed into the function
				}
				
				opName = capitaliseFirstLetter(options.name);//caps player name
				relName = capitaliseFirstLetter(options.rel);//caps players rel name

					$.ajax({
								/*this grabs the players data
								it brings in the items, stats and talents api from the battle.net api
								items is used to compare what a player has on to that item to check if the number 
								of gem slots is equal to the number of gems the player has.

								stats just grabs the players stats, may be used for more in the future
								talents is more player data, but can be used by the end user for more detail
								*/



							    type: 'GET', 
							    url: 'http://us.battle.net/api/wow/character/'+relName+'/'+opName+'?fields=items,stats,talents',
							  //  url: 'http://us.battle.net/api/wow/character/'+player.rel+'/'+player.name+'?fields=items', 
							    dataType: 'jsonp', 
							    success: function(data){main(data, options); },
							    error: function() { console.log('Uh Oh!'); },
							    statusCode: {
								    404: function() {
								      $().html("not working");
								  }
								    },
					 		   jsonp: 'jsonp'
							});
				}//end getChar


function main(data, options) {
	console.log("main");
var chcek = null; //used to return, keep null
	//console.log(options.unenchant);
	//console.log(data);
	setUp(data, options);//init?
	function setUp(data, options) {
		var  dStats = data.stats;
		var stats = {
			name: data.name,
			race: data.race,
			rel: data.realm,
			thumb: "http://lorempixel.com/150/150/",
			spec: data.talents[0].spec.name,
			specIcon: data.talents[0].spec.icon,
			hit: Math.floor(dStats.hitPercent),
			haste: Math.floor(dStats.hasteRating),
			crit: Math.floor(dStats.crit),
			agi: Math.floor(dStats.agi),
			str: Math.floor(dStats.str),
			sp: dStats.spellPower, 
			pass: false,
			//thumb: "http://us.battle.net/static-render/us/"+data.thumbnail,
		};
		

		//console.log(data);
		var objectSize = Object.keys(data.items).length;
		stats.hit = Math.floor(dStats.hitPercent);


	switch(data.class){case 1:stats.class="Warrior";break;case 2:stats.class="Paladin";break;case 3:stats.class="Hunter";break;case 4:stats.class="Rogue";break;case 5:stats.class="Priest";break;case 6:stats.class="Death Knight";break;case 7:stats.class="Shaman";break;case 8:stats.class="Mage";break;case 9:stats.class="Warlock";break;case 10:stats.class="Monk";break;case 11:stats.class="Druid ";break}switch(data.race){case 5:stats.race="Tauren";break;case 5:stats.race="Undead";break;case 2:stats.race="Orc";break;case 7:stats.race="Gnome";break;case 9:stats.race="Goblin";break;case 1:stats.race="Human";break;case 8:stats.race="Troll";break;case 24:stats.race="Pandaren";break;case 11:stats.race="Draenei";break;case 22:stats.race="Worgen";break;case 10:stats.race="Blood Elf";break;case 4:stats.race="Night Elf";break;case 3:stats.race="Dwarf";break;case 25:stats.race="Pandaren";break;case 26:}

		checkEnchant(data, stats, options);



/*
		if (objectSize < 17) {
			
			stats.pass = "No";

			//console.log(objectSize+" < 17");
		}
		else {
			if(data.stats.htiPercent > 14.8) {
				//console.log("yes on hit");
			
			}			
			else {
			//	console.log("no on hit");
			
			}
			//console.log(objectSize+" > 17");
			//console.log(data);
			if(checkEnchant(data) == true && checkGems(data) == true) {
				stats.pass = "Yes";
				setDown(data, stats);
			}
			else {
				setDown(data, stats);
			}
			
		}
		//console.log(data.items);
		
	//console.log(stats);
	*/
	}//end setup



	function checkEnchant(data, stats, options) {	


		
		var baseLoop = data.items;//caches base item for loop
		//console.log(baseLoop);
		var count = 0;
		var newEnchant = [],
			newArray = [],
			gemArray = [],
			gemArray1 = [],
			gemArray2 = [],
			gemArray3 = [];
			//these may be not used


		for (var key in baseLoop) {
			//looks for a property tooltipParams, this gets rid of all items like shirts and tabards
			//this logic may be flawd, look at latter 
			var item = baseLoop[key];
			if(item.hasOwnProperty("tooltipParams")) {
				newArray.push(item);//pushes the item into an array, to be proccessed latter
			}
		}//end for

		//http://us.battle.net/api/wow/item/18803
		for(var key2 in newArray) {
			var item2 = newArray[key2];
			//finds peoperty enchants, which tells the app that the item has an enchant
			if(item2.tooltipParams.hasOwnProperty("enchant")) {
				newEnchant.push(item2);//pushes item into an array for all items that have enchants
			}
		
		}//end for

	//	console.log("gem array "+gemArray1);
	//	console.log("ehcnat array "+newEnchant.length);
		if(newEnchant.length < 9){
			//if new enchant is less than 9, the player has less than 9 items on atm
			//console.log("nope");

			stats.pass = false;
		}
		else {
			stats.pass = true;
			//console.log(newEnchant);
			
		}
		checkGems(data, stats)
	}//end check enchant



	function checkGems(data, stats) {

		var baseItem = data.items; //caches base item for loops
		var itemID = null; 
	
		//var charData = data; //used capture data so it can be sent in ajax request latter
		var charData = jQuery.extend(true, {}, data);
		console.log(charData);
		
		dance:
		for(var key in baseItem) {
			//console.log(stats);
			var item = baseItem[key];
				if(typeof(item) === 'object') {//drills to items object then checks each property in that if it is an object
					itemID = item.id;//sets itemID to the id of the object, why is this here?
						//console.log(stats);
						(function(stats, charData) {
												
						$.ajax({
								
							    type: 'GET', 
							    url: 'http://us.battle.net/api/wow/item/'+itemID,
						
							    dataType: 'jsonp', 

							  
							    success: function(data){
							    		queryItem(data, charData, stats);
							    		//console.log(charData);
							  
							    	 },//end success function
							    error: function() { console.log('Uh Oh!'); },
							    statusCode: {
								    404: function() {
								      $().html("not working");
								      //used as a 404 pag, not working yet
								  }
								    },
								    complete: function(){
								    	console.log("complete " +stats.pass);
								    },
								  
								    
								
					 		   jsonp: 'jsonp'
							}).responseText;//end ajax
						//console.log(stats);
					if(stats.pass == false) {
						console.log("after ajax fail");
					}
												})(stats, charData);
																//console.log(testmeh);

						
				
				}//end if
		}//end for

		function queryItem(data, charData, stats) {
			console.log(charData);
		//console.log(g); //data checking
			var realID = data.id; //cheche id for the id of the item that is being passed to the function 
			var baseItem = charData.items; //chache base for loop
			var gemCount = 0; // no idea what this does
			var meh = true;//var used to return 
			//console.log(charData);
			
			var socketInfo = data.socketInfo;
			//console.log(socketInfo);
			if(typeof(socketInfo) != 'undefined') {
				
				var objectSize = Object.keys(socketInfo.sockets).length;//how many sockets item has on it, item api
				//console.log(socketInfo.sockets);
				for(var key in baseItem) {
					
					var item = baseItem[key];
					var charID = item.id;
					var charName = item.name;
						if (realID == charID) {
							var gem1 = [],//holds data for 1st gem slot
								gem2 = [],//holds data for 2nd gem slot
								gem3 = [], //hold data for 3rd gem slot
								gem0 = []; // hold data for items that dont have gems, but have slots
						for(var key2 in item) {
								var item2 = item[key2];
						
								if(item.tooltipParams.hasOwnProperty("gem2")) { 
								
									gem3.push(item2);
									
									
								}
									if(item.tooltipParams.hasOwnProperty("gem1")) {
										
										gem2.push(item2);

										
										
									}
											if(item.tooltipParams.hasOwnProperty("gem0")) {

													gem1.push(item2);

													//console.log(gem3.length);
											}//end if 3
											else {
										
												gem0.push(item2);
											}
								
								if(objectSize == gem0.length) {
									stats.pass = false;
									console.log("queryItem fail");
									//console.log("0: " + charName+ " "+ stats.pass);
									
									//setDown(data, stats, options)
								}
								else 
								{
									stats.pass = true;
									//console.log("0: " + charName+ " "+ stats.pass);
								}
								

								
							}//end for
					
						}//end if
				}//end for
				
			}//end type of if
	
			//return meh;
		}//end queryItem
		//http://us.battle.net/api/wow/item/18803
		
		//return chcek;

	}//end checlGems

function setDown(data, stats) {
	//console.log(stats);
	var template = $.ajax({
				type: 'GET',
				url: "template.html",
				dataType: 'html',
				global: false,
				async: false,
				success: function(data) {
				return data;
				},
				error: function(xhr, textStatus, error) {
				    	console.log(xhr.statusText);
				    	console.log(textStatus);
				    	console.log(error);
				    },
			}).responseText;
				
				var html = Mustache.to_html(template, stats);
				$(html).appendTo(".output");
}

			//console.log(data);
		}//end main object



		    };//end warcraf
})(jQuery);