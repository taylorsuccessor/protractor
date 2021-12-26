//jshint strict: false




var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: './report',
    filename: 'my-report.html',
    cleanDestination: true,
    showSummary: true,
    showConfiguration: true,
    reportTitle: 'Infinityswap-twitter',
    // inlineImages: true,
});




exports.config = {

    // seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 1100000000,

    specs: [
        // '*.js',
        'twitter.test.js',
//
//        'delete_user.test.js',
//        'register.test.js',
//        'activate_user.test.js',
//        'complete_profile_after_login.test.js',
    ],

    capabilities: {
        'browserName': 'chrome',
         chromeOptions: {
             args: [ "--disable-gpu", "--window-size=1400x2000",'--login-user=ureed', '--login-password=cross8wind$']
             // args: [ "--headless", "--disable-gpu", "--window-size=1400x2000",'--login-user=ureed', '--login-password=cross8wind$']
         },

    },

    // baseUrl: 'http://localhost:3000/',
    baseUrl: 'http://infinityswap.one/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000000
    },


    // Assign the test reporter to each running instance
    onPrepare: function () {
        global.config ={

        //     'backend_url':'http://localhost:8000/',



        };

        jasmine.getEnv().addReporter(reporter);
    },




    // Setup the report before any tests start
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },



    // Close the report after all tests finish
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }





};
