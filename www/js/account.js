let person_id = window.location.search.replace('?', '').split('=')[1];
let childrens;
if (person_id && Number(person_id) > 0) {
  var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  var xhr = new XHR();
  xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=8&person_id=' + person_id, true);
  xhr.onload = function () {
    let result = JSON.parse(this.responseText);
    console.log(result);
    if (Number(result.code) === 200) {
      document.querySelector('#num_ls').innerHTML = result.num_ls;
      document.querySelector('#num_ls_input').value = result.num_ls;
      get_history(result.num_ls);
      if (result.childrens.length > 0) {
        let balance_all = 0;
        let li = '';
        childrens = result.childrens;
        result.childrens.forEach(element => {
          li += '<li class="child" student_id="' + element.student_id + '">' + element.FIO + '</li>';
          balance_all += Number(element.balance);
          document.querySelector('#balance').innerText = element.balance;
        });
        document.querySelector('.childrens').innerHTML = li;
      }
    }
  }
  xhr.send();
}

//Предзагрузка страницы
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    let obj = document.querySelector('#load');
    obj.style.display = 'none';
  }
}

let main = document.querySelector('section.main');
let children = document.querySelector('section.children');
let add_child = document.querySelector('.add_child');
let cash_flow = document.querySelector('.cash_flow');
let section_pay = document.querySelector('.section_pay');
let section_history = document.querySelector('.section_history');
let section_menu = document.querySelector('.section_menu');


document.querySelector('.childrens').onclick = function (e) {
  document.querySelectorAll('.child').forEach(function (item) {
    item.classList.remove('child_active');
  });
  if (e.target.classList.contains('child')) {
    e.target.classList.add('child_active');
    document.querySelector('#bufet_check').removeAttribute('disabled');
    document.querySelector('#credit_check').removeAttribute('disabled');
    document.querySelector('#credit_check').classList.remove('valid_input');
    let item_child;
    if (Number(e.target.getAttribute('student_id')) > 0) {
      childrens.forEach(item => {
        if (Number(item.student_id) === Number(e.target.getAttribute('student_id'))) {
          item_child = item;
        }
      });
    }
    if (item_child) {
      document.querySelector('#num_ls_child').innerText = item_child.num_ls;
      document.querySelector('#balance_child').innerText = item_child.balance + ' руб.';
      document.querySelector('#fio_child').innerText = item_child.FIO;
      document.querySelector('#city_child').innerText = item_child.city;
      document.querySelector('#school_child').innerText = item_child.num_school;
      document.querySelector('#class_child').innerText = item_child.num_class;
      document.querySelector('#credit_price').value = item_child.credit_price;
      document.querySelector('#bufet_check').setAttribute('student_id', item_child.student_id);
      document.querySelector('#credit_check').setAttribute('student_id', item_child.student_id);
      document.querySelector('#credit_price').setAttribute('student_id', item_child.student_id);
      document.querySelector('#history_link_reb').setAttribute('num_ls', item_child.num_ls)
      if (!!Number(item_child.bufet)) {
        document.querySelector('#bufet_check').checked = true;
      } else {
        document.querySelector('#bufet_check').checked = false;
      }
      if (!!Number(item_child.credit)) {
        document.querySelector('#credit_check').checked = true;
        document.querySelector('#credit_price_block').style.display = 'block';
      } else {
        document.querySelector('#credit_check').checked = false;
        document.querySelector('#credit_price_block').style.display = 'none';
      }
    }
  }
  document.querySelector('#bufet_check').onchange = function (e) {
    let student_id = this.getAttribute('student_id');
    let value = this.checked;
    editCheck(1, value, student_id);
  }
  document.querySelector('#credit_check').onchange = function (e) {
    let student_id = this.getAttribute('student_id');
    let value = this.checked;
    if (this.checked) {
      document.querySelector('#credit_price_block').style.display = 'block';
    } else {
      document.querySelector('#credit_price_block').style.display = 'none';
    }
    editCheck(2, value, student_id);
  }

  document.querySelector('#credit_price').onchange = function (e, a, v) {
    if (!isNaN(Number(this.value))) {
      let student_id = this.getAttribute('student_id');
      let summ = Number(this.value);
      if (summ > 150 || summ < 0) {
        this.classList.add('valid_input');
      } else {
        editCheck(3, '', student_id, summ);
      }
    }
  };
}
document.querySelector('#but_children').onclick = function () {
  show_load();
  main.style.display = 'none';
  add_child.style.display = 'none';
  section_menu.style.display = 'none';
  cash_flow.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
  children.style.display = 'block';
  hash(true, 'children');
};

