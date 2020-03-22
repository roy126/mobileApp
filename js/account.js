let person_id = window.location.search.replace('?', '').split('=')[1];
let childrens;
if (person_id && Number(person_id) > 0) {
  var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  var xhr = new XHR();
  xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=8&person_id=' + person_id, true);
  xhr.onload = function() {
    let result = JSON.parse(this.responseText);
    if (Number(result.code) === 200) {
      document.querySelector('#num_ls').innerHTML = result.num_ls;
      document.querySelector('#history_link').setAttribute('href', 'history.html?num_ls=' + result.num_ls);
      if (result.childrens.length > 0) {
        let balance_all = 0;
        let li = '';
        childrens =  result.childrens;
        result.childrens.forEach(element => {
          li += '<li class="child" student_id="'+element.student_id+'">'+element.FIO+'</li>';
          balance_all += Number(element.balance);
          document.querySelector('#balance').innerText = element.balance;
          document.querySelector('#pay_link').setAttribute('href', 'pay.html?num_ls=' + result.num_ls + '&balance=' + element.balance);
        });
        document.querySelector('.childrens').innerHTML = li;
      }
    }
  }
  xhr.send();
}


let touchStartY = 0;
let touchStartX = 0;
document.body.addEventListener('touchstart', function(e) {
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
});
document.body.addEventListener('touchend', function(e) {
  touchEndY = e.changedTouches[0].clientY;
  touchEndX = e.changedTouches[0].clientX;
  let countX = Math.max(touchStartX, touchEndX) - Math.min(touchStartX, touchEndX);
  let countY = 0;
  if (countX > 50) {
    document.querySelector('.main').style.marginTop = 0;
  }
  if (touchStartY < touchEndY) {
    countY = Math.max(touchStartY, touchEndY) - Math.min(touchStartY, touchEndY);
  }
  if (countY < 300) {
    document.querySelector('.main').style.marginTop = 0;
  }
  if (touchStartY < 100) {
    swipe_top_refresh(countX, countY);
  }
});
document.querySelector('.main').addEventListener('touchmove', function(e) {
  if (e.touches[0].clientY > 10 && e.touches[0].clientY < 150) {
    document.querySelector('.main').style.marginTop = e.touches[0].clientY / 5 + 'px';
  }
});

function swipe_top_refresh(countX, countY) {
  if (countX > 0 && countX < 50 && countY > 50 && countY < 300) {
    window.location.reload();
  }
}
//Предзагрузка страницы
document.onreadystatechange = function(){
  if(document.readyState === 'complete'){
    let obj = document.querySelector('#load');
    obj.style.display= 'none';
  }
}

let main = document.querySelector('section.main');
let children = document.querySelector('section.children');

document.querySelector('#but_children').onclick = function(){
  main.style.display = 'none';
  children.style.display = 'block';
};

document.querySelector('.childrens').onclick = function(e){
  document.querySelectorAll('.child').forEach(function(item){
    item.classList.remove('child_active');
  });
  if(e.target.classList.contains('child')){
    e.target.classList.add('child_active'); 
    document.querySelector('#bufet_check').removeAttribute('disabled');
    document.querySelector('#credit_check').removeAttribute('disabled');
    let item_child;
    if(Number(e.target.getAttribute('student_id'))> 0){
      childrens.forEach(item => {
        if(Number(item.student_id) === Number(e.target.getAttribute('student_id'))){
          item_child = item;
        }
      });
    } 
    if(item_child){
      document.querySelector('#num_ls_child').innerText = item_child.num_ls;
      document.querySelector('#balance_child').innerText = item_child.balance + ' руб.';
      document.querySelector('#fio_child').innerText = item_child.FIO;
      document.querySelector('#city_child').innerText = item_child.city;
      document.querySelector('#school_child').innerText = item_child.num_school;
      document.querySelector('#class_child').innerText = item_child.num_class;
      if(!!Number(item_child.bufet)){
        document.querySelector('#bufet_check').setAttribute('checked','true');
      }else{
        document.querySelector('#bufet_check').removeAttribute('checked');
      }

      if(!!Number(item_child.credit)){
        document.querySelector('#credit_check').setAttribute('checked','true');
      }else{
        document.querySelector('#credit_check').removeAttribute('checked');
      }
    }
  }
  document.querySelector('#bufet_check').onchange = function(e){
    if(this.checked){
      this.setAttribute('checked','true');
    }else{
      this.removeAttribute('checked');
    }
  }
  document.querySelector('#credit_check').onchange = function(e){
    if(this.checked){
      this.setAttribute('checked','true');
    }else{
      this.removeAttribute('checked');
    }
  }
}


document.querySelector('#back').onclick = function(){
  main.style.display = 'block';
  children.style.display = 'none';
}