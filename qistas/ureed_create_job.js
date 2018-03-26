//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


browser.driver.manage().window().maximize();

var File = require('fs');


var moment = require('moment');

function selectProjectType(){

    browser.executeScript('document.querySelector(\'.sit-loader\').style.display = "none"');
    browser.get(config.ureed_link+'/en/job/intro');
 browser.driver.sleep(5000);
    browser.executeScript('document.querySelector(\'.sit-loader\').style.display = "none"');

    browser.wait(function() {
        return element(by.cssContainingText('button','Choose Standard')).isPresent();
    },20000);

    element.all(by.cssContainingText('button','Choose Standard')).then(function(buttons){buttons[0].click();});

     browser.driver.sleep(5000);

    browser.wait(function() {
        return element(by.css('[class=modal-body] select  option')).isPresent();
    },20000);




    element.all(by.cssContainingText('[class=modal-body] select  option','Legal Typing')).then(function(options){

        options[0].click();

    });

    element(by.cssContainingText('button','Continue')).click();








}


function fillJobDetail(jobId,jobDetail){


    /*______________________________________________________file_job_fields__*/
    browser.driver.sleep(5000);
    browser.executeScript('document.querySelector(\'.chatBox\').style.display = "none"');
    browser.executeScript('document.querySelector(\'.sit-loader\').style.display = "none"');

   browser.wait(function() {
        return element(by.css('[formcontrolname=title]')).isPresent();
    },20000);

    element(by.css('[formcontrolname=title]')).sendKeys(jobDetail.title);



    element.all(by.cssContainingText('[formcontrolname=languageFrom]   option','Arabic')).then(function(options){ options[0].click(); });

    element.all(by.cssContainingText('[formcontrolname=languageTo]   option','Arabic')).then(function(options){options[0].click(); });

    element.all(by.cssContainingText('[formcontrolname=service]   option','Legal')).then(function(options){options[0].click(); });








    element(by.css("[formcontrolname=skills] button")).click();
    element.all(by.cssContainingText('[formcontrolname=skills] a ','Typing/Data Entry')).then(function(options){ options[0].click(); });
    element(by.css('[formcontrolname=title]')).click();


    element.all(by.css('[formcontrolname=description]')).then(function(textareaArray){ textareaArray[1].sendKeys(jobDetail.description); });


    element(by.css('[formcontrolname=numberOfWords]')).sendKeys(jobDetail.number_of_words);
    element(by.css('[formcontrolname=typeOfPayment][value=FX]')).click();



    element(by.css('[formcontrolname=budget]')).sendKeys(jobDetail.budget);




    element(by.css('[formcontrolname=deliveryTime]')).click();
    element(by.css('.select-current-time')).click();
    element(by.css('[formcontrolname=title]')).click();


    element.all(by.css('[formcontrolname=isPublic]')).then(function(radios){radios[1].click();});


    element(by.cssContainingText('button[type=submit]','Post Job')).click();



    /*________________________________________________END___file_job_fields__*/



}

function assignFreelancer(jobData){


    /*______________________________________________________assign_freelancer__*/




    browser.get(config.ureed_link+'/en/employer/find-freelancer?name='+ (jobData.email.toLowerCase()) +'&bestMatchOnly=1&page=1');
    browser.waitForAngularEnabled(false);
    browser.driver.sleep(5000);
    browser.executeScript('document.querySelector(\'.sit-loader\').style.display = "none"');


//     var EC = protractor.ExpectedConditions;
// browser.wait(EC.visibilityOf(element(by.css('.well.freelancer-wrapper'))), 20000,"Element not visible timing out");


    browser.wait(function() {
        return element(by.css('.well.freelancer-wrapper')).isPresent();
    },20000);

    browser.actions().mouseMove(element(by.css('.well.freelancer-wrapper'))).perform();


    browser.driver.sleep(5000);

    browser.wait(function() {
        return element(by.css('.well.freelancer-wrapper')).isPresent();
    },20000);
    browser.executeScript('document.querySelector(\'.row.buttons-wrapper\').style.visibility = "visible"');

    element.all(by.cssContainingText('.well.freelancer-wrapper a','ASSIGN')).then(function(assignA){assignA[0].click();});


    browser.wait(function() {
        return element(by.cssContainingText('.list-group-item.invite-fl-item button','ASSIGN')).isPresent();
    },20000);

    if(element(by.cssContainingText('.list-group-item.invite-fl-item  .job-title',jobData.title)).isPresent()){


    element.all(by.cssContainingText('.list-group-item.invite-fl-item button','ASSIGN')).then(function(assignButton){assignButton[0].click();});
    }else{

    element(by.css('Not exsit project so we can not assign')).click();
    }





    /*________________________________________________END___assign_freelancer__*/



}


