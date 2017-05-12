'use strict'

$(document).ready(function () {

	var url_api = "https://api.spotify.com/v1/search?q=";

	// on click search, check for valid search inputs and perform search if valid
	$(".search-form").on("submit", function(event) {

		event.preventDefault();

		$(".album-details").hide();
		$(".album-list").show();

		var search = $("#search").val().trim();

		// Validate the if empty
		if(search === ""){

			$(".album-list").html('<li class="desc"><i class="material-icons icon-help">help_outline</i>Please enter an album title to seach :X</li>');

			return false

		}else{

			// perform an AJAX function to connect Spotify API
			$.ajax({
				url: url_api + search +"&type=album",
				type: "GET",
				dataType: "json",
				success: function(response){

					var albumHTML = '';

						//console.log("items", item.images[0].url);
						if(response.albums.items.length > 0){	

							$.each( response.albums.items, function(index, item){
								
								albumHTML += '<li>';
								//albumHTML += '<a class="album-link" href="'+item.external_urls.spotify+'" target="_blank">';
								albumHTML += '<a href="#" class="album-link" data-albumid="'+item.id+'">';
								albumHTML += '<div class="album-wrap"><img class="album-art" src="'+item.images[0].url+'"></div>';
								albumHTML += '</a>';
								albumHTML += '<span class="album-title">'+item.name+'</span>';
								albumHTML += '<span class="album-artist">'+item.artists[0].name+'</span>';
								albumHTML += '</li>';

							});// end each

						}else{

							albumHTML += '<li class="no-albums desc">';
		                    albumHTML += '<i class="material-icons icon-help">help_outline</i>No albums found that match: '+ search;
		                    albumHTML += '</li>';
						}
					
					$(".album-list").html(albumHTML);
				
				} // success

			}); // end ajax

		} //end else condition

 	}); // end of submit

	// Get the Album Details
 	$(".album-list").on('click', 'li a', function (event) {
 	
        event.preventDefault();

        $(".album-list").hide();
        $(".album-details").empty();
        $(".album-details").show();

        // get the album ID
        var albumId = $(this).data('albumid');
     	
     	//call album details
        $.ajax({
         	url: "https://api.spotify.com/v1/albums/"+albumId,
         	type: "GET",
         	dataType: "json",
         	success: function(data) {

         		//console.log(data);

         		var albumDetails = "";

         		albumDetails += '<div class="album-header">';
         		albumDetails += '<div class="inner">';
         		albumDetails += '<p class="close"><a href="#"> <i class="back-icon"></i>  Search results</a></p>';
         		albumDetails += '<div class="img-left"><img src="'+data.images[0].url+'">';
         		albumDetails += '<div class="smallH2"><a href="'+data.external_urls.spotify+'" target="_blank"><i class="music-icon"> Listen to Album</i></a></div>';
         		albumDetails += '</div>';
         		albumDetails += '<div class="content-right">'
         		albumDetails += '<h2>'+data.name+'</h2>'
         		albumDetails += '<span>'+data.artists[0].name+'</span>'
         		albumDetails += '<h3>Track List:</h3>'

         		// loop the items of track list
         		albumDetails += '<ol>';
         		for (var i = 0; i < data.tracks.items.length; i++){
         			albumDetails += '<li>'+data.tracks.items[i].name+'</li>';
         		}

         		albumDetails += '</ol>';
         		albumDetails += '</div>' //end of .content-right
         		albumDetails += '</div>' //end of .inner
         		albumDetails += '</div>' //end of .album-header

         		// show album details
         		$(".album-details").html(albumDetails);

         	}
        });

    });

    // on click back, hide movie details and show movies list
	$(".album-details").on("click", ".close", function(e) {
	
	  	e.preventDefault();
	 
	   	$(".album-list").show();
       	$(".album-details").hide();
	
	});
  

}); // End of ready()

