
$('.btn').click(function() {
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

    console.log(data.joke);
    //now ajax post to server attaching the joke 
    $.ajax({
     type: "POST",
     contentType: "application/json; charset=utf-8",
     headers: { Accept: "application/json" },
     url: '/profile',
     data: data.joke,
     success: function(result) {
		     	//after pushing jokes to jokes array this function runs
        console.log(result);
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

