// "use strict";

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

// function modalOpenClose(element) {
// 	// debugger;
// 	console.dir(element);
// 	console.dir(getComputedStyle(element));
// 	let elementStyles = getComputedStyle(element);
// 	console.dir(elementStyles);
// 	if(elementStyles.opacity == '0') {
// 		element.style.display = 'block';
// 		setInterval(()=> {
// 			if(element.style.opacity >= 1) {
// 				clearInterval();
// 				return;
// 			}
// 			element.style.opacity += 0.01;
// 		}, 10);
// 	} else {
// 		setInterval(()=>{
// 			if(element.style.opacity <= 0 ) {
// 				element.style.display = 'none';
// 				clearInterval();
// 				return;
// 			}
// 			element.style.opacity -= 0.01;
// 		},10);
// 	}
// }

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
	  hammer = new Hammer(sliderContainer),
	  productsSlider = new Splide('.splide[aria-label="productsSlider"]'),
      productsButtons = ['Prengi Production', 'Prengi FMC', 'Prengi Mallz', 'Retail Prengi', 'Logistic Prengi', 'IT Prengi HR'],
	  modal = document.querySelector('.modal'),
	  modalOverlay = document.querySelector('.modal__overlay'),
	  singUpBtns = document.querySelectorAll('.button_singUp'),
	  modalCloseBtn = modal.querySelector('.modal__window-close'),
	  phoneInput = document.querySelector('.modal__form-phone input');

	  const countryData = window.intlTelInputGlobals.getCountryData();


	  let iti = window.intlTelInput(phoneInput, {
		utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js',
		initialCountry: 'auto',
	});

	phoneInput.addEventListener('input', function () {
		debugger;
		let phoneNumber = phoneInput.value;
		if(libphonenumber.validatePhoneNumberLength(phoneNumber) == 'TOO_LONG') {
			phoneInput.value = phoneNumber.slice(0, -1);
		} else {
			let formattedNumber = formatPhoneNumber(phoneNumber);
			phoneInput.value = formattedNumber;
		}
	});
	
	

	function formatPhoneNumber(phoneNumber) {
		try {
			const parsedNumber = libphonenumber.parsePhoneNumber(iti.getNumber());
	
			const formattedNumber = parsedNumber.formatInternational();
	
			return formattedNumber;
		} catch (error) {
			console.error(error);
			return phoneNumber.replace(/[^0-9+() -]/, '');
		}
	}
	


singUpBtns.forEach((i)=>{
	i.addEventListener('click', () => {
		// modalOpenClose(modal);
		modal.classList.toggle('modal_active');
	});
});

modalCloseBtn.addEventListener('click', ()=> {
	// modalOpenClose(modal);
	modal.classList.remove('modal_active');
});

modalOverlay.addEventListener('click', ()=> {
	// modalOpenClose(modal);
	modal.classList.remove('modal_active');
})

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

mainSlider.mount();

productsSlider.on( 'pagination:mounted', function ( data ) {
    data.list.classList.add( 'splide__pagination--custom' );
  
    data.items.forEach( function ( item) {
      item.button.textContent = productsButtons[item.page];
    } );
  } );
  
productsSlider.mount();
