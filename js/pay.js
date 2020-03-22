let num_ls = window.location.search.replace('?', '').split('&')[0].split('=')[1];
balance =window.location.search.replace('?', '').split('&')[1].split('=')[1];

if(num_ls && balance){
    document.querySelector('#balance').innerText = balance;
    document.querySelector('#num_ls').innerText = num_ls;

}
//Предзагрузка страницы
document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
      let obj = document.querySelector('#load');
      obj.style.display= 'none';
    }  
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

  if (touchStartX < 100 && touchEndX < 450) {
    if ((touchEndX - touchStartX) > 20) {
      history.back();
    } else {
      document.body.style.marginLeft = '0px';
    }
  }
});
document.body.addEventListener('touchmove', function(e) {
  if (e.touches[0].clientX > 10 && e.touches[0].clientX < 150) {
    document.body.style.marginLeft = e.touches[0].clientX / 5 + 'px';
  }
});

document.querySelector('#pay_button').onclick = function(e){
    e.preventDefault();
    let num_ls = document.querySelector('#num_ls_input');
    let summ = document.querySelector('#summ_input');
    num_ls.classList.remove('valid_input');
    summ.classList.remove('valid_input');
    if(num_ls.value && summ.value){
        pay();
    }else{
        if(!num_ls.value){
            num_ls.classList.add('valid_input');
        }
        if(!summ.value){
            summ.classList.add('valid_input');
        }
    }
}

function pay(){
    
}