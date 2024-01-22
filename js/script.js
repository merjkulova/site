let wrapper = document.querySelector('.wrapper')



let pageSlider = new Swiper('.page',{
	wrapperClass: 'page__wrapper',
	slideClass: 'page__screen',
	//vertikalnyy slayder
	direction: 'vertical',
	//kol-vo slaydow dlya pokaza
	slidesPerView: 'auto',

	//wklyucaem parallax
	parallax: true,

	//uprawlenie s klawiaturoi
	keyboard:{
		//vklyucit ili vyklucit
		enabled:true,
		//vklyucit ili vyklucit
		//tolko kogda slayder v predelah viewporta
		onlyInViewport:true,
		//vklyucit ili vyklucit
		//upraw klavishami  pageUp pageDown
		pageUpDown:true,
	},
	//upraw kolesami myshi
	mousewheel:{
		//cuwstwitelnost kolesa myshi
		sensetivity:1,
		//klass obyekta na kotorom budet srabatywat 
		//prokrutka myshyu
		//eventsTarget: '.image__slider'
	},
	//otklyucenie funksionala 
	//yesli slaydow menshe cem nuzhno
	watchOverflow: true,

	// skorost 
	speed: 800,

	//obnowit swiper
	// при изменении элементов слайдера
	observer:true,
		//obnowit swiper
	// при изменении родительских элементов слайдера
	observeParents:true,
		//obnowit swiper
	// при изменении дочерних элементов
	observeSlideChildren: true,


// Навигация
// Буллеты текущее положение , прогрессбар
pagination: {
	el: '.page__pagination',
	type: 'bullets',
	clickable: true,
	bulletClass: 'page__bullet',
	bulletActiveClass: 'page__bullet_active',
},
//скролл
scrollbar:{
	el: '.page__scroll',
	dragClass: 'page__drag-scroll',
	//возможность перетаскивать скролл
	draggable: true	
},

//отключаем автоинициализацию
init: false,
//События 
on: {
	//Событие инициализации
	init: function () {
		menuSlider();
		setScrollType();
		wrapper.classList.add('_loaded');
	},
	// Событие смены слайда
	slideChange: function () {
		menuSliderRemove();
		menuLinks[pageSlider.realIndex].classList.add('_active')
	},
	resize: function(){
		setScrollType();
	}
},
});

let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider(){
	if(menuLinks.length > 0){
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for (let index = 0; index < menuLinks.length; index++){
			const menuLink = menuLinks[index];
			menuLink.addEventListener("click", function(e){
				menuSliderRemove();
				pageSlider.slideTo(index, 800);
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}
function menuSliderRemove(){
	let menuLinkActive= document.querySelector('.menu__link._active');
	if(menuLinkActive){
		menuLinkActive.classList.remove('_active');
	}
}

function setScrollType(){
	if(wrapper.classList.contains('._free')){
		wrapper.classList.remove('._free');
		pageSlider.params.freeMode = false;
	}

	for (let index = 0; index < pageSlider.slides.length; index++){
		const pageSlide = pageSlider.slides[index];
		pageSlideContent = pageSlide.querySelector('.screen__content');
		if (pageSlideContent){
			const pageSlideContentHeight = pageSlideContent.offsetHeight;
			if (pageSlideContentHeight > window.innerHeight){
				wrapper.classList.add('_free');
				pageSlider.params.freeMode = true;
				break;
			}
		}
	}
}

pageSlider.init();
