

fs = require('fs')
screen_name_list = [];

const report_time = new Date().toISOString();
function append_to_file(file_name, data){
    fs.appendFile(file_name,data, function (err) {
        if (err) throw err;
    });
}


function logs(data){
    const current_time = new Date().toISOString();
    append_to_file('./data/logs.txt','[new-log]'+' '+current_time+' ' + data);
}

function save_success_send_message(screen_name, message){
    append_to_file('./data/success_screen_name_data_['+report_time+'].txt',screen_name+"\n");

    const screenshot_name = 'success_'+screen_name+'['+report_time+'].png';
    take_screenshot(screenshot_name);
    append_to_file('./data/success_report_['+report_time+'].html',`
<h1> `+screen_name+`</h1>
<p> `+message+`</p>
<div><img src="./`+screenshot_name+`" width="500" height="auto" ></div>

`);

}

function save_error_send_message(screen_name, message){
    append_to_file('./data/error_screen_name_data_['+report_time+'].txt',screen_name+"\n");

    const screenshot_name = 'error_'+screen_name+'['+report_time+'].png';
    take_screenshot(screenshot_name);
    append_to_file('./data/error_report_['+report_time+'].html',`
<h1> `+screen_name+`</h1>
<p> `+message+`</p>

<div><img src="./`+screenshot_name+`" width="500" height="auto" ></div>
`);

}

function take_screenshot(name){

    browser.takeScreenshot().then(function (png) {
        var stream = fs.createWriteStream("data/"+name);
        stream.write(new Buffer(png, 'base64'));
        stream.end();
    });
}




var steps={
    //        1: {
    //            "event":"go_to_url",
    //            "value":"https://www.google.com/",
    //            "next_step_number":2,
    //            "callback":()=>{}
    //        }, 
    //        2 :{ 
    //            "event":"write_text",
    //            "selector_type":"css",
    //            "selector":"[name=q]",
    //            "value":"hello",
    //            "next_step_number": 3,
    //        },
    //
    //        3 :{
    //            "event":"click",
    //            "selector_type":"css",
    //            "selector":"#abar_button_opt",
    //            "next_step_number": 4,
    //        },
    //        
    //        4 :{ 
    //            "event":"click",
    //            "selector_type":"css",
    //            "selector":"#hdvvvvtb-tls",
    //            "next_step_number": 5,
    //        },
    //        

    1: {
        "event":"go_to_url",
        "value":"https://twitter.com/i/flow/login",
        "next_step_number":6,
        "callback":()=>{}
    }, 


    6 :{ 
        "event":"write_text_with_enter",
        "selector_type":"css",
        "selector":"#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-kemksi.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1dqxon3 > div > div.css-1dbjc4n.r-mk0yit.r-1f1sjgu.r-13qz1uu > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div > input",
        "value":"taylorsuccesso2",
        "next_step_number": 7,
    },
    7 :{ 
        "event":"write_text_with_enter",
        "selector_type":"css",
        "selector":"#layers > div > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-kemksi.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1dqxon3 > div > div.css-1dbjc4n.r-mk0yit.r-13qz1uu > div > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div.css-901oao.r-1awozwy.r-1fmj7o5.r-6koalj.r-37j5jr.r-1inkyih.r-16dba41.r-135wba7.r-bcqeeo.r-13qz1uu.r-qvutc0 > input",
        "value":"Edcvbgtf@16",
        "callback":()=>{browser.driver.sleep(1000);}
    },
};


function add_send_message_steps(screen_name, message){
    const keys = Object.keys(steps);
    var last_number = parseInt( keys.sort((a, b) => parseInt(b) - parseInt(a))[0]);
    steps[last_number]['next_step_number'] = last_number +1;


    var first = last_number +1;
    var second = last_number +2;

    var third = last_number +3;

    steps[first] = {
        "event":"go_to_url",
        "value":'https://twitter.com/'+screen_name,
        "next_step_number":second,
        "callback":()=>{}
    }; 

    steps[second]={
        "event":"click",
        "selector_type":"css",
        "selector":'[tabindex="0"][aria-label="Message"]',
        "next_step_number": third,
        "screen_name":screen_name,
        "message":"["+second+"-step]"+message
    };

    steps[third]={ 
        "event":"write_text",
        "selector_type":"css",
        "selector":'[class~="public-DraftStyleDefault-block"]',
        "screen_name":screen_name,
        "message":"["+third+"-step]"+message,
        "value":message,
        "callback":()=>{save_success_send_message(screen_name,'['+third+'-step]'+message);}
    };

    console.log(steps);


}
function get_element_or_fail(selector_type,selector,callback){
    var element_by = null
    var selected_element = null 
    if(selector_type =='css'){
        element_by = by.css(selector);
    }else{

        //var first = element(by.cssContainingText('span','@taylorsuccesso2'))
        // element(by.buttonText('Save'));
    }
    browser.wait(()=>{ return element(element_by).isPresent();},5000).then(()=>{
        callback(browser.driver.findElement(element_by));
    }).catch(()=>{

        callback(false);

        console.log('===============================ffffffffff================', selector);
        console.log('=======================>>>>========ffffffffff================');
    });

}

