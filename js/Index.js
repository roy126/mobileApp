if(localStorage.getItem('person_id')){
  window.location.href = 'account.html?person_id=' + localStorage.getItem('person_id');
}
let section_auth = document.querySelector('#section_auth');
let section_res_pass = document.querySelector('#section_res_pass');
let section_registry = document.querySelector('#section_registry');

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
          localStorage.setItem('person_id', person_id);
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
//Предзагрузка страницы
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    let obj = document.querySelector('#load');
    obj.style.display = 'none';
  }
}

document.querySelector('#but_res_pass').onclick = function(){
  section_auth.style.display = 'none';
  section_registry.style.display = 'none';
  section_res_pass.style.display = 'block';
}
document.querySelector('#but_registry').onclick = function(){
  section_auth.style.display = 'none';
  section_res_pass.style.display = 'none';
  section_registry.style.display = 'block';
}
//////////////////////////////////////////////////////
document.querySelector('#back_to_auth').onclick = function(){
  section_registry.style.display = 'none';
  section_res_pass.style.display = 'none';
  section_auth.style.display = 'block';
}

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

//////////////////////////////////////////////////////////////
document.querySelector('#back_to_auth2').onclick = function(){
  section_registry.style.display = 'none';
  section_res_pass.style.display = 'none';
  section_auth.style.display = 'block';
}

let reg_but = document.querySelector('#reg_but');

reg_but.onclick = function(e) {
  if (reg_but.value === 'Войти') {
    section_registry.style.display = 'none';
    section_res_pass.style.display = 'none';
    section_auth.style.display = 'block';
    return;
  }
  reset_valid();
  let login = document.querySelector('#login_input').value,
    password = document.querySelector('#password_input').value,
    password2 = document.querySelector('#password2_input').value,
    name = document.querySelector('#name_input').value,
    family = document.querySelector('#family_input').value,
    fio_reb = document.querySelector('#fio_reb_input').value,
    num_ls = document.querySelector('#num_ls_input').value,
    email = document.querySelector('#email_input').value;

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
      console.log(result);
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
  document.querySelector('#login_input').classList.remove('valid_input');
  document.querySelector('#password_input').classList.remove('valid_input');
  document.querySelector('#password2_input').classList.remove('valid_input');
  document.querySelector('#name_input').classList.remove('valid_input');
  document.querySelector('#family_input').classList.remove('valid_input');
  document.querySelector('#fio_reb_input').classList.remove('valid_input');
  document.querySelector('#num_ls_input').classList.remove('valid_input');
  document.querySelector('#email_input').classList.remove('valid_input');
}

function check_valid_form(login, password, password2, name, family, fio_reb, num_ls, email) {
  if (!login) {
    document.querySelector('#login_input').classList.add('valid_input');
  }
  if (!password) {
    document.querySelector('#password_input').classList.add('valid_input');
  }
  if (!password2) {
    document.querySelector('#password2_input').classList.add('valid_input');
  }
  if (!name) {
    document.querySelector('#name_input').classList.add('valid_input');
  }
  if (!family) {
    document.querySelector('#family_input').classList.add('valid_input');
  }
  if (!fio_reb) {
    document.querySelector('#fio_reb_input').classList.add('valid_input');
  }
  if (!num_ls) {
    document.querySelector('#num_ls_input').classList.add('valid_input');
  }
  if (!email) {
    document.querySelector('#email_input').classList.add('valid_input');
  }
}