document.querySelector('#back').onclick = function () {
  main.style.display = 'block';
  children.style.display = 'none';
  add_child.style.display = 'none';
  section_menu.style.display = 'none';
  cash_flow.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
  hash(false);

}
document.querySelector('#back_to_childrens').onclick = function () {
  main.style.display = 'none';
  children.style.display = 'block';
  add_child.style.display = 'none';
  cash_flow.style.display = 'none';
  section_menu.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
  hash(true, 'children');

}
document.querySelector('#back_to_childrens_2').onclick = function () {
  main.style.display = 'none';
  children.style.display = 'block';
  add_child.style.display = 'none';
  cash_flow.style.display = 'none';
  section_menu.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
  hash(true, 'children');

}
document.querySelector('#back_to_account').onclick = function () {
  main.style.display = 'block';
  children.style.display = 'none';
  add_child.style.display = 'none';
  cash_flow.style.display = 'none';
  section_menu.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
  hash(false);
}
document.querySelector('#back_to_account3').onclick = function () {
  main.style.display = 'block';
  add_child.style.display = 'none';
  cash_flow.style.display = 'none';
  section_menu.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
  hash(false);
}
document.querySelector('#back_to_account2').onclick = function () {
  if (this.getAttribute('reb')) {
    children.style.display = 'block';
    main.style.display = 'none';
  } else {
    main.style.display = 'block';
    hash(false);
    children.style.display = 'none';
  }
  add_child.style.display = 'none';
  cash_flow.style.display = 'none';
  section_menu.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
}
document.querySelector('.add_reb').onclick = function () {
  show_load();
  main.style.display = 'none';
  children.style.display = 'none';
  cash_flow.style.display = 'none';
  section_menu.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
  add_child.style.display = 'block';
  hash(true, 'children');
  document.querySelector('#fio_reb_add').value = '';
  document.querySelector('#num_ls_reb_add').value = '';
  document.querySelector('#add_reb_result').innerHTML = '';
}
document.querySelector('#pay_link').onclick = function () {
  show_load();
  main.style.display = 'none';
  children.style.display = 'none';
  cash_flow.style.display = 'none';
  section_menu.style.display = 'none';
  add_child.style.display = 'none';
  section_history.style.display = 'none';
  section_pay.style.display = 'block';
  hash(true, 'children');
  document.querySelector('.result_pay').innerHTML = '';
}
document.querySelector('#history_link').onclick = function () {
  show_load();
  main.style.display = 'none';
  children.style.display = 'none';
  cash_flow.style.display = 'none';
  add_child.style.display = 'none';
  section_pay.style.display = 'none';
  section_menu.style.display = 'none';
  section_history.style.display = 'block';
  hash(true, 'children');
}
document.querySelector('#menu_link').onclick = function () {
  get_menu();
  show_load();
  main.style.display = 'none';
  children.style.display = 'none';
  cash_flow.style.display = 'none';
  add_child.style.display = 'none';
  section_pay.style.display = 'none';
  section_history.style.display = 'none';
  section_menu.style.display = 'block';
  hash(true, 'children');
}

