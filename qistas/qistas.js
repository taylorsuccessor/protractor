//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


browser.driver.manage().window().maximize();


var File = require('fs');

function checkTheDataAlreadySync(from_date,to_date){
// return true;

    var content=File.readFileSync(config.qistas_records_date_file, "utf8");
    var dates=  JSON.parse(content);

    for (var i in dates.date_list){
       if((dates.date_list[i].from <= from_date &&  dates.date_list[i].to >= from_date) ||
           (dates.date_list[i].from <= to_date &&  dates.date_list[i].to >= to_date)
       ){
           return false
       }
    }

    dates.date_list.push({"from":from_date,"to":to_date});

    var content=File.writeFileSync(config.qistas_records_date_file,JSON.stringify(dates), "utf8");


    return true;


}


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

var  from_date= moment(to_data).add(-6,'days').format( "YYYY-MM-DD");
if (!checkTheDataAlreadySync(from_date,to_data)){
    browser.close() ;
}


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
// File.openSync(config.qistas_data_file, 'w');
// File.open(config.qistas_data_file, "wx", function (err, fd) {
//    fd.write(jsonString);
//     });
//
//
//
//
//         });
        // browser.driver.sleep(5000);
    });

    });



});

