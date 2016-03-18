///Functions

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


///Triggers
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
      if(this.getAttribute('href').length > 1 && this.getAttribute('href') !== '/contact.php' && this.getAttribute('target') !== '_blank') {
        getContent(this, event);
        makeActive(this);
      }
    }, false);
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
