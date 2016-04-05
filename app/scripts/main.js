///Functions

///Check to match media queries with css file
function mediaqueryresponse(mql){
  'use strict';
  var mainMenu = document.getElementById('main-nav');
  var mainMenuToggle = document.getElementById('menu-toggle');
   if (mql.matches){ // if media query matches
    console.log('The condition ' + mql.media + ' has been met');
    mainMenu.classList.remove('open');
    mainMenu.classList.toggle('closed', 'open');
    rotateArrow(mainMenuToggle);
    // rotateArrow();
   }
   else{
    console.log('full screen mode enabled');
    mainMenu.classList.remove('closed');
    mainMenu.classList.toggle('open', 'closed');
    rotateArrow(mainMenuToggle);
   }
}
///set width to check for
var mql = window.matchMedia('screen and (max-width: 768px)');


///Animation functions to be reused
function fade(el, fadeType) {
  'use strict';
  if(fadeType === 'out') {
    el.style.opacity = 0;
  }
  else if (fadeType === 'in') {
    el.style.opacity = 100;
  }

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

///controls the open and close status of the flyouts
  function sidebarToggle(el, event) {
    'use strict';
    event.preventDefault(el);
    console.log('flyout toggle trigger');
    if (el.classList) {
      if(el.classList.length > 0) {
        el.classList.toggle('open');
        el.classList.toggle('closed');
      } else {
        if(el.classList.contains('open')) {
          el.classList.toggle('open', 'closed');
        } else {
          el.classList.toggle('closed');
        }
      }
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf('open');

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push('open');
      }

      el.className = classes.join(' ');
    }
  }
  function rotateArrow(el) {
    'use strict';
    var arrow = el.querySelector('.fa');
    if (arrow.classList) {
      arrow.classList.toggle('fa-rotate-180');
    } else {
      var classes = arrow.className.split(' ');
      var existingIndex = classes.indexOf('fa-rotate-180');

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push('fa-rotate-180');
      }
      el.className = classes.join(' ');
    }
  }
///Control promise/fetch calls for all content on page
function getContent(a, event) {
  'use strict';
  event.preventDefault(a);

  var bodyCopy = document.getElementById('body-copy');
  var url = a.getAttribute('href');
  var pageTitle = a.getAttribute('title');
  var request = new Request(url, {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    body: 'getIncludes=true',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  });
  fetch(request)
    .then(function(responseObj){
      /* handle response */
      console.log('status: ', responseObj.status);
  if(responseObj.ok) {
      responseObj.text().then(function(text) {
        fade(bodyCopy, 'out');
        bodyCopy.innerHTML = text;
        // console.log(text);
        window.history.pushState('object or string', pageTitle, url);
        document.title = pageTitle + ' - RWC';
    });
  } else {
    console.log('Network response was not ok.');
  }
    })
    .catch(function(err) {
      // Error :(
      console.log('error: ', err.message);
    });

}

function scrollToSpot(xs, ys, el) {
  'use strict';
  if(el) {
    var rect = el.getBoundingClientRect();
    ys = rect.top + document.body.scrollTop;
    xs = rect.left + document.body.scrollLeft;
  }
  window.scroll(xs, ys);
}

