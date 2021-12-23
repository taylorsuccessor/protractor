

describe('activate user from admin after login ', function() {


    browser.waitForAngularEnabled(false);

    it('1_ activate user ', function() {


        browser.get('https://twitter.com/home');


         browser.driver.sleep(222000);
        search_field = element(by.css('input[enterkeyhint=search]'))
            search_field.click()

        search_field.sendKeys("Hello");

         browser.driver.sleep(220000);

        if(element(by.css('th[class=field-email] a')).isPresent()){
            element(by.css('th[class=field-email] a')).click();
            element(by.css('#id_verified')).click();
            element(by.css('[name=_save]')).click();
        }

    });



});
