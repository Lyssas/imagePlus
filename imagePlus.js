/**
 * Place your JS-code here.
 */
 
	
$(document).ready(function(){
	'use strict';

      	/**
	*  imagePlus jQuery plugin
	*
	*  Plugin contins:
	*  - Lightbox
	*  - Gallery
	*  - Timed Slideshow
	*  - Change on click slideshow
	*
	**/
      	
   	(function($) 
      	{
      		$.fn.imagePlus = function(options) 
      		{
      			options = $.extend({}, $.fn.imagePlus.defaults, options);
      			
      			/**
      			* Change on click Slideshow
      			*/
      			if ($('#clickSlideshow img').length > 0) 
      			{

				var sizeOfClickSlideshow = $('#clickSlideshow img').length,
				nextClickSlideshowImage,
				previousClickSlideshowImage,
				clickSlideshowCurrent = sizeOfClickSlideshow;
				
				nextClickSlideshowImage = function() 
				{
					if(clickSlideshowCurrent == sizeOfClickSlideshow)
					{
						clickSlideshowCurrent = 1;	
					}
					else
					{
						clickSlideshowCurrent += 1;	
					}
					$('#clickSlideshowContainer img').each(function() 
					{
						var z = $(this).css('z-index'),
						next = sizeOfClickSlideshow - 1;
						
					
						if(z < sizeOfClickSlideshow)
						{
							var newZ = parseInt(z) + 1;
							$(this).css({'z-index': newZ});
							if(z == next)
							{
								$(this).fadeToggle(parseInt(options.clickFadeSpeed));	
							}
						}
						else
						{	
							$(this).css({'z-index': 1});
							$(this).fadeToggle(parseInt(options.clickFadeSpeed));
						}	
						
						
						
					});
					
					//change the selector
					for(var i = 1; i <= sizeOfClickSlideshow; i++)
					{
						if(i != clickSlideshowCurrent)
						{
							$('#clickSlideshowNode'+i)
							.attr('src', 'imagePlus/img/unselected.png')
						}
						else
						{
							$('#clickSlideshowNode'+i)
							.attr('src', 'imagePlus/img/selected.png')	
						}
					}
				}
				previousClickSlideshowImage = function() 
				{
					if(clickSlideshowCurrent == 1)
					{
						clickSlideshowCurrent = sizeOfClickSlideshow;	
					}
					else
					{
						clickSlideshowCurrent -= 1;	
					}
					$('#clickSlideshowContainer img').each(function() 
					{
						var z = $(this).css('z-index'),
						next = 1;
						
						if(z > next)
						{
							var newZ = parseInt(z) - 1;
							$(this).css({'z-index': newZ});
							if(z == sizeOfClickSlideshow)
							{
								$(this).fadeToggle(parseInt(options.clickFadeSpeed));	
							}
						}
						else
						{	
							$(this).css({'z-index': sizeOfClickSlideshow});
							$(this).fadeToggle(parseInt(options.clickFadeSpeed));
						}		
					});
					//change the selector
					for(var i = 1; i <= sizeOfClickSlideshow; i++)
					{
						if(i != clickSlideshowCurrent)
						{
							$('#clickSlideshowNode'+i)
							.attr('src', 'imagePlus/img/unselected.png')
						}
						else
						{
							$('#clickSlideshowNode'+i)
							.attr('src', 'imagePlus/img/selected.png')	
						}
					}
				}
				//Create the slideshow from the pictures stored in div#sliderContainer 
				$('#clickSlideshowContainer').css({
						'position':'relative',
						'min-width': options.clickSliderWidth,
						'min-height': options.clickSliderHeight
				});
				var i = 1;
				$('#clickSlideshow img').each(function() 
				{
				
					$('<img>')
					.attr('src', $(this).attr('src1'))
					.css({
					'position': 'absolute',
					'z-index': i,
					'width': options.clickSliderWidth,
					'height': options.clickSliderHeight
					})
					.hide()
					.appendTo('#clickSlideshowContainer')
					
					//Add selectors
					$('<img>')
					.attr('src', 'imagePlus/img/unselected.png')
					.attr('id', 'clickSlideshowNode'+i)
					.css({
					'float': 'left',
					})					
					.appendTo('#clickSlideshowWrapper')
				
					if(i == sizeOfClickSlideshow)
					{
						$('#clickSlideshowContainer img').last().fadeToggle(1);
						
						//Add selected
						$('#clickSlideshowNode'+i)
						.attr('src', 'imagePlus/img/selected.png')
					}
					i++;	
				});
				//Create UI
				$('<img>')
					.attr('src', 'imagePlus/img/next.png')
					.attr('id', 'clickSlideshowNext')
					.css({
					'float': 'right',
				
					})					
					.appendTo('#clickSlideshowWrapper')
				$('<img>')
					.attr('src', 'imagePlus/img/previous.png')
					.attr('id', 'clickSlideshowPrevious')
					.css({
					'float': 'right',
					
					})					
					.appendTo('#clickSlideshowWrapper')
				
				$('<div>')
					.css({
					'clear': 'both',
					})					
					.appendTo('#clickSlideshowWrapper')
			
				//Change image on click
				$('#clickSlideshowNext').click(function()
				{
					nextClickSlideshowImage();								
				});
				$('#clickSlideshowPrevious').click(function()
				{
					previousClickSlideshowImage();								
				});
      			};
      		
      			/**
      			* Change on timer Slideshow
      			*/
      			if ($('#timerSlideshow img').length > 0) 
      			{
      				//Set variables
      				var sizeOfTimerSlideshow = $('#timerSlideshow img').length,
				intervallId = null,
				changeSlideshow,
				timerSlideshowCurrent = sizeOfTimerSlideshow,
				timerSlideshowPlay,
				timerSlideshowPause,
				timerSlideshowPlaying = true;
				
				//Build the slideshow from the images in div#timerSlideshow
				$('#timerSlideshowContainer').css({
						'position':'relative',
						'min-width': options.timerSliderWidth,
						'min-height': options.timerSliderHeight
				});
				
				var i = 1;
				$('#timerSlideshow img').each(function() 
				{			
					$('<img>')
					.attr('src', $(this).attr('src1'))
					.css({
						'position': 'absolute',
						'z-index': i,
						'width': options.timerSliderWidth,
						'height': options.timerSliderHeight
					})
					.hide()
					.appendTo('#timerSlideshowContainer')
					
					if(options.timerInterfaceSelectors = true)
					{
						//Add selectors
						$('<img>')
						.attr('src', 'imagePlus/img/unselected.png')
						.attr('id', 'timerSlideshowNode'+i)
						.css({
						'float': 'left',
						})					
						.appendTo('#timerSlideshowWrapper')
					}
					if(i == sizeOfTimerSlideshow)
					{
						$('#timerSlideshowContainer img').last().fadeToggle(1);	
						
						if(options.timerInterfaceSelectors = true)
						{
							//Add selected
							$('#timerSlideshowNode'+i)
							.attr('src', 'imagePlus/img/selected.png')
						}
					}
					i++;
						
				});
				//Create UI
				if(options.timerInterfacePlay = true)
				{
					$('<img>')
						.attr('src', 'imagePlus/img/pause.png')
						.attr('id', 'timerSlideshowPlaytoggle')
						.css({
						'float': 'right',
					
						})					
						.appendTo('#timerSlideshowWrapper')
				}
				//Set timer and function on intervall
				intervallId = setInterval(function(){changeSlideshow();}, options.timerChangeFrequency);				
				
				timerSlideshowPlay = function()
				{
					$('#timerSlideshowPlaytoggle')
					.attr('src', 'imagePlus/img/pause.png')
					intervallId = setInterval(function(){changeSlideshow();}, options.timerChangeFrequency);
				}
				
				timerSlideshowPause = function()
				{
					$('#timerSlideshowPlaytoggle')
					.attr('src', 'imagePlus/img/play.png')
					window.clearInterval(intervallId);
				}
				
				$('#timerSlideshowPlaytoggle').click(function()
				{
					if(timerSlideshowPlaying == true)
					{
						timerSlideshowPlaying = false;
						timerSlideshowPause();	
					}
					else
					{
						timerSlideshowPlaying = true;
						timerSlideshowPlay();
					}
					
				});
				
				//Change image
				changeSlideshow = function()
				{
					if(timerSlideshowCurrent == sizeOfClickSlideshow)
					{
						timerSlideshowCurrent = 1;	
					}
					else
					{
						timerSlideshowCurrent += 1;	
					}
					$('#timerSlideshowContainer img').each(function() 
					{
						var timerZ = $(this).css('z-index'),
						next = sizeOfTimerSlideshow - 1;
						
						if(timerZ < sizeOfTimerSlideshow)
						{
							var newTimerZ = parseInt(timerZ) + 1,
							fadeSpeed = options.timerFadeSpeed
							$(this).css({'z-index': newTimerZ});
							if(timerZ == next)
							{
								$(this).fadeToggle(parseInt(options.timerFadeSpeed));	
							}
						}
						else
						{	
							$(this).css({'z-index': 1});
							$(this).fadeToggle(parseInt(options.timerFadeSpeed));
						}
						
					});
					//change the selector
					for(var i = 1; i <= sizeOfTimerSlideshow; i++)
					{
						if(i != timerSlideshowCurrent)
						{
							$('#timerSlideshowNode'+i)
							.attr('src', 'imagePlus/img/unselected.png')
						}
						else
						{
							$('#timerSlideshowNode'+i)
							.attr('src', 'imagePlus/img/selected.png')	
						}
					}
				};
      			};
      			
      			/**
      			* Gallery
      			*/
      			if ($('.imagePlusGallery-all img').length > 0) 
      			{
				var current = null,
				galleryHeight = options.galleryWidth / (4/3) + options.galleryPadding * 3;
				
				//Adjusts the sise of the gallery to fit more small images
				if($('.imagePlusGallery-all img').length*51.375 > options.galleryWidth*2)
				{
					var extraRows = Math.ceil(($('.imagePlusGallery-all img').length*51.375)/options.galleryWidth)-2;
					galleryHeight += 2*51.375*extraRows;
				}
					
				$('.imagePlusGallery').css({
						'width': options.galleryWidth+'px',
						'min-height':galleryHeight+'px',
						'padding':options.galleryPadding+'px',
						'background-color':options.galleryColor,
						'margin':'0 auto',
						'margin-bottom':'5em'
						});
				$('.imagePlusGallery-current').css({
						'height': galleryHeight-80-options.galleryPadding*3-51.375*extraRows+'px',
						'width': options.galleryWidth-options.galleryPadding*2+'px',
						'margin': '0 auto',
						'margin-bottom': options.galleryPadding+'px'
							});
				$('.imagePlusGallery-current img').css({
						'display': 'block',
						'margin': '0 auto',
						'padding': 0,
						'float': 'none',
						'max-width': options.galleryWidth-options.galleryPadding*2+'px',
						'max-height': galleryHeight-80-options.galleryPadding*3-(51.375*extraRows)+'px', 
						//'max-height': '200px', 
							});
				$('.imagePlusGallery-all').css({
						'width': options.galleryWidth-options.galleryPadding*2+'px',
						'margin': '0 auto'
							});
				$('.imagePlusGallery-all img').css({
						'float': 'left',
						'border': '1px solid transparent',
						'padding': '3px',
						'width': '40px',
						'height': '40px'
							});
				
				$('.imagePlusGallery-all img').mouseenter(function(){
					
						$(this).css({'border-color': options.gallerySelectorColor});
					
				});
				
				$('.imagePlusGallery-all img').mouseleave(function(){
					if(!$(this).hasClass('selected'))
					{
						$(this).css({'border-color': 'transparent'});
					}
				});
				
				
			
				$('.imagePlusGallery-all img').each(function() 
				{
					$(this)
					.attr('src', $(this).attr('src1') + '?w=' + $(this).width() + '&h=' + $(this).height() + '&crop-to-fit')
					.click(function() 
					{
						
						if(!current) 
						{
							current = this;
							console.log("Set current.");
						} 
						else 
						{
							$(current).toggleClass('selected');
							current = this;
							console.log("Toogled current");
						}
						$(this).toggleClass('selected');
						
						
						$('.selected').css({
						
						'border-color': options.gallerySelectorColor,
						
							});
						
						$('.imagePlusGallery-current img').attr('src', $(this).attr('src1') + '?w=' + $('.imagePlusGallery-current').width() + '&h=' + $('.imagePlusGallery-current').height());
						$('.imagePlusGallery-current img').attr('src1', $(this).attr('src1'))
						
						$('.imagePlusGallery-all img').trigger('mouseleave');
						
						console.log("Click on mini image.");
					});																							
					console.log("Gallery image was initiated.");
				});
			    
				$('.imagePlusGallery-all img').first().trigger('click');
				
				//Gallerybox (lightbox to work with the gallery since the extentions to img"src" doesn't work with the original lightbox
				if(options.galleryLightbox === true)
					{
					$('.gallerybox').click(function() 
					{
						var windowHeight = window.innerHeight, 
						windowWidth  = window.innerWidth,
						positionGalleryboxImage,
						removeGallerybox;
						
						positionGalleryboxImage = function() 
						{
							
							var top = ($(window).height() - $('#lightbox').height()) / 2;
							var left = ($(window).width() - $('#lightbox').width()) / 2;
							$('#lightbox')
							.css({
								'top': top,
								'left': left,
								'position':'fixed',
								'z-index': 999
							})
							.fadeIn();
						}
		
						removeGallerybox = function() 
						{
				
							$('#overlay, #lightbox')
							.fadeOut('slow', function() {
							$(this).remove();
							$('body').css('overflow-y', 'auto'); // show scrollbars!
							});
						}
						
						// hide scrollbars!
						$('body').css('overflow-y', 'hidden'); 
						
						
						$('<div id="overlay"></div>')
				    
						.css({
							'opacity': '0',
							'position':'fixed',
							'top':'0',
							'left':'0',
							'height':'100%',
							'width':'100%',
							'background':'#000 url(./img/loader.gif) no-repeat scroll center center',
						})
						.animate({'opacity': options.galleryLightboxDarkness}, 'slow')
						.appendTo('body');
				    
						$('<div id="lightbox"></div>')
						.hide()
						.appendTo('body');
				    
						$('<img id="lbimg">')
						.attr('src', $(this).attr('src1'))
						.css({
						
						'max-height': windowHeight-16,
						'max-width': windowWidth-16,
						'background': '#000000',
						'padding': '8px',
						})
				    
				 
						.load(function() {
								positionGalleryboxImage();
						})	
				    
						.click(function() {
								removeGallerybox();
						})
						.appendTo('#lightbox');
		  
						return false;
			
					
			
					
					});
				};
			
			};
			
			/**
      			* Lightbox
      			*/
			$('.lightbox').click(function() 
			{
				var windowHeight = window.innerHeight, 
				windowWidth  = window.innerWidth,
				lb_imageDescription = $(this).attr('description'),
				lb_imgWidth,
				lb_imgElement;
				
				// hide scrollbars!
				$('body').css('overflow-y', 'hidden'); 
				
				$('<div id="lb_overlay"></div>')
				    
				    .css({
					'opacity': '0',
					'position':'fixed',
					'top':'0',
					'left':'0',
					'height':'100%',
					'width':'100%',
					'background':'#000 url(./img/loader.gif) no-repeat scroll center center',
					})
				    .animate({'opacity': '0.5'}, 'slow')
				    .appendTo('body');
				    
				$('<div id="lb_lightbox"></div>')
				    .css({
				    	'position': 'fixed',
				    	'z-index': '999',
				    	//'border': '5px solid #aabb00',
				    	})
				    .hide()
				    .appendTo('body');
				   
				
				    
				$('<img id="lb_lbimg">')
				    .attr('src', $(this).attr('src'))
				    .css({
						
						'max-height': windowHeight-6,
						'max-width': windowWidth-16,
						'background': '#000000',
						'padding': '8px',
				})
				
				 
				    .load(function() {
					positionLightboxImage();
					
				    })
				    
				    .click(function() {
						    removeLightbox();
				    })
				    .appendTo('#lb_lightbox');
				

					$('<div>')
					.attr('id', 'lb_imageDescription')
						.css({
						'background': '#000',
						'color': '#FFF',
						'padding-top' : '2px',
						'padding-left' : '4px',
						'padding-right' : '4px',
						'position': 'relative',
						'top': '-63px',
						'border-top': '2px solid #000',
						'border-bottom': '8px solid #000',
						'border-left': '8px solid #000',
						'border-right': '8px solid #000',
						'text-align': 'center',
						'height': '50px',
						'overflow-y': 'auto',
						'overflow-x': 'hidden',
						'width': '0',
					})
					.appendTo('#lb_lightbox');
					
					$('<p>')
					.text(lb_imageDescription)
					.appendTo('#lb_imageDescription');
				
				
					
				    return false;
			
				});
			
				function positionLightboxImage() {
					var top = ($(window).height() - $('#lb_lightbox').height()) / 2+34;
					var left = ($(window).width() - $('#lb_lightbox').width()) / 2;
					//alert($('#lb_lightbox').width());
					$('#lb_lightbox')
					.css({
							'top': top,
							'left': left,
							'position': 'fixed',
				    	'z-index': '999',
					})
					
					.fadeIn();
					
					//lb_imgElement = document.getElementById('lb_lightbox'); 
					//lb_imgWidth = 
					//alert($('#lb_lightbox').width());
					$('#lb_imageDescription')
					.css({
						
						'width': $('#lb_lightbox img').width()-7,
						
					})
				}
		
				function removeLightbox() 
				{
				
					$('#lb_overlay, #lb_lightbox')
					.fadeOut('slow', function() {
						$(this).remove();
						$('body').css('overflow-y', 'auto'); // show scrollbars!
				});
			}
				
		};
 
      	$.fn.imagePlus.defaults = 
      	{
      		'clickSliderWidth'		:  	'874px',
      		'clickSliderHeight'		:  	'300px',
      		'clickFadeSpeed'		:  	'1300',
      		
      		'timerSliderWidth'		:  	'874px',
      		'timerSliderHeight'		:  	'300px',
      		'timerChangeFrequency'		:  	'7000',
      		'timerFadeSpeed'		:  	'2000',
      		'timerInterfaceSelectors'	:	true,
      		'timerInterfacePlay'		:	true,
      		
      		'galleryPadding'		:	'10',
		'galleryWidth'			:	'800', //Height gets set in proportion
		'galleryColor'			:	'#333333',
		'gallerySelectorColor' 		:	'#FFFFFF',
		'galleryLightbox'		:	true, //Set to FALSE to disable integrated lightbox
		'galleryLightboxDarkness' 	:	'0.5', //0 = invissible, 1 = complete utter darkness 
		
		'lightboxDarkness' 		:	'0.5', //0 = invissible, 1 = complete utter darkness 
      	}     	
 
}) (jQuery);
      	     	
   	
});
 
