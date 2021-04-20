const searchBtn = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");
const burgerBtn = document.querySelector(".header-burger");
const body = document.querySelector("body");
const footer = document.querySelector("footer");
const menu = document.querySelector('.mobile-menu');
const social = document.querySelector('.menu-social');
const aboutus = document.querySelector('.about-us');
const submenu = document.querySelector('.sub-menu');
const whatArrow = document.querySelectorAll('.what_answer_title');
const answer = document.querySelectorAll('.what_answer');
const answerArrow = document.querySelectorAll('.what_answer__arrow');

searchBtn.addEventListener('click', function showInput() {
	searchBtn.classList.toggle('search-button--active');
	searchInput.classList.toggle('search-input--active');
	searchInput.focus();
});

burgerBtn.addEventListener('click', function showMenu(){
	menu.classList.toggle('menu-active');
	social.classList.toggle('menu-active');
	burgerBtn.classList.toggle('burger-active');
	footer.classList.toggle('footer-none');
});


let arrow = document.querySelectorAll('.menu-link');
for(i=0; i<arrow.length; i++){
	let subMenu = arrow[i].nextElementSibling;
	let thisArrow = arrow[i];
	arrow[i].addEventListener('click', function(){
	subMenu.classList.toggle('open');
	thisArrow.classList.toggle('submenu-active');
});
}

for(j=0; j<answer.length; j++){
	let thisAnswer = answer[j];
	let thisAnswerArrow = answerArrow[j];
	thisAnswer.addEventListener('click', function(){
		thisAnswer.classList.toggle('closed');
		thisAnswerArrow.classList.toggle('rotate');
	});
}