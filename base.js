

		$(document).ready(function(){
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

			
				$.test({
							name: player.name, //player.name,
							rel:  player.rel,  //player.rel,
						});//fire plugin/
					/*$.test({
							name: "usiris", //player.name,
							rel:  "Mannoroth",  //player.rel,
						});//fire plugin*/

						/*$.test({
							name: "leica", //player.name,
							rel:  "alexstrasza",  //player.rel,
						});//fire plugin*/
		event.preventDefault();
	}//end onsubmit

			
		});













