 /****fix header***/
	
			  $(window).scroll(function(){
			  var sticky = $('.header'),
				scroll = $(window).scrollTop();
			  
			  if (scroll >= 100) sticky.addClass('fixed');
			  else sticky.removeClass('fixed');
			  });
		
		  
           /****number count***/
						var minus = document.querySelector("#minus");
						var plus = document.querySelector("#plus");
						var input = document.querySelector("#input");

						var quantity = 1;

						input.value = quantity;

						minus.addEventListener('click', function(event){
						  if (quantity > 1) {
							  quantity --;
							input.value = quantity;
						  }
						});

						plus.addEventListener('click', function(event){
						  quantity ++;
						  input.value = quantity;
						});
					
					  
				 /****collection slider***/
					 
					    $('#collection-slide').owlCarousel({
							loop:true,
							margin:30,
							nav:true,
							responsive:{
								0:{
									items:1
								},
								600:{
									items:2
								},
								1000:{
									items:3
								}
							}
						})
					
					  
					    /****road map effect***/
					
	  $(document).ready(function($){
	var $timeline_block = $('.cd-timeline-block');

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(){
		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		$timeline_block.each(function(){
			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
});
