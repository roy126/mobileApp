let but_log_in = document.querySelector('#log_in');
let but_pay = document.querySelector('#pay');
let block_main = document.querySelector('.flex_container').children[0];
let auth_but = document.querySelector('#auth_but');
let logo = document.querySelector('.logo');

but_log_in.onclick = function(e) {
    block_main.querySelector('.block_buttons').classList.add('hidden');
    block_main.querySelector('.block_log_in').classList.remove('hidden');
};
logo.onclick = function(){
    block_main.querySelector('.block_buttons').classList.remove('hidden');
    block_main.querySelector('.block_log_in').classList.add('hidden');
};
auth_but.onclick = function() {
    let login = document.querySelector('#login').value;
    let password = document.querySelector('#password').value;
    if (login && password) {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=2&textFieldUsername=' + login + '&textFieldPassword=' + password, true);
        xhr.onload = function() {
            let result = JSON.parse(this.responseText)[0];
            if(Number(result.code) === 202 || Number(result.code) === 204){
                document.querySelector('#log_in_result').style.padding = '9px';
                document.querySelector('#log_in_result').innerHTML = '<span style="color:red;font-width: 700;">' + result.msg + '<span>';
                document.querySelector('#password').value = '';
            }else{
                let person_id = result.person_id;
                if(person_id){
                    window.location.href = 'account.html?person_id=' + person_id;
                }
            }
        }
        xhr.onerror = function() {
            alert('Ошибка ' + this.status);
        }
        xhr.send();
    }
};