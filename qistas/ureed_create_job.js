//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


browser.driver.manage().window().maximize();

var File = require('fs');


var moment = require('moment');

function selectProjectType(){

    browser.get(config.ureed_link+'/en/job/intro');
    browser.driver.sleep(5000);
    element(by.cssContainingText('button','Choose Standard')).click();

    // browser.driver.sleep(10000);

    browser.wait(function() {
        return element(by.css('[class=modal-body] select  option')).isPresent();
    });




    element.all(by.cssContainingText('[class=modal-body] select  option','Legal Typing')).then(function(options){

        options[0].click();

    });

    element(by.cssContainingText('button','Continue')).click();








}


function fillJobDetail(jobId,jobDetail){


    /*______________________________________________________file_job_fields__*/
    browser.driver.sleep(5000);
    browser.executeScript('document.querySelector(\'.chatBox\').style.display = "none"');



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


    element(by.css('[formcontrolname=isPublic][ng-reflect-value=false]')).click();


    element(by.cssContainingText('button[type=submit]','Post Job')).click();




    /*________________________________________________END___file_job_fields__*/



}

function assignFreelancer(jobData){


    /*______________________________________________________assign_freelancer__*/




    browser.get(config.ureed_link+'/en/employer/find-freelancer?name='+ jobData.email +'&bestMatchOnly=1&page=1');
    browser.driver.sleep(5000);


    browser.actions().mouseMove(element(by.css('.well.freelancer-wrapper'))).perform();


    element(by.cssContainingText('.well.freelancer-wrapper a','ASSIGN')).click();



    // browser.wait(function() {
    //     return element(by.cssContainingText('.list-group-item.invite-fl-item button','ASSIGN')).isPresent();
    // });


    element(by.cssContainingText('.list-group-item.invite-fl-item button','ASSIGN')).click();




    /*________________________________________________END___assign_freelancer__*/



}


function createMilestonr(){

    /*_______________________________________________create_milestone*/

    // browser.wait(function() {
    //     return element(by.css('milestones-form [formcontrolname=name]')).isPresent();
    // });

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

    var title = id +' - qistas ('+date+')';
    // var description ='pages=('+jsonData.pages+') ___audited=('+jsonData.audited+') _____error_audited=('+jsonData.error_audited+') __'+
    //     'errors=('+jsonData.errors+') ____errors_wordcount=('+jsonData.errors_wordcount+') __ALLPages=('+jsonData.ALLPages+')'+
    //     '____Full_Name=('+jsonData.Full_Name+')';


    var description='Hello ('+jsonData.Full_Name+'),\n'+


'You are working on the following assignment from Qistas:('+title+').'+

'Here are the details of your progress so far:\n'+

'- You have worked on ('+jsonData.pages+') pages.\n'+

'- Qistas edited ('+jsonData.audited+') pages.\n'+

'- Changes on ('+(jsonData.audited - jsonData.errors)+') pages were accepted.\n'+

'- Changes on ('+jsonData.errors+') pages were rejected.\n'+

'- ('+ (jsonData.pages -jsonData.audited)+') pages remaining.\n';



    var number_of_words=jsonData.wordcount;
    var budget=(number_of_words/255) * 0.2;
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


    var qistasJsonData=paraseQistasJsonData();
    var jobData={};
    for(var i in qistasJsonData){
        jobData=prepareJobData(i,qistasJsonData[i]);



describe(i+'-create job process ('+jobData.title+') ', function() {
    browser.waitForAngularEnabled(false);


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


});


    }
