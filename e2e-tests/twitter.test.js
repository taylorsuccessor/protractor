
fs = require('fs')
screen_name_list = [];

function append_to_file(file_name, data){
fs.appendFile(file_name,data, function (err) {
  if (err) throw err;
});
}


function logs(data){
    const current_time = new Date().toISOString();
    append_to_file('./data/logs.txt','[new-log]'+' '+current_time+' ' + data);
}

function save_success_send_message(screen_name){
append_to_file('./data/success_screen_name_data.txt',screen_name);
}

function save_error_send_message(screen_name){
append_to_file('./data/error_screen_name_data.txt',screen_name);
}

function get_element(selector_type,selector){
    var element_by = null
    var selected_element = null 
    if(selector_type =='css'){
        console.log(selector);
        element_by = by.css(selector);
    }else{

        //var first = element(by.cssContainingText('span','@taylorsuccesso2'))
        // element(by.buttonText('Save'));
    }
    browser.wait(function() { return element(element_by).isPresent()});
    selected_element = element(element_by);


    return selected_element;
}

function send_one_message(screen_name){

    browser.get('https://twitter.com/'+screen_name);
    var message_button = get_element('css','[tabindex="0"][aria-label="Message"]')
    message_button.click()

    var message_input =  get_element('css','[class~="public-DraftStyleDefault-block"]')


    message_input.sendKeys('Hello')
    if(message_input){

save_success_send_message(screen_name);
    }
    //        message_input.sendKeys(protractor.Key.ENTER)



}

function excuteScript(scritp_test){
    browser.executeScript('alert(444444);document.querySelector("body").innerHTML = 9');
}



function start_twitter(){

    browser.waitForAngularEnabled(false);

    it('1_ activate user ', function() {


        browser.get('https://twitter.com/i/flow/login');

        var username_input = get_element('css','#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-kemksi.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1dqxon3 > div > div.css-1dbjc4n.r-mk0yit.r-1f1sjgu.r-13qz1uu > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div > input')
        username_input.sendKeys('taylorsuccesso2')

        var next_button = get_element('css','#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-kemksi.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1dqxon3 > div > div:nth-child(6) > div > span > span');
        next_button.click()



        var password_input = get_element('css','#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-kemksi.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1dqxon3 > div > div.css-1dbjc4n.r-mk0yit.r-13qz1uu > div > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div.css-901oao.r-1awozwy.r-1fmj7o5.r-6koalj.r-37j5jr.r-1inkyih.r-16dba41.r-135wba7.r-bcqeeo.r-13qz1uu.r-qvutc0 > input')
        password_input.sendKeys('Edcvbgtf@16')
        password_input.sendKeys(protractor.Key.ENTER)


        //var login_button = element(by.cssContainingText('span','Log in'))
        // login_button.click();



        browser.driver.sleep(2000)
        console.log(screen_name_list,'xxxxxxxxxxxxxxxxxxxxxxvvvvvv');
        for(var i = 0; i< screen_name_list.length;i++){
            send_one_message(screen_name_list[i]);
        }

        browser.driver.sleep(22000)




    });



}
data = fs.readFileSync('./data/screen_name_data.txt', 'utf8');
data = data.split(/\r?\n/);
for(var i=0;i< data.length; i++){
    var screen_name = data[i];
    screen_name = screen_name.trim()
    if(screen_name.length > 1){
    screen_name_list.push(screen_name);
    }
}


describe('twitter login and send message ', start_twitter);

