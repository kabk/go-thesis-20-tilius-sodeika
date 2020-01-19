function returnToTopBtn() {
  let btn = document.querySelector('#return-btn');
  let lastScrollTop = pageYOffset || document.scrollTop;

  window.addEventListener(
    'scroll',
    function() {
      let st = window.pageYOffset || document.scrollTop;
      if (st > lastScrollTop) {
        btn.style.opacity = '1';
      } else {
        btn.style.opacity = '1';
        this.setTimeout(() => {
          btn.style.opacity = '1';
        }, 5000);
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    false
  );
}

var vheight = $(window).height()
var docHeight = $(document).height()
var progress = 0
var barHeight = 0
var bgN = 0
var images = []
var scrollCounter = 0
var scrollPos
var timer;
var zeros
var zerosI = "0000"

var fadeInTime = 200
var fadeOutTime = 200
var timeOutTime = 400
var tapBool = true


//IMAGE PRELOAD------------------------------------------
if (document.images) {
  for (var i = 0; i < 374; i++) {
    if(i<10){
      zerosI = "0000"
    }
    if(i < 100 && i > 9){
      zerosI = "000"
    }
    if(i > 99){
      zerosI = "00"
    }
    images[i] = new Image();
    images[i].src = 'img/rende_'+ zerosI + i + '.jpg';
    console.log('loading...')
  }
}

//scroll progression------------------------------------------
function updateBg(){
  $('#progress').css('height', barHeight)
  bgN = Math.floor(progress * 374)
  if(bgN<10){
    zeros = "0000"
  }
  if(bgN < 100 && bgN > 9){
    zeros = "000"
  }
  if(bgN > 99){
    zeros = "00"
  }
  $('#backgroundDiv').css('background-image', 'url("img/rende_'+ zeros + bgN + '.jpg")');
}

$(window).scroll(function() {
  scrollCounter = scrollCounter + 1
  scrollPos = $(document).scrollTop()
  progress = scrollPos / (docHeight - vheight)
  barHeight = progress * vheight
  updateBg()
  // if(scrollCounter == 1){scrollFadeIn()}
  // clearTimeout(timer)
  // timer = setTimeout(scrollFadeOut, timeOutTime)


});
