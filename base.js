
function fire() {
		$.ajax({
				    type: 'GET', 
				    url: 'http://us.battle.net/api/wow/character/Mannoroth/Usiris?fields=items,stats,talents',
				  //  url: 'http://us.battle.net/api/wow/character/'+player.rel+'/'+player.name+'?fields=items', 
				    dataType: 'jsonp', 
				    success: main, 
				    error: function() { console.log('Uh Oh!'); },
		 		   jsonp: 'jsonp'
				});

	
	document.getElementById("mainForm").onsubmit = function (event) {
		
		var player = {
			name: $(".name").val(),
			rel: $(".rel").val(),
		};
		var options = {
			haste: $(".haste").val(),
		};
		if(options.haste == 0) {
			//fail option
			console.log("=0"+ options.haste)
		}
		else {
			//pass option
			console.log("else"+options.haste)
		}
		//http://us.battle.net/api/wow/character/Mannoroth/Usiris?fields=items
				/*$.ajax({
				    type: 'GET', 
				    url: 'http://us.battle.net/api/wow/character/Mannoroth/Usiris?fields=items',
				  //  url: 'http://us.battle.net/api/wow/character/'+player.rel+'/'+player.name+'?fields=items', 
				    dataType: 'jsonp', 
				    success: main, 
				    error: function() { console.log('Uh Oh!'); },
		 		   jsonp: 'jsonp'
				});
					//*/
		event.preventDefault();
	}
}
var main = function(data) {
	//console.log(data);
	setUp(data);//init?

	


	function checkEnchant(data) {	
		
		var baseLoop = data.items;
		//console.log(baseLoop);
		var count = 0;
		var newEnchant = [],
			newArray = [],
			gemArray = [],
			gemArray1 = [],
			gemArray2 = [],
			gemArray3 = [];


		for (var key in baseLoop) {
			var item = baseLoop[key];
			if(item.hasOwnProperty("tooltipParams")) {
				newArray.push(item);
			}
		}//end for
		for(var key2 in newArray) {
			var item2 = newArray[key2];
			if(item2.tooltipParams.hasOwnProperty("enchant")) {
				newEnchant.push(item2);
			}
			//below is nothing, keeping it in for reasons
			if(item2.tooltipParams.hasOwnProperty("gem0")) {
				if(item2.tooltipParams.hasOwnProperty("gem1")) {
					gemArray2.push(item2);
					//console.log("gem2"+gemArray2)
						if(item2.tooltipParams.hasOwnProperty("gem2")) {
								gemArray3.push(item2);
					//	console.log("gem3"+gemArray3)
						
						}
				}

				gemArray1.push(item2);	
			}


		}//end for

	//	console.log("gem array "+gemArray1);
	//	console.log("ehcnat array "+newEnchant.length);
		if(newEnchant.length < 9){
			//console.log("nope");
			return false;
		}
		else {
			
			//console.log(newEnchant);
			return true;
		}
	}//end check enchant
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



	function setUp(data) {
		var stats = {
			name: data.name,
			race: data.race,
			rel: data.realm,
			//thumb: "http://lorempixel.com/150/150/",
			spec: data.talents[0].spec.name,
			specIcon: data.talents[0].spec.icon,
			hit: Math.floor(data.stats.hitPercent),
			haste: Math.floor(data.stats.hasteRating),
			crit: Math.floor(data.stats.crit),
			thumb: "http://us.battle.net/static-render/us/"+data.thumbnail,
		};
		console.log(data);
		var objectSize = Object.keys(data.items).length;
		stats.hit = Math.floor(data.stats.hitPercent);
			switch(data.class) {
				case 1: 
					stats.class = "Warrior";
				break;
				case 2: 
					stats.class = "Paladin";
				break;
				case 3: 
					stats.class = "Hunter";
				break;
				case 4: 
					stats.class = "Rogue";
				break;
				case 5: 
					stats.class = "Priest";
				break;
				case 6: 
					stats.class = "Death Knight";
				break;
				case 7: 
					stats.class = "Shaman";
				break;
				case 8: 
					stats.class = "Mage";
				break;
				case 9: 
					stats.class = "Warlock";
				break;
				case 10: 
					stats.class = "Monk";
				break;
				case 11: 
					stats.class = "Druid ";
				break;
			}
			switch(data.race) {
				case 5:
					stats.race = "Tauren";
					break;
				case 5:
					stats.race = "Undead";
					break;
				case 2:
				stats.race = "Orc";
					break;
				case 7:
				stats.race = "Gnome";
					break;
				case 9:
				stats.race = "Goblin";
					break;
				case 1:
				stats.race = "Human";
					break;
				case 8:
				stats.race = "Troll";
					break;
				case 24:
				stats.race = "Pandaren";
					break;
				case 11:
				stats.race = "Draenei";
					break;
				case 22:
				stats.race = "Worgen";
					break;
				case 10:
				stats.race = "Blood Elf";
					break;
				case 4:
				stats.race = "Night Elf";
					break;
				case 3:
				stats.race = "Dwarf";
					break;
				case 25:
				stats.race = "Pandaren";
					break;
				case 26:
			}
		if (objectSize < 17) {
			

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
			checkEnchant(data);
			
		}
		//console.log(data.items);
		setDown(data, stats);
	//console.log(stats);
	}














			//console.log(data);
		}//end main object

		$(document).ready(function(){
			fire();
		});