document.querySelector('#pay_cash_link').onclick = function () {
  show_load();
  if (childrens.length > 1) {
    let options = '<option></option>';
    childrens.forEach((item) => {
      options += '<option num_ls="' + item.num_ls + '" balance="' + item.balance + '">' + item.num_ls + '</option>';
    });
    document.querySelector('#combo_cash_from').innerHTML = options;
    document.querySelector('#combo_cash_to').innerHTML = options;
  }
  main.style.display = 'none';
  children.style.display = 'none';
  add_child.style.display = 'none';
  section_pay.style.display = 'none';
  section_menu.style.display = 'none';
  section_history.style.display = 'none';
  cash_flow.style.display = 'block';
  hash(true, 'children');
}

function editCheck(type, value, student_id, summ) {
  if (type && student_id) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    let value2 = +value;
    xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=11&student_id=' + student_id + '&value=' + value2 + '&type=' + type + '&summ=' + summ, true);
    xhr.onload = function () {
      let result = JSON.parse(this.responseText);
    }
    xhr.send();
  }
}

document.querySelector('#add_reb_but').onclick = function () {
  let fio = document.querySelector('#fio_reb_add');
  let num_ls = document.querySelector('#num_ls_reb_add');
  if (fio.value && num_ls.value) {
    fio.classList.remove('valid_input');
    num_ls.classList.remove('valid_input');
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=12&num_ls=' + num_ls.value + '&fio=' + fio.value + '&person_id=' + person_id, true);
    xhr.onload = function () {
      let result = JSON.parse(this.responseText);
      let res = '';
      if (Number(result.code) === 202) {
        res = '<span style="color:red;">' + result.msg + '</span>';
      } else {
        res = '<span style="color:green;">' + result.msg + '</span>';
      }
      document.querySelector('#add_reb_result').innerHTML = res;
    }
    xhr.send();
  } else {
    if (!fio.value) {
      fio.classList.add('valid_input');
    } else {
      fio.classList.remove('valid_input');
    }
    if (!num_ls.value) {
      num_ls.classList.add('valid_input');
    } else {
      num_ls.classList.remove('valid_input');
    }
  }
}

document.querySelector('#combo_cash_from').onchange = function (e) {
  let num_ls_selected = this.value;
  if (num_ls_selected) {
    for (const item of document.querySelector('#combo_cash_to').children) {
      if (item.getAttribute('num_ls') === num_ls_selected) {
        item.setAttribute('disabled', 'true');
      } else {
        item.removeAttribute('disabled');
      }
    }
    childrens.forEach((item) => {
      if (item.num_ls === num_ls_selected) {
        document.querySelector('.cash_balance_from').innerHTML = '<p style="font-size:12px;padding:5px">ФИО: ' + item.FIO + '</p><p style="font-size:12px;padding:5px">Баланс: ' + item.balance + ' руб.</p>';
      }
    });
  } else {
    document.querySelector('.cash_balance_from').innerHTML = '';
    for (const item of document.querySelector('#combo_cash_to').children) {
      item.removeAttribute('disabled');
    }
  }
}

document.querySelector('#combo_cash_to').onchange = function (e) {
  let num_ls_selected = this.value;
  if (num_ls_selected) {
    for (const item of document.querySelector('#combo_cash_from').children) {
      if (item.getAttribute('num_ls') === num_ls_selected) {
        item.setAttribute('disabled', 'true');
      } else {
        item.removeAttribute('disabled');
      }
    }
    childrens.forEach((item) => {
      if (item.num_ls === num_ls_selected) {
        document.querySelector('.cash_balance_to').innerHTML = '<p style="font-size:12px;padding:5px">ФИО: ' + item.FIO + '</p><p style="font-size:12px;padding:5px">Баланс: ' + item.balance + ' руб.</p>';
      }
    });
  } else {
    document.querySelector('.cash_balance_to').innerHTML = '';
    for (const item of document.querySelector('#combo_cash_from').children) {
      item.removeAttribute('disabled');
    }
  }
}

