let auth_but = document.querySelector('#auth_but');

auth_but.onclick = function(e) {
  let login = document.querySelector('#login').value;
  let password = document.querySelector('#password').value;
  if (document.querySelector('#login').classList.contains('valid_input') ||
    document.querySelector('#password').classList.contains('valid_input')) {
    document.querySelector('#login').classList.remove('valid_input');
    document.querySelector('#password').classList.remove('valid_input');
  }
  if (login && password) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=2&textFieldUsername=' + login + '&textFieldPassword=' + password, true);
    xhr.onload = function() {
      let result = JSON.parse(this.responseText)[0];
      if (Number(result.code) === 202 || Number(result.code) === 204) {
        document.querySelector('#log_in_result').style.padding = '9px';
        document.querySelector('#log_in_result').innerHTML = '<span style="color:red;font-width: 700;">' + result.msg + '<span>';
        document.querySelector('#password').value = '';
      } else {
        let person_id = result.person_id;
        if (person_id) {
          window.location.href = 'account.html?person_id=' + person_id;
        }
      }
    }
    xhr.onerror = function() {
      document.querySelector('#log_in_result').innerHTML = '<span style="color:red;font-width: 700;">' + this.status + '<span>';
    }
    xhr.send();
  } else {
    if (!login) {
      document.querySelector('#login').classList.add('valid_input');
    }
    if (!password) {
      document.querySelector('#password').classList.add('valid_input');
    }
    document.querySelector('#log_in_result').innerHTML = '<span style="color:red;font-width: 700;">Заполните поля!<span>';
  }
};