function createMilestonr(){

    /*_______________________________________________create_milestone*/

    browser.wait(function() {
        return element(by.css('milestones-form [formcontrolname=name]')).isPresent();
    },20000);

    element(by.css('milestones-form [formcontrolname=name]')).sendKeys('M1');
    element(by.css('milestones-form [type=submit]')).click();







    /*____________________________________________END___create_milestone*/


}
function paraseQistasJsonData(){

    var content=File.readFileSync(config.qistas_data_file, "utf8");
    return  JSON.parse(content);

}


function prepareJobData(id,jsonData){

    //      jsonData.pages: 93,
    // jsonData.audited: 93,
    // jsonData.error_audited: 0,
    // jsonData.errors: 60,
    // jsonData.wordcount: 19317,
    // jsonData.errors_wordcount: 0,
    // jsonData.Full_Name: 'Ibrahim Amjad Abumustafa',
    // jsonData.user_email: 'i.abumustafa@hotmail.com',
    // jsonData.ALLPages: '42'

    var date=moment(new Date()).format( "YYYY-MM-DD");


var  from_date= moment(date).add(-6,'days').format( "YYYY-MM-DD");

    var title = id +' - qistas -'+jsonData.Full_Name+' ('+date+') ';
    // var description ='pages=('+jsonData.pages+') ___audited=('+jsonData.audited+') _____error_audited=('+jsonData.error_audited+') __'+
    //     'errors=('+jsonData.errors+') ____errors_wordcount=('+jsonData.errors_wordcount+') __ALLPages=('+jsonData.ALLPages+')'+
    //     '____Full_Name=('+jsonData.Full_Name+')';


    var description='Hello ('+jsonData.Full_Name+'),\n'+


        'You are working on the following assignment from Qistas:('+title+').'+

        'Here are the details of your progress so far:\n'+

        '- You have worked on ('+jsonData.ALLPages+') pages during '+from_date+' to '+date+' .\n'+

        '- Qistas edited ('+jsonData.pages+') pages.\n'+

        '- Changes on ('+(jsonData.audited )+') pages were accepted.\n'+

        '- Changes on ('+jsonData.error_audited+') pages were rejected.\n'+

        '- ('+ (jsonData.pages -jsonData.audited)+') pages remaining.\n';



    var number_of_words=jsonData.wordcount;
    var budget=(number_of_words/250) * 0.282;
    budget=budget.toFixed(2);
    var email= jsonData.user_email;
    return    {
        'id':id,
        'title':title,
        'description':description,
        'number_of_words':number_of_words,
        'budget':budget,
        'email':email,

    }


}



describe('all jobs create ', function() {
    browser.waitForAngularEnabled(false);



    var qistasJsonData=paraseQistasJsonData();

    for(var x in qistasJsonData){

        var jobData={};
        (function(i,jobData){
            // var i=x;
            // jobData=prepareJobData(i,qistasJsonData[i]);

            it(i+'-Ureed select project TYPE',function(){

                selectProjectType();
            });



            it(i+'-fill details',function(){

                fillJobDetail(i,jobData);
            });


            it(i+'assign Freelancer('+jobData.email+')',function(){

                assignFreelancer(jobData);
            });


            it(i+'createMilestonr',function(){

                createMilestonr();
            });

        })(x,prepareJobData(x,qistasJsonData[x]));

    }

});