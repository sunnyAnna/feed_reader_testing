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
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe('');
			}
		});
		/**
		 * @description Checks if all the feeds have non-empty names.
		 */
		it('have a non-empty name', function () {
			for (i; i < j; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe('');
			}
		});
	});

	describe('The Menu', function () {
		var hidden, icon, initCl = document.body.getAttribute('class');
		beforeEach(function () {
			hidden = 'menu-hidden';
			icon = $('.menu-icon-link');
		});
		afterEach(function () {
			document.body.setAttribute('class', initCl);
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
		var container;
		beforeEach(function (done) {
			container = $('.feed');
			loadFeed(0, done);
		});
		it('load at least a single element into the container', function (done) {
			var a = container.children();
			expect(a.length).toBeGreaterThan(0);
			done();
		});
	});

	/**
	 * @description Checks if content changes when a new feed is loaded
	 */
	describe('New Feed Selection', function () {
		var oldTitle;
		beforeEach(function (done) {
			loadFeed(0, function () {
				oldTitle = $('.header-title').text();
				loadFeed(1, done);
			});
		});
		it('loads new content', function (done) {
			var newTitle = $('.header-title').text();
			expect(newTitle).not.toEqual(oldTitle);
			done();
		});
		afterEach(function () {
			loadFeed(0);
		});
	});
}());