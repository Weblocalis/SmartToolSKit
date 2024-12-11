(function($) {
    'use strict';
	
	/* sticky nav 2 */
    var headers1 = $('.trp_nav_area');
    $(window).on('scroll', function() {

        if ($(window).scrollTop() > 200) {
            headers1.addClass('hbg2');
        } else {
            headers1.removeClass('hbg2');
        }		
    });		
	    /*---------------------
    	Mobile Menu
		--------------------- */
    $('.mobile-menu nav').meanmenu({
        meanScreenWidth: "990",
        meanMenuContainer: ".mobile-menu",
        onePage: true,
    });	
	
	    /*--
    	One Page Nav
    ----------------------------------- */
     var top_offset = $('.one_page').height() +0;
    $('.one_page .solutech_menu .nav_scroll').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 1000,
         scrollOffset: top_offset,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    });

    $(".nav_scroll > li:first-child").addClass("current");
    /* sticky nav 1 */
    $('.one_page').scrollToFixed({
        preFixed: function() {
            $(this).find('.scroll_fixed').addClass('prefix');
        },
        postFixed: function() {
            $(this).find('.scroll_fixed').addClass('postfix').removeClass('prefix');
        }
    });	
		/* witr_active_id5 Slider Active */		
				new Swiper('.witr_active_id5', {
				  effect: 'cube',
					cubeEffect: {
						shadow: false,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94,
					},						
					grabCursor: false,
					speed: 2000,
					direction: 'horizontal',
					freeMode: false,
					mousewheel: false,
					keyboard: false,
					loop: false,
					autoplay: {
						delay: 6000,								  
						disableOnInteraction: false,
					},
					  pagination: {
						el: '.swiper-pagination',
						clickable: true,
						type: 'progressbar',
					  },
					  navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					  },
					  scrollbar: {
						el: '.scrollbar_false',
						hide: true,
					  },							   
					  
				});	

	
		/*---------------------
		 HOME-2countdown
		--------------------- */
		$('[data-countdown]').each(function() {
		  var $this = $(this), finalDate = $(this).data('countdown');
		  $this.countdown(finalDate, function(event) {
			$this.html(event.strftime('<span class="cdowns days"><span class="time-counts">%-D</span> <p>Days</p></span> <span class="cdowns hour"><span class="time-counts">%-H</span> <p>Hour</p></span> <span class="cdowns minutes"><span class="time-counts">%M</span> <p>Min</p></span> <span class="cdowns second"> <span><span class="time-counts">%S</span> <p>Sec</p></span>'));
		  });
		});				
				
		
		/*---------------------
		 Portfolio Isotope
		--------------------- */				

		$('.em_load').imagesLoaded(function() {

			if ($.fn.isotope) {

				var $portfolio = $('.em_load');

				$portfolio.isotope({

					itemSelector: '.grid-item',

					filter: '*',

					resizesContainer: true,

					layoutMode: 'masonry',

					transitionDuration: '0.8s'

				});


				$('.filter_menu li').on('click', function() {

					$('.filter_menu li').removeClass('current_menu_item');

					$(this).addClass('current_menu_item');

					var selector = $(this).attr('data-filter');

					$portfolio.isotope({

						filter: selector,

					});

				});

			};

		});

							

			/*====== Brand Slide Slick =======*/
			$('.brand_imagess_active').slick({	

				infinite: true,
				autoplay: true,
				autoplaySpeed: 2000,
				speed: 700,					
				slidesToShow: 5,
				slidesToScroll: 1,
				centerMode: true,
				centerPadding: '',					
				arrows: false,
				dots: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
				]
			});
			
			//====== Single portfolio Slide Slick
				$('.single_portfolio_previwe').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					dots: false,
					asNavFor: '.single_portfolio_text'
				});
				$('.single_portfolio_text').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					arrows: true,
					asNavFor: '.single_portfolio_previwe',
					prevArrow: '<button type="button" class="slick-prev"> PREVIOUS PROJECT</button>',
					nextArrow: '<button type="button" class="slick-next">NEXT PROJECT</button>',

				});

		
	
	/*====== foter section =======*/
	window.mc4wp = window.mc4wp || {
		listeners: [],
		forms: {
			on: function(evt, cb) {
				window.mc4wp.listeners.push(
					{
						event   : evt,
						callback: cb
					}
				);
			}
		}
	}
	
    /*---------------------
    WOW active js 
    --------------------- */
    new WOW().init();
	
    /*--------------------------
     scrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /* Venubox */

    $('.venobox').venobox({
        numeratio: true,
        infinigall: true
    });
	/* counter */
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});	
	/* classic Button */
	$(".btn_w").addClass('a_active');
	
    var emsmenu1 = $(".btn_c");
    var emscmenu2 = $(".tx_op");
    var emsinner2 = $(".tx_cl");
    emsmenu1.on('click', function() {
        emsinner2.addClass('btn_block');
        emscmenu2.addClass('btn_none');
        $(".btn_w").removeClass('a_active');		
        $(".btn_c").addClass('a_active');		
        $(this).addClass('a_active');		
    });	
    var emsmenu1 = $(".btn_w");
    var emscmenu2 = $(".tx_op");
    var emsinner2 = $(".tx_cl");
    emsmenu1.on('click', function() {
		emscmenu2.removeClass('btn_none');
		emsinner2.removeClass('btn_block');
		$(".btn_c").removeClass('a_active');
		$(".btn_w").addClass('a_active');
		$(this).addClass('a_active');
    });	
    /*--------------------------
    	blog messonary
    ---------------------------- */
    $('.bgimgload').imagesLoaded(function() {
        if ($.fn.isotope) {
            var $blogmassonary = $('.blog-messonary');
            $blogmassonary.isotope({
                itemSelector: '.grid-item',
                filter: '*',
                resizesContainer: true,
                layoutMode: 'masonry',
                transitionDuration: '0.8s'
            });

        };
    });

  
	
	// Mouse Direction Hover Iffect
	$('.single_protfolio').directionalHover();

	$('.single_protfolio').directionalHover({
		// CSS class for the overlay
		overlay: "em_port_content",
		// Linear or swing
		easing: "swing",
		speed: 50
	});	
		
	/* Bootstrap Accordion  */
	$('.faq-part .card').each(function () {
		var $this = $(this);
		$this.on('click', function (e) {
			var has = $this.hasClass('active');
			$('.faq-part .card').removeClass('active show');
			if (has) {
				$this.removeClass('active show');
			} else {
				$this.addClass('active show');
			}
		});
	});		

				$('.witr_cslide3_idany').slick({
						infinite: true,
						autoplay: true,
						autoplaySpeed:2000,
						speed: 1000,					
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: true,
						dots: false,
						responsive: [
							{
								breakpoint: 1200,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1,
								}
						},
							{
								breakpoint: 992,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
						},
							{
								breakpoint: 767,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
						}
						// You can unslick at a given breakpoint now by adding:
						// settings: "unslick"
						// instead of a settings object
						]
					});
			
			
					$('.carso_idtesti').slick({
							infinite: true,
							autoplay: true,
							autoplaySpeed: 3000,
							speed: 1000,					
							slidesToShow: 3,
							slidesToScroll: 1,
							arrows: true,
							dots: false,
							responsive: [
								{
									breakpoint: 1200,
									settings: {
										slidesToShow: 2,
										slidesToScroll: 1,
									}
							},
								{
									breakpoint: 992,
									settings: {
										slidesToShow: 2,
										slidesToScroll: 1,
									}
							},
								{
									breakpoint: 767,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1,
									}
							}
							// You can unslick at a given breakpoint now by adding:
							// settings: "unslick"
							// instead of a settings object
							]
						});
			
			
			
					$('.blog16_idblog1').slick({
						infinite: true,
						autoplay: true,
						autoplaySpeed: 3000,
						speed: 1000,					
						slidesToShow: 3,
						slidesToScroll: 1,
						arrows: true,
						dots: false,
						responsive: [
							{
								breakpoint: 1200,
								settings: {
									slidesToShow: 3,
									slidesToScroll: 1,
								}
						},
							{
								breakpoint: 992,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1,
								}
						},
							{
								breakpoint: 767,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
						}
						// You can unslick at a given breakpoint now by adding:
						// settings: "unslick"
						// instead of a settings object
						]
					});
				
			$('.carso_id1').slick({
				infinite: true,
				autoplay: true,
				autoplaySpeed: 3000,
				speed: 1000,					
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
				]
			});
			
			$('.post_team_idteam').slick({
				infinite: true,
				autoplay: true,
				autoplaySpeed: 2000,
				speed: 700,					
				slidesToShow: 3,
				slidesToScroll: 1,
										arrows: true,
				centerMode: false,
				centerPadding: '',
				dots: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				}
				]
			});
			
			$('.post_team9_idteam').slick({
				infinite: true,
				autoplay: true,
				autoplaySpeed: 3000,
				speed: 1000,					
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
				centerMode: false,
				centerPadding: '',
				dots: true,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				}
				]
			});
			
			
			/*====== Screenshots Slide Slick =======*/
			$('.imagess_id12').slick({	

				infinite: true,
				autoplay: true,
				autoplaySpeed: 3000,
				speed: 1000,					
				slidesToShow: 1,
				slidesToScroll: 1,
								centerMode: true,
				centerPadding: '',					
				arrows: true,
				dots: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
				]
			});
				
		/*====== Screenshots Slide Slick =======*/
			$('.imagess_id1').slick({	

				infinite: true,
				autoplay: true,
				autoplaySpeed: 3000,
				speed: 1000,					
				slidesToShow:2,
				slidesToScroll: 1,
								centerMode: true,
				centerPadding: '',					
				arrows: true,
				dots: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
				]
			});	
			
			$('.witr_cslide_idany').slick({
				infinite: true,
				autoplay: true,
				autoplaySpeed: 2000,
				speed: 1000,					
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
				},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
							slidesToScroll:1,
						}
				},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
				]
			});
			
			
				$('.witr_cslide5_idany').slick({
						infinite: true,
						autoplay: true,
						autoplaySpeed:2000,
						speed: 1000,					
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: true,
						dots: false,
						responsive: [
							{
								breakpoint: 1200,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1,
								}
						},
							{
								breakpoint: 992,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
						},
							{
								breakpoint: 767,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
						}
						// You can unslick at a given breakpoint now by adding:
						// settings: "unslick"
						// instead of a settings object
						]
					});
			
			
			
			

})(jQuery);




