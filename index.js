document.addEventListener('DOMContentLoaded', ready);
function ready() {
  playVideosOnPosition();
  returnToTopBtn();
}

function playVideosOnPosition() {
  let videos = document.querySelectorAll('iframe');
  let videosEmbedded = document.querySelectorAll('video');
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };
  let observer = new IntersectionObserver(turnVideosOn, options);

  videosEmbedded.forEach(video => {
    observer.observe(video);
  });
}

let turnVideosOn = (entries, observer) => {
  entries.forEach(entry => {
    let video = entry.target;

    if (entry.isIntersecting) {
      console.log('play');
      video.play();
      // if (video.src.includes('?')) {
      //   //TODO: add an alert or notification to enable Flash?! for Chrome to work,
      //   // Safari also needs to allow Autoplay.
      //   video.src += '&autoplay=1';
      // } else {
      //   video.src += '?&autoplay=1';
      // }
    } else {
      console.log('stop');
      video.pause();
      // video.src = video.src.replace('&autoplay=1', '');
    }
  });
};

function returnToTopBtn() {
  let btn = document.querySelector('#return-btn');
  let lastScrollTop = pageYOffset || document.scrollTop;

  window.addEventListener(
    'scroll',
    function() {
      let st = window.pageYOffset || document.scrollTop;
      if (st > lastScrollTop) {
        btn.style.opacity = '0';
      } else {
        btn.style.opacity = '1';
        this.setTimeout(() => {
          btn.style.opacity = '0';
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
function scrollFadeOut(){
  console.log("fadeout")
  scrollCounter = 0
  $('#backgroundDiv').animate({opacity: 0.2}, fadeOutTime)
  $('.text').animate({opacity: 1}, fadeOutTime)

}
function scrollFadeIn(){
    $("#backgroundDiv").finish();
    $(".text").finish();
    $('#backgroundDiv').animate({opacity: 1}, fadeInTime)
    $('.text').animate({opacity: 0.1}, fadeInTime)
}
function updateBg(){
  $('#progress').css('height', barHeight)
  bgN = Math.floor(progress * 432)
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
