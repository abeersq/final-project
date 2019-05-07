
$(document).ready(function () {

    var key = 'AIzaSyDMg2tv0HPvkVMk-ov54j6eSMcd8CctTFI';
    var playlistId = 'PLWKjhJtqVAblv09G3sFgRMSeR0jnKQmJ9';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#vid1').html(`
					<iframe width="350" height="250" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }


    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;


            $('main').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
									<p>${desc}</p>
								</div>

							</article>
						`);
        });
    }

		// CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});


$('#search_button').click(function() {
 $('#search').toggleClass('active');
 function searchByKeyword() {
   var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});
}
   for(var i in results.items) {
     var item = results.items[i];
     Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
   }
});
