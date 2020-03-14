let person_id = window.location.search.replace( '?', '').split('=')[1]; 
if(person_id && Number(person_id) > 0){
 var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
     var xhr = new XHR();
     xhr.open('GET', 'https://bpcard.ru/ajax/app.php?app_password=&app_number=8&person_id=' + person_id, true);
     xhr.onload = function() {
         let result = JSON.parse(this.responseText);
         console.log(result);
         if(Number(result.code) === 200){
             document.querySelector('#num_ls').innerHTML = result.num_ls;
             if(result.childrens.length > 0){
                 let balance_all = 0;
                 result.childrens.forEach(element => {
                     balance_all += Number(element.balance);            
                        document.querySelector('#balance').innerText = element.balance;                   
                 });
             }           
         }
     }
     xhr.onerror = function() {
  
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
document.body.style.marginTop = 0;
}
if (touchStartY < touchEndY) {
countY = Math.max(touchStartY, touchEndY) - Math.min(touchStartY, touchEndY);
}
console.log(countY);
if (countY < 300) {
document.body.style.marginTop = 0;
}
if (touchStartY < 100) {
swipe_top_refresh(countX, countY);
}
});

function swipe_top_refresh(countX, countY) {
if (countX > 0 && countX < 50 && countY > 50 && countY < 300) {
window.location.reload();
}
}