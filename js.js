// smooth window load
function loadPage() {
  loadingTime = setTimeout(showPage, 400);
}
function showPage() {
  $(".loader").fadeOut();
}

// open hidden nav menu
function open_menu() {
  $(".menu-button").hide();
  $(".menu-button_close").show();
  $(".menu-button_close").addClass('animate_rightToLeft');
  $(".nav_menu").fadeIn();
}
// close hidden nav menu
function close_menu() {
  $(".menu-button").show();
  $(".menu-button_close").hide();
  $(".nav_menu").fadeOut();
}

$(document).ready(function () {
  // smooth scroll
  $("a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });
  // animate labels
  $('.pure-form input').on('focusin', function () {
    $(this).parent().find('label').addClass('active-input');
  });

  //to top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn('slow');
      $('.home-menu').addClass('fixed-top');
    } else {
      $('#back-to-top').fadeOut('slow');
      $('.home-menu').removeClass('fixed-top');
    }
  });

  $('.pure-form input').on('focusout', function () {
    if (!this.value) {
      $(this).parent().find('label').removeClass('active-input');
    }
  });

  // scrollspy bullets
  $('body').scrollspy({ target: '#bullets' });

  // modal
  $('#modal').on('shown.bs.modal', function () {
    $(this).trigger('focus')
  });

  // accordion
  var swiperScroll = null;
  var cuantoScroll = 0;
  $(".myAccordion").each(function () {
    $(this).find(">div").css("display", "none");
    $(this).find(">h3").click(function () {
        if ($(this).next().css("display") == "block") {
            $(this).parent().find(">div").slideUp();
            $(this).parent().find(">h3").removeClass("open");
        } else {
            $(this).parent().find(">div").slideUp();
            $(this).parent().find(">h3").removeClass("open");
            $(this).next().slideDown();
            $(this).addClass("open");
            if (swiperScroll != null) {
                cuantoScroll = $(this);
                setTimeout(function () {
                    swiperScroll.update();
                    swiperScroll.setTransition(400);
                    swiperScroll.setTranslate((cuantoScroll.offset().top - $(".swiper-wrapper").offset().top) * -1);

                    $(window).resize();
                }, 600);
            }
        }
        if (swiperScroll != null) {
            swiperScroll.update();
        }

    });
  });

  // file browser
  bsCustomFileInput.init();

});

// header scroll
function navigationScroll() {
  var navElement = document.querySelector('.header');
  var navHeight = navElement.clientHeight;
  var reference = document.querySelector('#services');

  function checkPosition() {
    var positionY = reference.getBoundingClientRect().bottom;
    if (positionY - navHeight < 0) {
      navElement.classList.add('header_up');
    } else {
      navElement.classList.remove('header_up');
    }
  }
  window.addEventListener('scroll', checkPosition);
}
navigationScroll();

// animations on scroll
var scroll = window.requestAnimationFrame ||
  // IE Fallback
  function (callback) { window.setTimeout(callback, 1000 / 60) };
var elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {
  elementsToShow.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  });

  scroll(loop);
}
loop();

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

// client side form validation
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();