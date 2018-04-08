//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


browser.driver.manage().window().maximize();



function loginClientSide(){

    var loginData={
        'email':{selector:'[formcontrolname=username]',test_data:{'exist':config.ureed_username}},
        'password':{selector:'[formcontrolname=password]',test_data:{'short':config.ureed_password}},
        'submit':{selector:'[type=submit]',test_data:{'click':'click'}}
    };


    browser.get(config.ureed_link+'/en/account/login');
    browser.driver.sleep(5000);

    element(by.css(loginData.email.selector)).sendKeys(loginData.email.test_data.exist);

    element(by.css(loginData.password.selector)).sendKeys(loginData.password.test_data.short);

    element(by.css(loginData.submit.selector)).click();
 browser.driver.sleep(5000);

}

describe('Qistas login and get data', function() {
    browser.waitForAngularEnabled(false);







    it('Ureed user login',function(){

        loginClientSide();
    });



});

