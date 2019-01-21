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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {   

        /* This spec will test allfeed
         * object to make sure it is defined
         * and is not empty.
         */    
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         /* This spec will test through each feed
         * in the allFeeds object to make sure it has a Name defined
         * and is not empty.
         */
        it('Name is defined and  not empty', function() {
            allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();                             
                 expect(feed.name.length).not.toEqual(0);    
             });
        });

        /* This spec will test through each feed
         * in the allFeeds object to make sure it has a Url defined
         * and is not empty.
         */
        it('URL is defined and  not empty', function() {
            allFeeds.forEach(function(feed) {
                 expect(feed.url).toBeDefined();                             
                 expect(feed.url.length).not.toEqual(0);                 
             });
        });       

         /* This spec will test through each feed
         * in the allFeeds object to make sure it has a specific Name defined
         * and is not empty for 'http://blog.udacity.com/feed' URL
         */
        it('Specific name is defined and not empty for specific URL', function() {
            allFeeds.forEach(function(feed) {
                 if (expect(feed.url).toBeDefined() && feed.url === "http://blog.udacity.com/feed") {
                     expect(feed.name).toEqual("Udacity Blog");                 
                }
             });
        });       
    });


    /* A new test suite named "The menu" */
        describe('The menu', function() {        
        /* This test checks that the menu element is
         * hidden by default.
         */
          it('Menu element is not shown(aka hidden) by default', function() {
              const bodyElement = $('body');
              expect(bodyElement.hasClass('menu-hidden')).toBeDefined();
              // check for class name "menu-hidden" to be true.
              expect(bodyElement.hasClass('menu-hidden')).toBe(true);
          });  

         /* This test checks that the menu changes
          * visibility when the menu is clicked. This test
          * should have two expectations: "does the menu display when
          * clicked and does it hide when clicked again?".
          */          
          it('Menu changes visibility when icon is clicked', function() {
              // fire mouse click event programmatically.
              $('.menu-icon-link').click();
              const bodyElement = $('body');              
              //check for defined and not hidden.
              expect(bodyElement.hasClass('menu-hidden')).toBeDefined();
              expect(bodyElement.hasClass('menu-hidden')).toBe(false);
              
              // fire mouse click event programmatically.
              $('.menu-icon-link').click();
              //check for defined and hidden.
              expect(bodyElement.hasClass('menu-hidden')).toBeDefined();
              expect(bodyElement.hasClass('menu-hidden')).toBe(true);
          });
        });

    /* A new test suite named "Initial Entries" */
       describe('Initial Entries', function() {        
        /* A test ensures that loadFeed is invoked on Zero index.
         * function is called and there is at least
         * a single .entry element within the .feed container. */
            beforeEach(function(done) {
                loadFeed(0, function() {
                    done();
                });
            });
           it('Check for at least a single entry in feed when the loadFeed(0) is invoked', function() {
               // The HTML DOM has final Tree structure as <div class="feed">...<article class="entry"> so check for it
               // both class names as below.
               expect($('.feed .entry').length).toBeGreaterThan(0);
           });
       });




    /* New test suite named "New Feed Selection" */
        describe('New Feed Selection', function() { 
            var feedOne;
            var feedTwo;
        /* This spec will test when a new feed is loaded that the 
         * the HTML content actually gets updated based on new data returned by the feed. */
            beforeEach(function(done) {
                loadFeed(0, function() {   
                    // This will get combined text contents from feed at index 0.           
                    feedOne = $('.feed').text();
                    done();
                });
            });
            it('Second feed content should change after loading.', function(done){
                loadFeed(1, function() {
                    // This will get combined text contents from feed at index 1.
                    feedTwo = $('.feed').text();
                    expect(feedOne).not.toEqual(feedTwo);
                    done();
                });
            });
        });
        
}());