function go_to_url(step_data, callback){
    browser.get(step_data['value']).then(()=>{

        callback();
    });


}


function write_text_with_enter(step_data, callback){

    get_element_or_fail(step_data['selector_type'], step_data['selector'],(element)=>{
        if(element === false){
            return callback(false);
        }
        element.sendKeys(step_data['value']);
        element.sendKeys(protractor.Key.ENTER)
        callback(element);

    });

}


function write_text(step_data, callback){

    get_element_or_fail(step_data['selector_type'], step_data['selector'],(element)=>{
        if(element === false){
            return callback(false);
        }
        element.sendKeys(step_data['value']);
        callback(element);

    });

}

function click(step_data, callback){

    get_element_or_fail(step_data['selector_type'], step_data['selector'],(element)=>{
        if(element === false){

            return callback(false);
        }

        element.click();
        callback(element);

    });

}

function start_step_by_number(step_number){
    var step_data = steps[step_number]; 
    console.log(step_data);
    if(step_data['event'] == 'go_to_url'){
        go_to_url(step_data,()=>{

            if( 'callback' in step_data){
                step_data['callback']();
            }

            if( 'next_step_number' in step_data){
                start_step_by_number(step_data['next_step_number']);
            }

        });

    }



    if(step_data['event'] == 'write_text_with_enter'){
        write_text_with_enter(step_data,(element)=>{
            if(element === false){
                console.log('error step number (' + step_number + ')');
                if('screen_name' in step_data){

                    save_error_send_message(step_data['screen_name'],step_data['message']);
                }
            }

            else if( 'callback' in step_data){
                step_data['callback']();
            }

            if( 'next_step_number' in step_data){
                start_step_by_number(step_data['next_step_number']);
            }


        });
    }


    if(step_data['event'] == 'write_text'){
        write_text(step_data,(element)=>{
            if(element === false){
                if('screen_name' in step_data){

                    save_error_send_message(step_data['screen_name'],step_data['message']);
                }

                console.log('error step number (' + step_number + ')');
            }

            else if( 'callback' in step_data){
                step_data['callback']();
            }

            if( 'next_step_number' in step_data){
                start_step_by_number(step_data['next_step_number']);
            }


        });
    }

    if(step_data['event'] == 'click'){
        click(step_data,(element)=>{
            if(element === false){
                if('screen_name' in step_data){

                    save_error_send_message(step_data['screen_name'],step_data['message']);
                }

                console.log('error step number (' + step_number + ')');
            } else if( 'callback' in step_data){
                step_data['callback']();
            }

            if( 'next_step_number' in step_data){
                start_step_by_number(step_data['next_step_number']);
            }

        });
    }

}

function send_steps(){


    data = fs.readFileSync('./data/screen_name_data.txt', 'utf8');
    data = data.split(/\r?\n/);
    var screen_name_list = [];
    for(var i=0;i< data.length; i++){
        var screen_name = data[i];
        screen_name = screen_name.trim()
        if(screen_name.length > 1){
            screen_name_list.push(screen_name);
        }
    }


    for(var j=0; j < screen_name_list.length; j++){


        add_send_message_steps(screen_name_list[j], 'hello man where are you skjdflskdjf slkjd fklsj dfklj aslkdfjlaksjdfklsjdfkljsdfkjsdkljf');
    }



    browser.waitForAngularEnabled(false);
    start_step_by_number(1);


    browser.driver.sleep(233000)


}

describe('send steps', function(){

    it('test',function(){

        send_steps();

    });
});







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
        for(var i = 0; i< screen_name_list.length;i++){
            send_one_message(screen_name_list[i]);

            console.log(screen_name_list[i],'xxxxxxxxxxxxxxxxxxxxxxvvvvvv');
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


//describe('twitter login and send message ', start_twitter);

