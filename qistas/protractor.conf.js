//jshint strict: false




var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: './report',
    filename: 'my-report.html',
    cleanDestination: true,
    showSummary: true,
    showConfiguration: true,
    reportTitle: 'Ureed',
    // inlineImages: true,
});




exports.config = {

    // seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 1100000000,

    specs: [
        // '*.js',

        'qistas.js',
        'ureed_login.js',
        'ureed_create_job.js'
    ],

    capabilities: {
        'browserName': 'chrome',
         // chromeOptions: {
         //     args: [ "--headless", "--disable-gpu", "--window-size=1400x2000",'--login-user=ureed', '--login-password=cross8wind$']
         // },

    },

    // baseUrl: 'http://localhost:3000/',
    baseUrl: 'http://beta.ureed.net/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000000
    },


    // Assign the test reporter to each running instance
    onPrepare: function () {
        global.config ={

        //     'backend_url':'http://localhost:8000/',
        // 'admin_username':'admin@sit-mena.com',
        // 'admin_password':'N01D0tHi12',


            'backend_url':'http://api.beta.ureed.net/',
        'admin_username':'product@ureed.com',
        'admin_password':'RbbASkhaey',


            'qistas_link':'http://qistas.com:9997/dmz/login',
            'qistas_username':'ureed',
            'qistas_password':'ur56125g26b',
            'qistas_data_file':'./qistas_data.txt',
            'qistas_records_date_file':'./qistas_records_date.txt',

            'ureed_link':'http://beta.ureed.net',
            'ureed_username':'mohammad.hithnawi@ureed.com',
            'ureed_password':'MLK012958',



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