function makeActive(a) {
  'use strict';
  var className = 'active';
  var activeLink = a.parentNode;
  var mainMenu = document.getElementById('main-nav');
  var menuLinks = mainMenu.querySelectorAll('li');
  Array.prototype.forEach.call(menuLinks, function(menuLink) {
    if (menuLink.classList) {
      menuLink.classList.remove(className);
    }
    else {
      menuLink.className = menuLink.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  });
  if (activeLink.classList) {
    activeLink.classList.add(className);
  }
  else {
    activeLink.className += ' ' + className;
  }
}

///Contact form functions
function contactRyan(event) {
  'use strict';
event.preventDefault(this);

  var contactForm = document.getElementById('contact-me');
  var errors = document.querySelector('.error');
  if(errors) {
      errors.remove();
  }
  var name = contactForm.querySelector('[name="name"]');
    var nameVal = name.value;
  var honeyPot = contactForm.querySelector('.honeyPot').value;
  var email = contactForm.querySelector('[name="email"]');
    var emailVal = email.value;
  var emailTest = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  var reason = contactForm.querySelector('[name="reason"]').value;
  var securityCode = contactForm.querySelector('[name="securityCode"]').value;

  if (nameVal === '' || nameVal === ' ') {
      name.focus();
      name.classList.add('redBorder');
      return false;
  }
  if (emailVal === '' || emailVal === ' ') {
      email.focus();
      email.classList.add('redBorder');
      return false;
      }
  else if(emailVal !== '') {
    if(!emailTest.test(emailVal)) {
      email.focus();
      email.classList.add('redBorder');
      email.insertAdjacentHTML('beforebegin', '<i class="error smaller">Please enter a valid email address.</i>');
      return false;
      }
    }
  if (!honeyPot === '' || !honeyPot === ' ') {
    return false;
  }
  var redBorder = contactForm.querySelectorAll('input');
  if(redBorder != null){
    if(redBorder.length > 1) {
      for (var c = 0; c < redBorder.length; c++) {
        redBorder[c].classList.remove('redBorder');
      }
    } else {
      redBorder.classList.remove('redBorder');
    }
  }
  var posturl = 'includes/email.php';
  var newEmail = new Request( posturl, {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    body: 'name=' + nameVal + '&email=' + emailVal + '&reason=' + reason + '&securityCode=' + securityCode,
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  });
fetch(newEmail)
.then(function(responseObj){
    /* handle response */
    console.log('status: ', responseObj.status);
    if(responseObj.ok) {
      responseObj.text().then(function(text) {
        console.log(text);
        var contactP = document.getElementById('contact-form').querySelector('.message');
        fade(contactP, 'out');
        fade(contactForm, 'out');
        contactForm.parentNode.removeChild(contactForm);
        contactP.innerHTML = 'thank you human for contacting me, i will try to generate a non-automated response shortly.';
        setTimeout( function() {
          var contactParent = document.getElementById('contact-form');
          sidebarToggle(contactParent, event);
          document.getElementById('contact').classList.remove('active');
        }, 6000);
      });
    } else {
      console.log('Network response was not ok.');
    }
  })
  .catch(function(err) {
    // Error :(
    console.log('error: ', err.message);
  });
}

///Function to run when document is ready
var fn = function() {
  'use strict';
  console.log('fn started');
  ///Variables
  var mainMenu = document.getElementById('main-nav');
  var mainMenuToggle = document.getElementById('menu-toggle');
  var contactForm = document.getElementById('contact-form');
  var contactToggle = document.getElementById('contact');
  var closeContact = document.getElementById('closeForm');
  var anchors = document.querySelectorAll('a');
  var sendEmail = document.getElementById('submitEmail');


///Triggers
  mediaqueryresponse(mql); // call listener function explicitly at run time
  mql.addListener(mediaqueryresponse);

  mainMenuToggle.addEventListener('click', function(event) {
    sidebarToggle(mainMenu, event);
    rotateArrow(this);
  }, false);

  contactToggle.addEventListener('click', function(event) {
    sidebarToggle(contactForm, event);
    makeActive(this.querySelector('a'));
  }, false);
  closeContact.addEventListener('click', function(event) {
    sidebarToggle(contactForm, event);
    contactToggle.classList.remove('active');
  }, false);
  //trigger for links to run fetch request
  Array.prototype.forEach.call(anchors, function(anchor) {
    anchor.addEventListener('click', function(event) {
      if(this.getAttribute('href').length > 1 && this.getAttribute('href') !== '/contact.php' && this.getAttribute('target') !== '_blank' && !this.getAttribute('download')) {
        getContent(this, event);
        makeActive(this);
        scrollToSpot(0, 0);
      }
    }, false);
  });
  //Trigger to send email
  sendEmail.addEventListener('click', function(event) {
    contactRyan(event);
  });
};//End of ready function

///Wait for document to be ready
function ready(fa) {
  'use strict';
  if (document.readyState !== 'loading'){
    console.log('document no ready');
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fa);
    console.log('yep still working');
  }
}

ready(fn);
