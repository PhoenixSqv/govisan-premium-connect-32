/**
 * Navigation Scripts
 */
(function() {
	'use strict';

	// Mobile menu toggle
	const menuToggle = document.querySelector('.menu-toggle');
	const navigation = document.querySelector('.main-navigation');

	if (menuToggle && navigation) {
		menuToggle.addEventListener('click', function() {
			const expanded = this.getAttribute('aria-expanded') === 'true' || false;
			this.setAttribute('aria-expanded', !expanded);
			navigation.classList.toggle('toggled');
			document.body.classList.toggle('menu-open');
		});
	}

	// Close menu when clicking outside
	document.addEventListener('click', function(event) {
		if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
			if (navigation.classList.contains('toggled')) {
				menuToggle.setAttribute('aria-expanded', 'false');
				navigation.classList.remove('toggled');
				document.body.classList.remove('menu-open');
			}
		}
	});

	// Handle submenu on mobile
	const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children');
	
	menuItemsWithChildren.forEach(function(menuItem) {
		const link = menuItem.querySelector('a');
		
		link.addEventListener('click', function(e) {
			if (window.innerWidth <= 768) {
				e.preventDefault();
				menuItem.classList.toggle('open');
			}
		});
	});

	// Header scroll behavior
	let lastScroll = 0;
	const header = document.querySelector('.site-header');

	window.addEventListener('scroll', function() {
		const currentScroll = window.pageYOffset;

		if (currentScroll <= 0) {
			header.classList.remove('scroll-up');
			header.classList.remove('scrolled');
			return;
		}

		if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
			// Scroll down
			header.classList.remove('scroll-up');
			header.classList.add('scroll-down');
		} else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
			// Scroll up
			header.classList.remove('scroll-down');
			header.classList.add('scroll-up');
		}

		if (currentScroll > 100) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}

		lastScroll = currentScroll;
	});

})();
