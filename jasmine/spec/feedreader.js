$(function () {
	describe('RSS Feeds', function () {
		var i, j;
		beforeEach(function () {
			i = 0;
			j = allFeeds.length;
		});
		/**
		 * @description Checks if the array with feeds is defined and non-empty.
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/**
		 * @description Checks if all the feeds have non-empty ulrs.
		 */
		it('have a non-empty URL', function () {
			for (i; i < j; i++) {
				expect(allFeeds[i].url).toBeTruthy();
			}
		});
		/**
		 * @description Checks if all the feeds have non-empty names.
		 */
		it('have a non-empty name', function () {
			for (i; i < j; i++) {
				expect(allFeeds[i].name).toBeTruthy();
			}
		});
	});

	describe('The Menu', function () {
		var hidden, icon, initCl = document.body.getAttribute('class');
		beforeEach(function () {
			document.body.setAttribute('class', initCl);
			hidden = 'menu-hidden';
			icon = $('.menu-icon-link');
		});
		/**
		 * @description Checks if the menu is defined and hidden by default.
		 */
		it('is hidden by default', function () {
			expect(initCl).toBeDefined();
			expect(initCl).toContain(hidden);
		});
		/**
		 * @description Checks if the menu changes visibility after a click on menu icon.
		 */
		it('displays the menu when menu icon clicked', function () {
			icon.click();
			var cl = document.body.getAttribute('class');
			expect(cl).not.toContain(hidden);
		});
		it('hides the menu when menu icon clicked again', function () {
			icon.dblclick();
			var cl = document.body.getAttribute('class');
			expect(cl).toContain(hidden);
		});
	});

	/**
	 * @description Checks for the existance of at least a single .entry element within the .feed container after loadFeed function loads.
	 */
	describe('Initial Entries', function () {
		beforeEach(function (done) {
			loadFeed(0, done);
		});
		it('load at least a single element into the container', function () {
			var a = document.querySelectorAll('.feed .entry');
			expect(a.length).toBeGreaterThan(0);
		});
	});

	/**
	 * @description Checks if content changes when a new feed is loaded
	 */
	describe('New Feed Selection', function () {
		var oldContent;
		beforeEach(function (done) {
			loadFeed(0, function () {
				oldContent = document.querySelectorAll('.feed .entry');
				loadFeed(1, done);
			});
		});
		it('loads new content', function () {
			var newContent = document.querySelectorAll('.feed .entry');
			expect(newContent[0].textContent).toBeTruthy();
			expect(newContent[0].textContent).not.toEqual(oldContent[0].textContent);
		});
	});
}());