let reg_but = document.querySelector('#reg_but');

reg_but.onclick = function(e) {
  if (reg_but.value === 'Войти') {
    history.back();
    return;
  }
  reset_valid();
  let login = document.querySelector('#login').value,
    password = document.querySelector('#password').value,
    password2 = document.querySelector('#password2').value,
    name = document.querySelector('#name').value,
    family = document.querySelector('#family').value,
    fio_reb = document.querySelector('#fio_reb').value,
    num_ls = document.querySelector('#num_ls').value,
    email = document.querySelector('#email').value;

  if (login && password && password2 && name && family && fio_reb && num_ls && email) {
    if (password !== password2) {
      document.querySelector('#reg_log_result').innerHTML = 'Пароли не совпадают';
      return;
    }
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=1&textFieldUsername=' + login + '&textFieldPassword=' + password + '&textFieldEmail=' + email + '&textFieldName=' + name + '&textFieldFamilia=' + family + '&textFieldFIOKids=' + fio_reb + '&textFieldLS=' + num_ls, true);
    xhr.onload = function() {
      let result = JSON.parse(this.responseText);
      if (Number(result.status) === 200) {
        reg_but.value = 'Войти';
        document.querySelector('#reg_log_result').innerHTML = '<span style="color:green;">' + result[0].regstatus + '</span><br><a href="">Войти</a>';
      } else {
        document.querySelector('#reg_log_result').innerHTML = '<span style="color:red;">' + result[0].regstatus + '</span>';
      }
    }
    xhr.send();

  } else {
    check_valid_form(login, password, password2, name, family, fio_reb, num_ls, email);
  }
};

function reset_valid() {
  document.querySelector('#login').classList.remove('valid_input');
  document.querySelector('#password').classList.remove('valid_input');
  document.querySelector('#password2').classList.remove('valid_input');
  document.querySelector('#name').classList.remove('valid_input');
  document.querySelector('#family').classList.remove('valid_input');
  document.querySelector('#fio_reb').classList.remove('valid_input');
  document.querySelector('#num_ls').classList.remove('valid_input');
  document.querySelector('#email').classList.remove('valid_input');
}

function check_valid_form(login, password, password2, name, family, fio_reb, num_ls, email) {
  if (!login) {
    document.querySelector('#login').classList.add('valid_input');
  }
  if (!password) {
    document.querySelector('#password').classList.add('valid_input');
  }
  if (!password2) {
    document.querySelector('#password2').classList.add('valid_input');
  }
  if (!name) {
    document.querySelector('#name').classList.add('valid_input');
  }
  if (!family) {
    document.querySelector('#family').classList.add('valid_input');
  }
  if (!fio_reb) {
    document.querySelector('#fio_reb').classList.add('valid_input');
  }
  if (!num_ls) {
    document.querySelector('#num_ls').classList.add('valid_input');
  }
  if (!email) {
    document.querySelector('#email').classList.add('valid_input');
  }
}