document.querySelector('.cash_flow_but').onclick = function () {
  document.querySelector('.result_cash_flow').innerHTML = '';
  let obj_from = document.querySelector('#combo_cash_from');
  let obj_to = document.querySelector('#combo_cash_to');
  let obj_to_index = obj_to.options.selectedIndex;
  let obj_from_index = obj_from.options.selectedIndex;
  let obj_summ_flow = document.querySelector('#count_cash_flow');
  if (obj_from[obj_from_index].value === '') {
    document.querySelector('.result_cash_flow').innerHTML = '<span style="color:red;display:block;text-align:center;">Выберите счет отправителя.</span>';
    return;
  }
  if (obj_to[obj_to_index].value === '') {
    document.querySelector('.result_cash_flow').innerHTML = '<span style="color:red;display:block;text-align:center;">Выберите счет получателя.</span>';
    return;
  }
  if (obj_summ_flow.value.length <= 0) {
    document.querySelector('.result_cash_flow').innerHTML = '<span style="color:red;display:block;text-align:center;">Заполните сумму.</span>';
    return;
  }
  if (Number(obj_from[obj_from_index].getAttribute('balance')) <= 0) {
    document.querySelector('.result_cash_flow').innerHTML = '<span style="color:red;display:block;text-align:center;">На балансе: ' + obj_from[obj_from_index].getAttribute('balance') + ' руб.</span>';
    return;
  }
  if (Number(obj_summ_flow.value) > Number(obj_from[obj_from_index].getAttribute('balance'))) {
    document.querySelector('.result_cash_flow').innerHTML = '<span style="color:red;display:block;text-align:center;">Сумма превышает баланс</span>';
    return;
  }
  var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  var xhr = new XHR();
  xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=13&from=' + obj_from[obj_from_index].value + '&to=' + obj_to[obj_to_index].value + '&summ=' + obj_summ_flow.value, true);
  xhr.onload = function () {
    let result = JSON.parse(this.responseText);
    if (Number(result.code) === 200) {
      obj_summ_flow.value = '';
      document.querySelector('.result_cash_flow').innerHTML = '<span style="color:green;display:block;text-align:center;">' + result.msg + '</span>';
    }
  }
  xhr.send();
}

////////////pay

document.querySelector('#pay_button').onclick = function (e) {
  e.preventDefault();
  let num_ls = document.querySelector('#num_ls_input');
  let summ = document.querySelector('#summ_input');
  num_ls.classList.remove('valid_input');
  summ.classList.remove('valid_input');
  if (num_ls.value && summ.value) {
    ipayCheckout({
      amount: summ.value,
      currency: 'RUB',
      description: 'ЛС №' + num_ls.value
    },
      function (order) { showSuccessfulPurchase(order) },
      function (order) { showFailurefulPurchase(order) })
  } else {
    if (!num_ls.value) {
      num_ls.classList.add('valid_input');
    }
    if (!summ.value) {
      summ.classList.add('valid_input');
    }
  }
}
function showSuccessfulPurchase(order) {
  let user_id = person_id;
  let payid = order.orderNumber;
  let pay = order.formattedAmount;
  let ls = document.querySelector('#num_ls_input').value;
  if (user_id && payid && pay && ls) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=15&pay=' + pay + '&ls=' + ls + '&pay_id=' + payid, true);
    xhr.onload = function () {
      let result = JSON.parse(this.responseText);
      if (Number(result.code) === 200) {
        document.querySelector('.result_pay').innerHTML = '<span style="color:green;">Оплата прошла успешно!</span>';
      }
    }
    xhr.send();
  }
}
////////////////

function get_history(num_ls) {
  if (num_ls) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=10&num_ls=' + num_ls, true);
    xhr.onload = function () {
      let result = JSON.parse(this.responseText);
      let list = '';
      if (result.length > 0) {
        result.forEach(item => {
          list += '<li class="operation" style="display: none;">' + item.type_movement + ' / ' + item.amount + ' / Баланс: ' + item.balance + '</li>';
        });
        document.querySelector('.history_list').innerHTML = list;
        $(function () {
          $(".operation").slice(0, 7).show();
          $("#loadMore").on('click', function (e) {
            e.preventDefault();
            $(".operation:hidden").slice(0, 7).slideDown();
          })
        })
      }
    }
    xhr.send();
  }
}
document.querySelector('#history_link_reb').onclick = function () {
  let num_ls = this.getAttribute('num_ls');
  if (num_ls) {
    document.querySelector('#back_to_account2').setAttribute('reb', true);
    show_load();
    get_history(num_ls);
    main.style.display = 'none';
    children.style.display = 'none';
    cash_flow.style.display = 'none';
    add_child.style.display = 'none';
    section_pay.style.display = 'none';
    section_history.style.display = 'block';
    hash(true, 'children');
  }
}

