///Function to run when document is ready
var fn = function() {
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
  Array.prototype.forEach.call(anchors, function(anchor, i) {
    anchor.addEventListener('click', function(event) {
      if(this.getAttribute('href').length > 1 && this.getAttribute('href') !== '/contact.html') {
        getContent(this, event);
      }
    }, false);
  });
};//End of ready function

///Functions
var parseHTML = function(str) {
  var tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = str;
  return tmp.body.children;
};
// parseHTML(htmlString);

///controls the open and close status of the flyouts
  function sidebarToggle(el, event) {
    event.preventDefault(el);
    console.log('flyout toggle trigger');
    if (el.classList) {
      el.classList.toggle('open');
      el.classList.toggle('closed');
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
  }
  function rotateArrow(el) {
    var arrow = el.querySelector('.fa');
    if (arrow.classList) {
      arrow.classList.toggle('fa-rotate-180');
    } else {
      var classes = arrow.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
  }
///Control promise/fetch calls for all content on page
function getContent(a, event) {
  event.preventDefault(a);

  var bodyCopy = document.getElementById('body-copy');
  var url = a.getAttribute('href');
  var request = new Request(url, {
    method: 'GET',
  	// mode: 'cors',
  	// redirect: 'follow',
  	headers: new Headers({
  		'Content-Type': 'json'
  	})
  });
  fetch(request)
    .then(function(responseObj){
      /* handle response */
      console.log('status: ', responseObj.status);

      return responseObj.json();
    }).then(function(text, responseObj) {
    	// <!DOCTYPE ....
    	bodyCopy.innerHTML=text;
      // return responseObj.json();
    // }).then(function(json) {
    //   window.history.pushState('object or string', json.title, url);
    //
    })
    .catch(function(err) {
      // Error :(
      console.log('error: ', err);
    });

}

///Wait for document to be ready
function ready(fn) {
  if (document.readyState != 'loading'){
    console.log('document no ready');
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
    console.log('yep still working');
  }
}

ready(fn);
