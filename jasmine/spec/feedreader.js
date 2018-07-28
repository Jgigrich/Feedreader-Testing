/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /*
     * This suite is all about the RSS feeds definitions.
    */
    describe('RSS Feeds', function() {

        /* A test to make sure that the allFeeds variable has been
         * defined and that it is not empty.
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
          let allHaveUrls = true;
          for(feed of allFeeds) {
            if(typeof feed.url === 'undefined' || feed.url === '') {
              allHaveUrls = false;
            }
          }
          expect(allHaveUrls).toBe(true);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
          let allHaveNames = true;
          for(feed of allFeeds) {
            if(typeof feed.name === 'undefined' || feed.name === '') {
              allHaveNames = false;
            }
          }
         expect(allHaveNames).toBe(true);
        });
    });


    /******** Tests for the "The menu" ********/
    describe('The menu', function() {
        const body = document.querySelector('body');

        /* A test that ensures the menu element is
         * hidden by default.
        */
        it('hidden by default', function() {
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
         */
        it('toggles visibility', function() {
          $('.menu-icon-link').trigger('click');
          expect(body.classList.contains('menu-hidden')).toBe(false);
          $('.menu-icon-link').trigger('click');
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
        */

        beforeEach(function(done) {
          loadFeed(0, done);
        });

        it('has at least one entry', function(done) {
          let numOfEntries = $('.feed').find('.entry').length;
          expect(numOfEntries).toBeGreaterThan(0);
          done();
        });
    });

    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
        */
        const feed = document.querySelector('.feed');
        let   feed1, feed2;

        beforeEach(function(done) {
          loadFeed(0, function(){
            feed1 = feed.innerText;
          });
          loadFeed(1, function(){
            feed2 = feed.innerText;
            done();
          });
        });

        it('changes content', function(done) {
          expect(feed2).not.toBe(feed1);
          done();
        });
    });
}());
