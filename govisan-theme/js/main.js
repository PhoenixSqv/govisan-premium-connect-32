/**
 * Main JavaScript file
 */
(function($) {
	'use strict';

	$(document).ready(function() {

		// Smooth scroll for anchor links
		$('a[href*="#"]:not([href="#"])').on('click', function(e) {
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				let target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				
				if (target.length) {
					e.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top - 80
					}, 800);
				}
			}
		});

		// Back to top button
		const backToTop = $('<button class="back-to-top" aria-label="Back to top"><span>↑</span></button>');
		$('body').append(backToTop);

		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 300) {
				backToTop.addClass('visible');
			} else {
				backToTop.removeClass('visible');
			}
		});

		backToTop.on('click', function() {
			$('html, body').animate({ scrollTop: 0 }, 600);
		});

		// Add animation classes on scroll
		const animateElements = $('.animate-on-scroll');
		
		function checkAnimation() {
			const windowHeight = $(window).height();
			const scrollTop = $(window).scrollTop();

			animateElements.each(function() {
				const elementTop = $(this).offset().top;

				if (scrollTop + windowHeight > elementTop + 100) {
					$(this).addClass('animated');
				}
			});
		}

		if (animateElements.length) {
			checkAnimation();
			$(window).on('scroll', checkAnimation);
		}

		// Lazy load images
		if ('loading' in HTMLImageElement.prototype) {
			const images = document.querySelectorAll('img[loading="lazy"]');
			images.forEach(img => {
				img.src = img.dataset.src || img.src;
			});
		}

	});

})(jQuery);
