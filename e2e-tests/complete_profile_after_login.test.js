//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */



var loginData={
    'email':{selector:'[formcontrolname=username]',test_data:{'exist':'taylorsuccessor@gmail.com'}},
    'password':{selector:'[formcontrolname=password]',test_data:{'short':'PassPass1'}},
    'submit':{selector:'[type=submit]',test_data:{'click':'click'}}
};

browser.driver.manage().window().maximize();

describe('register new user', function() {



    it('login after register', function() {
        browser.get('/en/account/login');

        browser.waitForAngularEnabled(false);
        browser.waitForAngular();
        browser.driver.sleep(5000);

        var email=element(by.css(loginData.email.selector));
        email.sendKeys(loginData.email.test_data.exist);

        var password=element(by.css(loginData.password.selector));
        password.sendKeys(loginData.password.test_data.short);



        var submit=element(by.css(loginData.submit.selector));


        submit.click();



    });




    it('complete profile ', function() {

        browser.waitForAngular();
        browser.driver.sleep(5000);



        element.all(by.css('#gender option')).then(function(options){ options[1].click(); });
        element.all(by.css('#nationality option')).then(function(options){ options[3].click(); });
        element.all(by.css('#countryOfResidence option')).then(function(options){ options[3].click(); });



        element(by.css("[formcontrolname=languages] button")).click();
        element.all(by.css('[formcontrolname=languages] a')).then(function(options){ options[2].click(); });


        element(by.css('[formcontrolname=phoneNumber]')).click();//just to remove dropdown
        // element(by.css("[formcontrolname=services] ")).click();
        element(by.css("[formcontrolname=services] button")).click();

        element.all(by.css('[formcontrolname=services] a')).then(function(options){ options[1].click(); });

        element(by.css('[formcontrolname=phoneNumber]')).click();//just to remove dropdown

        // element(by.css("[formcontrolname=languages] button")).click();
        // element.all(by.css("[formcontrolname=languages] .dropdown-item")).first().click();
        //
        //
        // element(by.css("[formcontrolname=services] button")).click();
        // element.all(by.css("[formcontrolname=services] .dropdown-item")).first().click();



        element.all(by.css('[formgroupname=skill] select option')).then(function(options){ options[1].click(); });


        element(by.css('[formcontrolname=wordPerHour]')).sendKeys('12');
        element(by.css('[formcontrolname=pricePerWord]')).sendKeys('0.1');
        element(by.css('[formcontrolname=phoneNumber]')).sendKeys('786565765');
        element(by.css('[formcontrolname=availableHours]')).sendKeys('12');
        element(by.css('[formcontrolname=tagLine]')).sendKeys('tagline tagline');
        element(by.css('[formcontrolname=bio]')).sendKeys('bio test bio');





        var mumbaiCity = element.all(by.cssContainingText('freelancer-completeprofile-desktop button','Save')).then(function(options){ options[3].click(); });
// browser.actions().mouseMove(mumbaiCity).click().perform();

        // element(by.cssContainingText('button','Save')).click();

         // browser.driver.sleep(500000);


    });






});
