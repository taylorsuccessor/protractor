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

    allScriptsTimeout: 110000000,

    specs: [
        // '*.js',

        'delete_user.test.js',
        'register.test.js',
        'activate_user.test.js',
        'complete_profile_after_login.test.js',
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3000/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000000
    },


  // Assign the test reporter to each running instance
onPrepare: function () {
    global.config ={'backend_url':'http://localhost:8000/'};

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
