let num_ls = window.location.search.replace('?', '').split('=')[1];
if (num_ls) {
  var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
  var xhr = new XHR();
  xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=10&num_ls=' + num_ls, true);
  xhr.onload = function() {
    let result = JSON.parse(this.responseText);
    let list = '';
    if (result.length > 0) {
      result.forEach(item => {
        list += '<li class="operation" style="display: none;">' + item.type_movement + ' / ' + item.amount + ' / Баланс: ' + item.balance + '</li>';
      });
      document.querySelector('.history_list').innerHTML = list;
      $(function() {
        $(".operation").slice(0, 7).show();
        $("#loadMore").on('click', function(e) {
          e.preventDefault();
          $(".operation:hidden").slice(0, 7).slideDown();
        })
      })
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

  if (touchStartX < 100 && touchEndX < 150) {
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