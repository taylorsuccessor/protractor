

describe('activate user from admin after login ', function() {


    browser.waitForAngularEnabled(false);

    it('1_ activate user ', function() {


        browser.get(config.backend_url+'admin/account/emailaddress/?q=taylorsuccessor@gmail.com');


        element(by.css('[value=Search]')).click()



        if(element(by.css('th[class=field-email] a')).isPresent()){
            element(by.css('th[class=field-email] a')).click();
            element(by.css('#id_verified')).click();
            element(by.css('[name=_save]')).click();
        }

    });



});