//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


browser.driver.manage().window().maximize();


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


function fillJobDetail(jobDetail){


    /*______________________________________________________file_job_fields__*/
    browser.driver.sleep(5000);
    browser.executeScript('document.querySelector(\'.chatBox\').style.display = "none"');



    element(by.css('[formcontrolname=title]')).sendKeys('xxx_title');



    element.all(by.cssContainingText('[formcontrolname=languageFrom]   option','Arabic')).then(function(options){ options[0].click(); });

    element.all(by.cssContainingText('[formcontrolname=languageTo]   option','Arabic')).then(function(options){options[0].click(); });

    element.all(by.cssContainingText('[formcontrolname=service]   option','Legal')).then(function(options){options[0].click(); });








    element(by.css("[formcontrolname=skills] button")).click();
    element.all(by.cssContainingText('[formcontrolname=skills] a ','Typing/Data Entry')).then(function(options){ options[0].click(); });
    element(by.css('[formcontrolname=title]')).click();


    element.all(by.css('[formcontrolname=description]')).then(function(textareaArray){ textareaArray[1].sendKeys('xxx_description'); });


    element(by.css('[formcontrolname=numberOfWords]')).sendKeys('666');
    element(by.css('[formcontrolname=typeOfPayment][value=FX]')).click();



    element(by.css('[formcontrolname=budget]')).sendKeys('1');




    element(by.css('[formcontrolname=deliveryTime]')).click();
    element(by.css('.select-current-time')).click();
    element(by.css('[formcontrolname=title]')).click();


    element(by.css('[formcontrolname=isPublic][ng-reflect-value=false]')).click();


    element(by.cssContainingText('button[type=submit]','Post Job')).click();




    /*________________________________________________END___file_job_fields__*/



}

function assignFreelancer(){


    /*______________________________________________________assign_freelancer__*/




    browser.get(config.ureed_link+'/en/employer/find-freelancer?name=sara.alfuli@gmail.com&bestMatchOnly=1&page=1');
    browser.driver.sleep(5000);


    browser.actions().mouseMove(element(by.css('.well.freelancer-wrapper'))).perform();


    element(by.cssContainingText('.well.freelancer-wrapper a','ASSIGN')).click();



    browser.wait(function() {
        return element(by.cssContainingText('.list-group-item.invite-fl-item button','ASSIGN')).isPresent();
    });


    element(by.cssContainingText('.list-group-item.invite-fl-item button','ASSIGN')).click();




    /*________________________________________________END___assign_freelancer__*/



}


function createMilestonr(){

    /*_______________________________________________create_milestone*/

    browser.wait(function() {
        return element(by.css('milestones-form [formcontrolname=name]')).isPresent();
    });

    element(by.css('milestones-form [formcontrolname=name]')).sendKeys('M1');
    element(by.css('milestones-form [type=submit]')).click();







    browser.driver.sleep(50000);
    /*____________________________________________END___create_milestone*/


}
function paraseQistasJsonData(jsonString){





    //
    //     var jsonData = JSON.parse(jsonString);
    // for(var index in jsonData){
    //         console.log(jsonData[index]);
    //     }
    //     console.log(jsonData)
}



describe('Qistas login and get data', function() {
    browser.waitForAngularEnabled(false);

    for(var i in [1,2,3,4,5]){
        it('Ureed select project TYPE',function(){

            selectProjectType();
        });



        it('fill details',function(){

            fillJobDetail({});
        });


        it('assign Freelancer',function(){

            assignFreelancer();
        });


        it('createMilestonr',function(){

            createMilestonr();
        });

    }


});