function show_load() {
  let obj = document.querySelector('#load');
  obj.style.display = 'block';
  setTimeout(function () {
    obj.style.display = 'none';
  }, 800);
}

function get_menu() {
  let menu_block = document.querySelector('.block_menu');
  var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  var xhr = new XHR();
  xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=14&school=МАОУ Гимназия №1&type_menu=Основное меню', true);
  xhr.onload = function () {
    let result = JSON.parse(this.responseText);
    let li = '';
    if (result && result.length > 0) {
      result.forEach(function (item) {
        let li_type = '';
        let menu_p = '';
        item.food.forEach(function (item_1) {
          if (item_1 === 'Завтрак') {
            item.type_food[0].forEach(function (item_2) {
              menu_p += '<p class="menu_item_food">' + item_2.food + '</p>';
            });
          } else {
            item.type_food[1].forEach(function (item_2) {
              menu_p += '<p class="menu_item_food">' + item_2.food + '</p>';
            });
          }
          li_type += '<li class="menu_food_item"><span>' + item_1 + '</span><i class="fa fa-plus"></i></li>' +
            '<div style="display:none;" class="hidden_menu_type">' + menu_p + '</div>';
        });
        li += '<li class="menu_item"><span>' + item.day + '</span><i class="fa fa-plus"></i></li>' +
          '<div style="display: none;" class="hidden_menu">' +
          '<ul class="ul_type_food">' + li_type + '</ul>' +
          '</div>';
      });
      menu_block.innerHTML = '<ul class="ul_menu_main">' + li + '</ul>';
    }
    $('.menu_item').click(function (e) {
      let child = $(this).next('.hidden_menu')[0];
      if ($(this).children('i').hasClass('fa-plus')) {
        $(this).children('i').removeClass('fa-plus').addClass('fa-minus');
        child.style.display = 'block';
      } else {
        $(this).children('i').removeClass('fa-minus').addClass('fa-plus');
        child.style.display = 'none';
      }
    });
    $('.menu_food_item').click(function (e) {
      let child = $(this).next('.hidden_menu_type')[0];
      if ($(this).children('i').hasClass('fa-plus')) {
        $(this).children('i').removeClass('fa-plus').addClass('fa-minus');
        child.style.display = 'block';
      } else {
        $(this).children('i').removeClass('fa-minus').addClass('fa-plus');
        child.style.display = 'none';
      }
    });
  }
  xhr.send();
}

function func_back_button() {
  let array = [main, children, add_child, cash_flow, section_pay, section_history, section_menu];
  array.forEach(function (obj) {
    if (obj.style.display === 'block') {
      switch (obj.className) {
        case 'children':
          show_main();
          break;
        case 'add_child':
          show_main();
          break;
        case 'cash_flow':
          show_main();
          break;
        case 'section_pay':
          show_main();
          break;
        case 'section_history':
          show_main();
          break;
        case 'section_menu':
          show_main();
          break;
        case 'main':
          navigator.app.exitApp();
          break;
      }
    }
  });
  function show_main() {
    children.style.display = 'none';
    cash_flow.style.display = 'none';
    add_child.style.display = 'none';
    section_pay.style.display = 'none';
    section_history.style.display = 'none';
    main.style.display = 'block';
    hash(false);
  }
}

function hash(bool, str) {
  if (bool) {
    location.hash = str;
  } else {
    location.hash = '';
  }
}

window.addEventListener("hashchange", function (e) {
  if (e.oldURL.length > e.newURL.length)
    func_back_button();
})

/* end */