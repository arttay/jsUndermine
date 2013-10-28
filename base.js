

		$(document).ready(function(){
			/*$.test({
				name: "Usiris",
				rel: "Mannoroth",
			});*/
				document.getElementById("mainForm").onsubmit = function (event) {
		/*
			When user hits submit, this will fire. 
			It will grab the data that the user entered, no validation atm
			The if statment doesnt do anyhting atm, but will provide some small validation in the future for the "admin panel"
			event.preventdefault prevents the form from sending data to a server.

		*/
		var player = {
			name: $(".name").val(),
			rel: $(".rel").val(),
		};
		var options = {
			haste: $(".haste").val(),
			unenchant: $(".unenchant").val(),
		};
	
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
			
					
						$.test({
							name: "leica", //player.name,
							rel:  "alexstrasza",  //player.rel,
						});//fire plugin
		event.preventDefault();
	}//end onsubmit

			
		});













