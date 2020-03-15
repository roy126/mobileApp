let res_pass_but = document.querySelector('#res_pass_but');
let reset_log_result = document.querySelector('#reset_log_result');
res_pass_but.onclick = function() {
  if (res_pass_but.value === 'Вернуться') {
    history.back();
    return;
  }
  document.querySelector('#login_email').classList.remove('valid_input');
  reset_log_result.innerHTML = '';
  let login_email = document.querySelector('#login_email').value;
  if (login_email) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=9&textFieldUsername=' + login_email, true);
    xhr.onload = function() {
      let result = JSON.parse(this.responseText);
      console.log(this.responseText);
      if (Number(result.code) === 200) {
        res_pass_but.value = 'Вернуться';
        reset_log_result.innerHTML = '<span style="color:green">' + result.msg + '</span>';
      } else {
        reset_log_result.innerHTML = '<span style="color:red">' + result.msg + '</span>';
      }
    }
    xhr.send();
  } else {
    reset_log_result.innerHTML = '<span>Заполните поле!</span>';
    document.querySelector('#login_email').classList.add('valid_input');
  }
};