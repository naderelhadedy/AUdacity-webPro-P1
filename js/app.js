/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


//////////////////////////////////////////////////////////////////////////////////////



//creating the navigation menu dynamically//

//gathering list of all sections
const allSections = document.querySelectorAll('.section');

//temporary part to contain list items
const theList = document.createDocumentFragment();

//this function creates list items and append links to it
//then, it appends href to links with sections ids
//last, it appends a class to all links and appends the content of sections' data-nav
allSections.forEach(createNav);

function createNav(item,index) {
    let listContent = item.getAttribute("data-nav");
    let listElement = document.createElement("li");
    let listLink = document.createElement("a");
    listLink.setAttribute("href", "#section" + (index));
    listElement.setAttribute("class", "link");
    listElement.appendChild(listLink);
    listLink.textContent = listContent;
    theList.appendChild(listElement);
}

document.querySelector('#navbar__list').appendChild(theList);





//to measure the top and bottom of a section - but not used//
/*
 document.body.addEventListener("click", myFunction);
 function myFunction() {
    var div = document.getElementById("section2");
    var rect = div.getBoundingClientRect();
    var y = rect.top;
    var w = rect.bottom;
    alert ("Top: " + y + ", bottom: " + w);
  }
*/




//highlighting the active section while in viewport
window.addEventListener("scroll", highlightSection);

function highlightSection() {
    
    allSections.forEach(checkView);

    function checkView(item) {

        var specs = item.getBoundingClientRect();
        var top = specs.top;

        //the targeted dimensions of viewport
        if (top >= -150 && top <= 150) {

            //highlight section
            allSections.forEach(toggleActive);

            function toggleActive(item) {
                item.classList.remove('active-part');
                item.classList.remove('your-active-class');
            }

            item.classList.add('active-part');
            item.classList.add('your-active-class');

            //active section's content to be used in highlighting links
            var activeSecContent = item.getAttribute("data-nav");

            //highlight link
            const allLinks = document.querySelectorAll('.link');

            allLinks.forEach(checkLink);

            function checkLink(item) {
                
                //checking the active section
                if (item.firstChild.textContent == activeSecContent) {
                    allLinks.forEach(highlightLink);

                    function highlightLink(item) {
                        item.classList.remove('HighLink');
                    }

                    item.classList.add('HighLink');
                }
            }
        }
    }
}



//script for button of scroll
var mybutton = document.getElementById("hidBtn");

//onclick for to top button
window.onscroll = function() {scrollFunction()};

//check top value after scroll if it's near to top or not
function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//onclick for to top button with smooth scroll to top
function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}


//hide navigation menu if stopped scrolling after 3 seconds
//then, show it if scrolled and default show it on page load
var timer = null;
var totalList = document.getElementById("navbar__list");
window.addEventListener('scroll', function() {
    if(timer !== null) {
        clearTimeout(timer);
        totalList.style.display = "block";        
    }
    timer = setTimeout(function() {
      totalList.style.display = "none";
    }, 3000);
}, false);



//script for scroll to sections from links
const totalLinks = document.querySelectorAll('.link');

totalLinks.forEach(ScrollToSection);

function ScrollToSection(item) {

  item.addEventListener("click", function(event) {

    event.preventDefault();
    
    const theContent1 = item.textContent;
    const totalSections = document.querySelectorAll('.section');

    totalSections.forEach(doThis);

    function doThis(item) {

      const theContent2 = item.getAttribute("data-nav");
  
      if (theContent1 == theContent2) {
        item.scrollIntoView({behavior:"smooth"});
      }
    }

  });

}



//script for responsive menu bar
function showNav() {

  const respoList = document.getElementById("navbar__list");

  if (respoList.className === "navlist") {
    respoList.className += " responsive";
  } else {
    respoList.className = "navlist";
  }
}