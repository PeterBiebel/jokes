
$('.newJoke').click(function() {
 // console.log('hello')
  $('.text').text('loading . . .');
  
  $.ajax({
    type:"GET",
    headers: { Accept: "application/json" },
    url:"https://icanhazdadjoke.com/",
    success: function(data) {
      console.log(data);
      $('.text').text(data.joke);
      $('.like').data('jokeData', data);
    }
  });
});


$('.like').click(function() {
    let data = $(this).data('jokeData');

    //console.log(data.joke);
    //now ajax post to server attaching the joke 
    $.ajax({
     type: "POST",
     
    
     url: '/profile',
     data: data,
     success: function(result) {

		     	//after pushing jokes to jokes array this function runs
        console.log(result);
      //  $(`ul`).append(`<li>${result.joke}</li>`); 

        $('#lastJoke').text(`${result.joke}`)
     }
    });
});
$('.remove').click(function() {
	console.log('Funny');
	console.log(this.id);
	let id = this.id

	$.ajax({
		type: "POST",
		url: '/jokes',
		data: {id: id},
		
		success: function(result) {
			$('#'+ result.removed).parent().remove()
			console.log(result);
		}
	})

})

$('.gif').click(function() {
 // console.log('hello')
  $('.text').text('loading . . .');
  let genre = $('#genre').val()
  console.log(genre)
 //let quries = ['funny', 'hilarious', 'comedy', 'silly', 'falling']
  $.ajax({
    type:"GET",
    headers: { Accept: "application/json" },
    //url:`https://api.giphy.com/v1/gifs/search?api_key=5xOGj5sWBGCfWMgNEI6QzaizPACyG6G4&q=${quries[Math.floor(Math.random() * 1)]}&limit=1000`,
    url:`https://api.giphy.com/v1/gifs/search?api_key=5xOGj5sWBGCfWMgNEI6QzaizPACyG6G4&q=${genre}&limit=1000`,
    success: function(result) {
      console.log(result);
      let gif = result.data[Math.floor(Math.random() * 1000)].embed_url
      $('.gifText').html(`<iframe src=${gif} frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>`);
     $('.gifLike').data('gifData', {joke:gif, gif:true, id:Date.now()});
    }
  });
});
$('.gifLike').click(function() {
    let data = $(this).data('gifData');

    //console.log(data.joke);
    //now ajax post to server attaching the joke 
    $.ajax({
     type: "POST",
     
    
     url: '/profile',
     data: data,
     success: function(result) {

		     	//after pushing jokes to jokes array this function runs
        console.log(result);
      //  $(`ul`).append(`<li>${result.joke}</li>`); 

        $('#lastJoke').text(`${result.joke}`)
     }
    });
});
//$('.delete').click(function(){ 
//	let id = $(this).parent().data('id');
//	let p = $(this).parent()
//	$.ajax({
//	    url: '/delete-comment',
//	    type: 'DELETE',
//	    data:{ id : id},
//	    success: function(result) {
//	    	console.log(result)
//	    	p.remove()
	    	//$('li').find(`[data-id='${id}']`).remove()
	        // Do something with the result
//	    }
//	});

