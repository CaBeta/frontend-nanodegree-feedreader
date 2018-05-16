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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('each feed has a URL',function(){
            for(feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });


        it('each feed has a name', function () {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    describe('The menu',function(){
        var isMenuHidden = function () {
            return $('body').hasClass('menu-hidden');
        }

        it('element is hidden by default', function () {
            expect(isMenuHidden()).toBe(true);
        });


        it('display when clicked and hide when clicked again',
        function () {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(isMenuHidden()).toBe(false);
            menuIcon.click();
            expect(isMenuHidden()).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0,function () {
                done();
            });
        });

        //检测是否存在含有.entry元素的.feed元素
        it('has at least a single .entry element', function (done) {
            expect($('.feed').has('.entry').length != 0).toBe(true);
            done();
        })
    });

    describe('New Feed Selection', function () {
        //保存原来的entry
        var defaultEntry;
        beforeEach(function (done) {
            defaultEntry = $('.feed').html();
            loadFeed(1, function () {
                done();
            });
        });

        //对比原来的entry和loadFeed之后的entry
        it('content actually changes', function (done) {
            var newEntry = $('.feed').html();
            expect(defaultEntry == newEntry).toBe(false);
            done();
        })
    });
}());
