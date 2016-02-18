///Functions

///controls the open and close status of the flyouts
  function sidebarToggle(el, event) {
    'use strict';
    event.preventDefault(el);
    console.log('flyout toggle trigger');
    if (el.classList) {
      el.classList.toggle('open');
      el.classList.toggle('closed');
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
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'text/plain'
  	})
  });
  fetch(request)
    .then(function(responseObj){
      /* handle response */
      console.log('status: ', responseObj.status);
  if(responseObj.ok) {
      responseObj.text().then(function(text) {
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
  }, false);
  closeContact.addEventListener('click', function(event) {
    sidebarToggle(contactForm, event);
  }, false);
  //trigger for links to run fetch request
  Array.prototype.forEach.call(anchors, function(anchor) {
    anchor.addEventListener('click', function(event) {
      if(this.getAttribute('href').length > 1 && this.getAttribute('href') !== '/contact.html') {
        getContent(this, event);
      }
    }, false);
  });
};//End of ready function

///Wait for document to be ready
function ready(fn) {
  'use strict';
  if (document.readyState !== 'loading'){
    console.log('document no ready');
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
    console.log('yep still working');
  }
}

ready(fn);
