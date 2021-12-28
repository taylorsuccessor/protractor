

fs = require('fs')
screen_name_list = [];

const report_time = new Date().toISOString();
const report_dir = './data/report/twitter/'+report_time+'/';
if (!fs.existsSync(report_dir)){
	fs.mkdirSync(report_dir, { recursive: true });
}

function append_to_file(file_name, data){
	fs.appendFile(file_name,data, function (err) {
		if (err) throw err;
	});
}


function logs(data){
	const current_time = new Date().toISOString();
	append_to_file(report_dir+'logs.txt','[new-log]'+' '+current_time+' ' + data);
}

function save_success_send_message(screen_name, message){
	append_to_file(report_dir+'success_screen_name_data_['+report_time+'].txt',screen_name+"\n");

	const screenshot_name = 'success_'+screen_name+'['+report_time+'].png';
	take_screenshot(screenshot_name);
	append_to_file(report_dir+'success_report_['+report_time+'].html',`
<h1> `+screen_name+`</h1>
<p> `+message+`</p>
<div><img src="./`+screenshot_name+`" width="500" height="auto" ></div>

`);

}

function save_error_send_message(screen_name, message){
	append_to_file(report_dir+'error_screen_name_data_['+report_time+'].txt',screen_name+"\n");

	const screenshot_name = 'error_'+screen_name+'['+report_time+'].png';
	take_screenshot(screenshot_name);
	append_to_file(report_dir+'error_report_['+report_time+'].html',`
<h1> `+screen_name+`</h1>
<p> `+message+`</p>

<div><img src="./`+screenshot_name+`" width="500" height="auto" ></div>
`);

}

function take_screenshot(name){

	browser.takeScreenshot().then(function (png) {
		var stream = fs.createWriteStream(report_dir+name);
		stream.write(new Buffer(png, 'base64'));
		stream.end();
	});
}




var steps={
	1: {
		"event":"go_to_url",
		"value":"https://twitter.com/i/flow/login",
		"next_step_number":2,
		"callback":()=>{}
	}, 

	2 :{ 
		"event":"write_text_with_enter",
		"selector_type":"css",
		"selector":"input[type=text]",
		"value":"taylorsuccesso2",
		"next_step_number": 3,
	},
	3 :{ 
		"event":"write_text_with_enter",
		"selector_type":"css",
		"selector":"input[type=password]",
		"value":"Edcvbgtf@16",
		"callback":()=>{browser.driver.sleep(3000);}
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

	message = fs.readFileSync('./data/message.txt', 'utf8').trim();


	for(var j=0; j < screen_name_list.length; j++){


		add_send_message_steps(screen_name_list[j], message);
	}

	browser.waitForAngularEnabled(false);
	start_step_by_number(1);

}

describe('send steps', function(){

	it('test',function(){

		send_steps();

	});
});



