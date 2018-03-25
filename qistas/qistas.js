//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


browser.driver.manage().window().maximize();


var File = require('fs');



describe('Qistas login and get data', function() {
    browser.waitForAngularEnabled(false);





    it('1_ login to Qistas ', function() {
        browser.get(config.qistas_link );
        element(by.css('[name=username]')).sendKeys(config.qistas_username);
        element(by.css('[name=password]')).sendKeys(config.qistas_password);
        element.all(by.css('[name=cmbCountry]  option')).then(function(options){ options[1].click(); });

        element(by.css('[type=submit]')).click();


var moment = require('moment');
var to_data=moment(new Date()).format( "YYYY-MM-DD");

var  from_date= moment(to_data).add(-7,'days').format( "YYYY-MM-DD");



        element(by.css('[name=from_date]')).sendKeys(from_date);
        element(by.css('[name=to_date]')).sendKeys(to_data);
        element(by.css('input[value=json]')).click();



        //         {
        //    "pages":218,
        //    "audited":214,
        //    "error_audited":4,
        //    "errors":333,
        //    "wordcount":28688,
        //    "errors_wordcount":780,
        //    "Full_Name":"Maisaa afana",
        //    "user_email":"afanamaisaa@gmail.com",
        //    "ALLPages":"59"
        // },


        var jsonString=element(by.css('body')).getText();






    });


    it('get Qistas json', function() {

        jsonString=element(by.css('body')).getText().then(function(jsonPageBody){


            File.writeFile(config.qistas_data_file,jsonPageBody,function(error){});

    });

    });



});

