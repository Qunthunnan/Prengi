function phoneSmallEditing(phone) {
	const availableChars = ['0','1','2','3','4','5','6','7','8','9','(',')','+'];
	if(typeof(phone) == 'string') {
		let result = '';
		nextC: for(let i = 0; i < phone.length; i++) {
					for(let k = 0; k < availableChars.length; k++) {
						if(phone[i] == availableChars[k]) {
							result+=phone[i];
							continue nextC;
						}
					}
	}
	return result
  } 
  return 'error';
}

function headerSmallPhoneAdaptation (headerPhonesElements) {
	headerPhonesElements.forEach(item => {
		item.innerText = phoneSmallEditing(item.innerText);
	});
}

function headerNormalPhoneAdaptation (headerPhonesElements, headerPhones) {
	headerPhonesElements.forEach((item, i) => {
		item.innerHTML = headerPhones[i];
	});
}

const headerPhonesElements = document.querySelectorAll('.header__country-text-tel'),
	  headerPhones = [];
headerPhonesElements.forEach((item, i) => {
	headerPhones[i] = item.innerText;
});
const smallDisplay = window.matchMedia('(max-width: 991px)'),
	  normalDisplay = window.matchMedia('(min-width: 992px)'),
	  mainSlider = new Splide( '.splide[aria-label="mainSlider"]', {
		drag: false
	  }),
	  mobileHeaderButton = document.querySelector('.header__mobile-button'),
	  sliderContainer = document.querySelector('.main__slider-container');
	  hammer = new Hammer(sliderContainer);

hammer.on('swiperight', function () {
	mainSlider.go('<');
});

hammer.on('swipeleft', function () {
    mainSlider.go('>');
});

smallDisplay.addEventListener('change', (e)=> {
	if (e.matches) {
		console.log('matchSmall!');
		headerSmallPhoneAdaptation(headerPhonesElements);
	}
});
normalDisplay.addEventListener('change', (e)=> {
	if (e.matches) {
		console.log('normalMatch!');
		headerNormalPhoneAdaptation(headerPhonesElements, headerPhones);
	}
});

mobileHeaderButton.addEventListener('click', ()=> {
	mobileHeaderButton.classList.toggle('header__mobile-button-menu-active')
	document.querySelector('.header').classList.toggle('header_menu-active');
});

if(smallDisplay.matches) {
	headerSmallPhoneAdaptation(headerPhonesElements);
}


// 
//      const productsSlider = new Splide('.splide[aria-label="productsSlider"]'),
//       productsButtons = ['Prengi Production', 'Prengi FMC', 'Prengi Mallz', 'Retail Prengi', 'Logistic Prengi', 'IT Prengi HR'];

mainSlider.mount();


// productsSlider.on( 'pagination:mounted', function ( data ) {
//     data.list.classList.add( 'splide__pagination--custom' );
  
//     data.items.forEach( function ( item) {
//       item.button.textContent = productsButtons[item.page];
//     } );
//   } );
  

// productsSlider.mount();
