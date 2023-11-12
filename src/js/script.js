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

function formatPhoneNumber(phoneNumber) {
	try {
		const parsedNumber = libphonenumber.parsePhoneNumber(iti.getNumber());
		const formattedNumber = parsedNumber.formatInternational();
		return formattedNumber;
	} catch (error) {
		return phoneNumber.replace(/[^0-9+() -]/, '');
	}
}

let closeInId,
	openInId;

function modalOpen(element) {
	let opacity = +window.getComputedStyle(element).opacity;
	let display = window.getComputedStyle(element).display;
	if(opacity >= 1) {
		element.style.opacity = 1;
		clearInterval(openInId);
		openInId = null;
		return undefined;
	}
	opacity += 0.03;
	element.style.opacity = opacity;
}

function modalClose(element) {
	let opacity = +window.getComputedStyle(element).opacity;
	let display = window.getComputedStyle(element).display;
	if(opacity <= 0 ) {	
		element.style.display = 'none';
		element.style.opacity = 0;
		clearInterval(closeInId);
		closeInId = null;
		return undefined;
	}
	opacity -= 0.03;	
	element.style.opacity = opacity;
}

function modalOpenClose(element) {
	let opacity = +window.getComputedStyle(element).opacity;
	let display = window.getComputedStyle(element).display;
	if(display == 'none') {
		element.style.display = 'block';
		if(!openInId) {
			openInId = setInterval(modalOpen, 10, element);
		}
		
	} else {
		if(!closeInId) {
			closeInId = setInterval(modalClose, 10, element);
		}
	}
}
function modalSwitchDone(element) {
	modalOpenClose(element.querySelector('.modal__window'));
	modalOpenClose(element.querySelector('.modal__window-done'));
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
	  hammer = new Hammer(sliderContainer),
	  productsSlider = new Splide('.splide[aria-label="productsSlider"]'),
      productsButtons = ['Prengi Production', 'Prengi FMC', 'Prengi Mallz', 'Retail Prengi', 'Logistic Prengi', 'IT Prengi HR'],
	  modal = document.querySelector('.modal'),
	  modalOverlay = document.querySelector('.modal__overlay'),
	  singUpBtns = document.querySelectorAll('.button_singUp'),
	  modalCloseBtn = modal.querySelector('.modal__window-close'),
	  nameInput = modal.querySelector('.modal__form-name input');
	  phoneInput = document.querySelector('.modal__form-phone input'),
	  modalSubmitBtn = document.querySelector('.modal__form-submit'),
	  policyChbox = modal.querySelector('.modal__form-policy input');

	  let iti = window.intlTelInput(phoneInput, {
		utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js',
		initialCountry: 'auto',
	});

	function inputValidation(input) {
		if(input.name == 'name') {
			const formatName = /^[\s]*[^\!\@\#\$\%\^\&\*\=\+\~\`\{\}\[\]\\\|\'\"\;\:\/\?\.\>\,\<]*$/;
			const minNameLength = 2;
			const maxNameLength = 255;
			if(input.value.length >= minNameLength) {
				if(input.value.length <= maxNameLength) {
					if(formatName.test(input.value)) {
						deleteError(input);
						return true;
					} else {
						showErrors(input, 'Спеціальні символи, які можна використати: ( ) - _');
						return false;
					}
				} else {
					showErrors(input, 'Максимальна довжина імені: 255');
					return false;
				}
			} else {
				showErrors(input, 'Мінімальна довжина імені: 2');
				return false;
			}
		}

		if(input.name == 'phone') {
			if(libphonenumber.parsePhoneNumber(input.value).isValid()) {
				debugger;
				deleteError(input);
				return true;
			}
			debugger;
			showErrors(input, 'Перевірте, чи правильно написан номер телефону');
			return false;
		}

		if(input.name == 'policy') {
			if(input.checked) {
				deleteError(input);
				return true
			} else {
				showErrors(input, 'Потрібна ваша згода');
			}
		}
	}

	function showErrors(input, error) {
		if(!!input.parentNode.querySelector('.modal__form-error') == false) {
			const errorElement = document.createElement('label');
			errorElement.htmlFor = input.id;
			errorElement.className = 'modal__form-error';
			errorElement.innerText = error;
			input.parentNode.append(errorElement);
		} else {
			if(input.parentNode.querySelector('.modal__form-error').innerText == error) {
			} else {
				deleteError(input);
				const errorElement = document.createElement('label');
				errorElement.htmlFor = input.id;
				errorElement.className = 'modal__form-error';
				errorElement.innerText = error;
				input.parentNode.append(errorElement);
			}
		}

		// nameInput = modal.querySelector('.modal__form-name input');
		// nameInput.addEventListener('input', (e)=> {
		// 	inputValidation(e.target);
		// });
		// console.dir(input.parentNode);

		//якщо не існує
			//записуємо нову
		//|
			//така сама? 
				//нічого не робим
			//| стираємо стару, запиуємо нову
	}

	function deleteError(input) {
		if(!!input.parentNode.querySelector('.modal__form-error')) {
			input.parentNode.querySelector('.modal__form-error').remove();
		}
	}

	phoneInput.addEventListener('input', function (e) {
		let phoneNumber = phoneInput.value;
		if(libphonenumber.validatePhoneNumberLength(phoneNumber) != 'TOO_LONG') {
			let formattedNumber = formatPhoneNumber(phoneNumber);
			phoneInput.value = formattedNumber;
		} else {
			phoneInput.value = phoneNumber.slice(0, -1);
		}
		inputValidation(e.target);
	});

	nameInput.addEventListener('input', (e)=> {
		inputValidation(e.target);
	});

	policyChbox.addEventListener('input', (e)=> {
		inputValidation(e.target);
	});

	modalSubmitBtn.addEventListener('click', (e)=>{
		debugger;
		e.preventDefault();
		const nameValidationResult = inputValidation(nameInput),
			 phoneValidationResult = inputValidation(phoneInput),
			 policyValidationResult = inputValidation(policyChbox);

		if(nameValidationResult && phoneValidationResult && policyValidationResult) {
			const userData = {
				userFirstName: nameInput.value,
				userPhone: libphonenumber.parsePhoneNumber(phoneInput.value).number
			}
			console.dir(userData);
			modalSwitchDone(modal);
		} else {
			console.log('No validation((');
		}
	});


singUpBtns.forEach((i)=>{
	i.addEventListener('click', () => {
		modalOpenClose(modal);
	});
});

modalCloseBtn.addEventListener('click', ()=> {
	modalOpenClose(modal);
});

modalOverlay.addEventListener('click', ()=> {
	modalOpenClose(modal);
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
