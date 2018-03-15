//'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */



describe('delete user before register', function() {


    browser.waitForAngularEnabled(false);

    it('1_ login to admin and delete the whole user ', function() {
        browser.get(config.backend_url + 'admin');
        element(by.css('[name=username]')).sendKeys(config.admin_username);
        element(by.css('[name=password]')).sendKeys(config.admin_password);
        element(by.css('[type=submit]')).click();



        browser.get(config.backend_url + 'admin/auth/user/?q=taylorsuccessor@gmail.com');





        if(element(by.css('th[class="field-username"] a')).isPresent()){
            var user_link=element(by.css('th[class="field-username"] a')).click();
            var user_link=element(by.css('p[class="deletelink-box"] a')).click();


            var confirm_delete_user_button=element(by.css('[type=submit]')).click();
            // browser.driver.sleep(50000);
        }

    });



});
