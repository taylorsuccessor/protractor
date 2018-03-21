//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

browser.driver.manage().window().maximize();

function paraseQistasJsonData(jsonString){


/*____________________________________________________Project_manager__*/
    var loginData={
    'email':{selector:'[formcontrolname=username]',test_data:{'exist':'mohammad.hithnawi@ureed.com'}},
    'password':{selector:'[formcontrolname=password]',test_data:{'short':'MLK012958'}},
    'submit':{selector:'[type=submit]',test_data:{'click':'click'}}
};


        browser.get('http://localhost:3000/en/account/login');
 browser.driver.sleep(5000);

       element(by.css(loginData.email.selector)).sendKeys(loginData.email.test_data.exist);

        element(by.css(loginData.password.selector)).sendKeys(loginData.password.test_data.short);
         element(by.css(loginData.submit.selector)).click();






/*_________________________________________________END___Project_manager__*/



/*_______________________________________________________create_job_select_job_type__*/
browser.driver.sleep(5000);
      browser.get('http://localhost:3000/en/job/intro');
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




/*_________________________________________________END___create_job_select_job_type__*/


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




/*______________________________________________________assign_freelancer__*/




      browser.get('http://localhost:3000/en/employer/find-freelancer?name=sara.alfuli@gmail.com&bestMatchOnly=1&page=1');
      browser.driver.sleep(5000);


          browser.actions().mouseMove(element(by.css('.well.freelancer-wrapper'))).perform();


          element(by.cssContainingText('.well.freelancer-wrapper a','ASSIGN')).click();



 browser.wait(function() {
    return element(by.cssContainingText('.list-group-item.invite-fl-item button','ASSIGN')).isPresent();
 });


          element(by.cssContainingText('.list-group-item.invite-fl-item button','ASSIGN')).click();




/*________________________________________________END___assign_freelancer__*/



/*_______________________________________________create_milestone*/

 browser.wait(function() {
    return element(by.css('milestones-form [formcontrolname=name]')).isPresent();
 });

          element(by.css('milestones-form [formcontrolname=name]')).sendKeys('M1');
          element(by.css('milestones-form [type=submit]')).click();







      browser.driver.sleep(50000);
/*____________________________________________END___create_milestone*/




       //
       //     var jsonData = JSON.parse(jsonString);
       // for(var index in jsonData){
       //         console.log(jsonData[index]);
       //     }
       //     console.log(jsonData)
}



describe('Qistas login and get data', function() {
    browser.waitForAngularEnabled(false);



    it('1_ login to Qistas ', function() {
        browser.get(config.qistas_link );
        element(by.css('[name=username]')).sendKeys(config.qistas_username);
        element(by.css('[name=password]')).sendKeys(config.qistas_password);
        element.all(by.css('[name=cmbCountry]  option')).then(function(options){ options[1].click(); });

        element(by.css('[type=submit]')).click();


        element(by.css('[name=from_date]')).sendKeys('2018-03-01');
        element(by.css('[name=to_date]')).sendKeys('2018-03-20');
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

            jsonString=element(by.css('body')).getText().then(function(jsonPageBody){paraseQistasJsonData(jsonPageBody);});
browser.driver.sleep(50000);
});

});

