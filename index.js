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


// Footnote thing

$( function()
{
    var targets = $( '[rel~=reference]' ),
        target  = false,
        reference = false,
        notetitle = false;

    targets.bind( 'mouseenter', function()
    {
        target  = $( this );
        tip     = target.attr( 'title' );
        reference = $( '<div id="tooltip"></div>' );

        if( !tip || tip == '' )
            return false;

        target.removeAttr( 'title' );
        reference.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );

        var init_reference = function()
        {
            if( $( window ).width() < reference.outerWidth() * 1.5 )
                reference.css( 'max-width', $( window ).width() / 2 );
            else
                reference.css( 'max-width', 340 );

            var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                pos_top  = target.offset().top - reference.outerHeight() - 20;

            if( pos_left < 0 )
            {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                reference.addClass( 'left' );
            }
            else
                reference.removeClass( 'left' );

            if( pos_left + reference.outerWidth() > $( window ).width() )
            {
                pos_left = target.offset().left - reference.outerWidth() + target.outerWidth() / 2 + 20;
                reference.addClass( 'right' );
            }
            else
                reference.removeClass( 'right' );

            if( pos_top < 0 )
            {
                var pos_top  = target.offset().top + target.outerHeight();
                reference.addClass( 'top' );
            }
            else
                reference.removeClass( 'top' );

            reference.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: 1 }, 50 );
        };

        init_reference();
        $( window ).resize( init_reference );

        var remove_reference = function()
        {
            reference.animate( { top: '-=10', opacity: 0 }, 50, function()
            {
                $( this ).remove();
            });

            target.attr( 'notetitle', tip );
        };

        target.bind( 'mouseleave', remove_reference );
        reference.bind( 'click', remove_reference );
    });
});
