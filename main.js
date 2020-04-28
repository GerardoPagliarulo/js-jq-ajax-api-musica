/**
 * Esercizio Dischi
 * 
 *  - Attraverso una chiamata ajax all’Api 
 *    di boolean avremo a disposizione una decina di dischi musicali. 
 *  - Servendoci di handlebars stampiamo tutto a schermo.
 *  - In questo momento non è importante la parte grafica.
 *  - Bonus: 
 *    Creare una select con i seguenti generi: 
 *    pop, rock, metal e jazz. 
 *    In base a cosa scegliamo nella select vedremo i corrispondenti cd.
 */
$(document).ready(function() {
	var myApi = 'https://flynn.boolean.careers/exercises/api/array/music';
	var cdsContainer = $('.cds-container');
	// Init Handlebars
	var source = $('#cds-template').html();
	var template = Handlebars.compile(source);
	// Stampare a schermo i cd
	$.ajax({
		url: myApi,
		method: 'GET',
		success: function (data) {
			var cds = data.response;
			//console.log('Array cd:', cds);
			for(var i = 0; i < cds.length; i++) {
				var item = cds[i];
				//console.log(item);
				var cd = template(item);
				//console.log(cd);
				cdsContainer.append(cd);	
			}	
		},
		error: function () {
			console.log('Errore chiamata API');
		}
	});
	// Scelta genere musicale
	var choice = $('#music-genre');
	$('body').on('change', choice, function () {
		$('.cd').hide();
		var genre = choice.val();
		//console.log(genre);
		$.ajax({
			url: myApi,
			method: 'GET',
			success: function (data) {
				var cds = data.response;
				//console.log('Array cd:', cds);
				for(var i = 0; i < cds.length; i++) {
					var item = cds[i];
					//console.log(item);					
					var genreChosen = item.genre;
					//console.log(genreChosen);
					if (genre === '') {
						var cd = template(item);
						//console.log(cd);
						cdsContainer.append(cd);
					}		
					else if (genreChosen.toLowerCase() === genre) {
						var cd = template(item);
						//console.log(cd);
						cdsContainer.append(cd);
					}
				}
			},
			error: function () {
				console.log('Errore chiamata API');
			}
		});
	});
});