const navToggle = document.querySelector('.navIcon');
const linkContainer = document.querySelector('.linksContainer');

///////////////////////////
//START OF DYNAMIC NAVBAR//
//////////////////////////

//Dynamic NavBar Toggling without hard coding navBar expanded Height based on elements added.
//New total height will be calculated as I add more elements to navBar

const linksList = document.querySelector('.linksList');

navToggle.addEventListener('click', function () {
  const linksHeight = linksList.getBoundingClientRect().height;
  if (linkContainer.style.height < `${linksHeight}px`) {
    linkContainer.style.height = `${linksHeight}px`;
  } else {
    linkContainer.style.height = '0px';
  }
});

//code to function as "Media Query" and going back to auto if screen resizes

window.addEventListener('resize', function () {
  if (window.innerWidth >= 768) {
    linkContainer.style.height = ''; //Leave here empty to cancel HTML code overriding CSS. When screen goes big  CSS dictates style ||| John solves this by applying a !Importante on CSS property height="Auto"
  }
});
/////////////////////////
//END OF DYNAMIC NAVBAR//
////////////////////////

//////////////////////////
//START OF NAVBAR FOLLOW//
/////////////////////////

const navBar = document.querySelector('.navBar');
const siteTitle = document.querySelector('.siteTitle');
const links = document.querySelectorAll('.scrollLink');

window.addEventListener('scroll', function () {
  const navBarHeight = navBar.getBoundingClientRect().height;

  if (window.scrollY > navBarHeight) {
    navBar.classList.add('navBar-fixed');
    siteTitle.classList.add('siteTitle-fixed');
    links.forEach(function (link) {
      link.classList.add('link-fixed');
    });
  } else {
    navBar.classList.remove('navBar-fixed');
    siteTitle.classList.remove('siteTitle-fixed');
    links.forEach(function (link) {
      link.classList.remove('link-fixed');
    });
  }
});

/*Add siteTitle-fixed as class to the main Title to avoid title moving around once navBar becomes "FIXED"*/

/////////////////////////////////////////////////////////////////////
//START OF SMOOTH SCROLL CORRECT BEHAVIOR - SCROLLING TO EXACT AREA//
/////////////////////////////////////////////////////////////////////

links.forEach(function (item) {
  item.addEventListener('click', function (e) {
    //prevent default scroll
    e.preventDefault();
    //navigate to specific spot on doc
    const id = e.currentTarget.getAttribute('href').slice(1); //to skip the # we slice at 1
    const element = document.getElementById(id);
    //calculate the heights
    const navHeight = navBar.getBoundingClientRect().height;
    let position = element.offsetTop - navHeight; //will give position on document of selected element || I substract navBar Height so that when I scroll navBar wont cover area
    console.log(position);
    window.scrollTo({
      left: 0,
      top: position,
    });
    linkContainer.style.height = ''; //after everyclick we want to close our navBar and scroll. Leave it empty so that CSS rules on big screen
  });
});
/////////////////////////////////////////////////////////////////////
//END OF SMOOTH SCROLL CORRECT BEHAVIOR - SCROLLING TO EXACT AREA//
/////////////////////////////////////////////////////////////////////
//

/////////////////////////////////////////////////////////////////////
//COUNTDOWN TIMER LOGIC//////////////////////////////////////////77//
/////////////////////////////////////////////////////////////////////
//

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
//const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// months are ZERO index based!!!!!!;
const futureDate = new Date(2023, 1, 11, 17, 30, 0);

// let futureDate = new Date(2020, 3, 24, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
//giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

const futureTime = futureDate.getTime();
function getRemaindingTime() {
  const today = new Date().getTime();

  const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}
// countdown;
let countdown = setInterval(getRemaindingTime, 1000);
//set initial values
getRemaindingTime();

/////////////////////////////////////////////////////////////////////
//END OF COUNTDOWN TIMER LOGIC///////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//
