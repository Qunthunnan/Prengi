"use strict";
import Splide from '@splidejs/splide';
import intlTelInput from 'intl-tel-input';
import parsePhoneNumber from 'libphonenumber-js'

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
		const parsedNumber = parsePhoneNumber(iti.getNumber());
		const formattedNumber = parsedNumber.formatInternational();
		return formattedNumber;
	} catch (error) {
		return phoneNumber.replace(/[^0-9+() -]/, '');
	}
}

function modalOpen(element, action) {
	let opacity = +window.getComputedStyle(element).opacity;
	if(opacity >= 1) {
		element.style.opacity = 1;
		clearInterval(openInId);
		openInId = null;
		if(action != undefined) {
			action();
		}
		return undefined;
	}
	opacity += 0.03;
	element.style.opacity = opacity;
}

function modalClose(element, action) {
	let opacity = +window.getComputedStyle(element).opacity;
	if(opacity <= 0 ) {	
		element.style.display = 'none';
		element.style.opacity = 0;
		clearInterval(closeInId);
		closeInId = null;
		if(action != undefined) {
			action();
		}
		return undefined;
	}
	opacity -= 0.03;	
	element.style.opacity = opacity;
}

function modalOpenClose(element, action) {
	let display = window.getComputedStyle(element).display;
	if(display == 'none') {
		element.style.display = 'block';
		if(!openInId) {
			if(action != undefined) {
				openInId = setInterval(modalOpen, 10, element, action);
			} else {
				openInId = setInterval(modalOpen, 10, element);
			}
		}
		
	} else {
		if(!closeInId) {
			if(action != undefined) {
				closeInId = setInterval(modalClose, 10, element, action);
			} else {
				closeInId = setInterval(modalClose, 10, element);
			}
		}
	}
}
function modalSwitchDone(element) {
	modalOpenClose(element.querySelector('.modal__window'));
	modalOpenClose(element.querySelector('.modal__window-done'));
}

function modalSwitchToAnother(modalWindow) {
	if(modalWindow.className == 'modal__window modal__window-done') {
		const anoterWindow = modalWindow.parentNode.querySelector('.modal__window');
		modalWindow.style.display = 'none';
		modalWindow.style.opacity = 0;
		anoterWindow.style.display = 'block';
		anoterWindow.style.opacity = 1;
	} else {
		const anoterWindow = modalWindow.parentNode.querySelector('modal__window modal__window-done');
		modalWindow.style.display = 'none';
		modalWindow.style.opacity = 0;
		anoterWindow.style.display = 'block';
		anoterWindow.style.opacity = 1;
	}
}

function inputValidation(input) {
	if(input.name === 'name') {
		const formatName = /^[\s]*[^\!\@\#\$\%\^\&\*\=\+\~\`\{\}\[\]\\\|\'\"\;\:\/\?\.\>\,\<]*$/;
		const minNameLength = 2;
		const maxNameLength = 255;
		if(input.value.length >= minNameLength) {
			if(input.value.length <= maxNameLength) {
				if(formatName.test(input.value)) {
					deleteError(input);
					return true;
				} else {
					showErrors(input, 'Спеціальні символи, які можна використати:\n ( ) - _');
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

	if(input.name === 'phone') {
		try {
			if(parsePhoneNumber(input.value).isValid()) {
				deleteError(input);
				return true;
			} else {
				showErrors(input, 'Перевірте, чи правильно написали номер телефону');
				return false;
			}
		} catch (error) {
			showErrors(input, 'Перевірте, чи правильно написали номер телефону');
			return false;
			}
		}

	if(input.name === 'policy') {
		if(input.checked) {
			deleteError(input);
			return true
		} else {
			showErrors(input, 'Потрібна ваша згода');
		}
	}
	return false;
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
}

function deleteError(input) {
	if(!!input.parentNode.querySelector('.modal__form-error')) {
		input.parentNode.querySelector('.modal__form-error').remove();
	}
}

const headerPhonesElements = document.querySelectorAll('.header__country-text-tel'),
	  headerPhones = [];
headerPhonesElements.forEach((item, i) => {
	headerPhones[i] = item.innerText;
});
const smallDisplay = window.matchMedia('(max-width: 991px)'),
	  normalDisplay = window.matchMedia('(min-width: 992px)'),
	  mainSlider = new Splide( '.splide[aria-label="mainSlider"]', {
		drag: true,
		useIndex: true,
		height: 700,
		cover: true,
	  }),
	  mobileHeaderButton = document.querySelector('.header__mobile-button'),
	  sliderContainer = document.querySelector('.main__slider-container'),
	  productsSlider = new Splide('.splide[aria-label="productsSlider"]'),
      productsButtons = ['Prengi Production', 'Prengi FMC', 'Prengi Mallz', 'Retail Prengi', 'Logistic Prengi', 'IT Prengi HR'],
	  modal = document.querySelector('.modal'),
	  modalOverlay = document.querySelector('.modal__overlay'),
	  singUpBtns = document.querySelectorAll('.button_singUp'),
	  modalCloseBtn = modal.querySelectorAll('.modal__window-close'),
	  nameInput = modal.querySelector('.modal__form-name input'),
	  phoneInput = document.querySelector('.modal__form-phone input'),
	  modalSubmitBtn = document.querySelector('.modal__form-submit'),
	  policyChbox = modal.querySelector('.modal__form-policy input');

let iti = intlTelInput(phoneInput, {
		utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js',
		initialCountry: 'auto',
		excludeCountries: ['ru', 'kp', 'ir', 'sy'],
	}),
	users = [],
	closeInId,
	openInId;


phoneInput.addEventListener('input', function (e) {
	let phoneNumber = phoneInput.value;
	if(phoneNumber.length === 1 && !iti.getSelectedCountryData().iso2) {
		if(phoneNumber !== '+') {
			phoneNumber = `+${phoneInput.value}`;
		}
	}
	let formattedNumber = formatPhoneNumber(phoneNumber);
	phoneInput.value = formattedNumber;
	inputValidation(e.target);
});

nameInput.addEventListener('input', (e)=> {
	inputValidation(e.target);
});

policyChbox.addEventListener('input', (e)=> {
	inputValidation(e.target);
});

modalSubmitBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	const nameValidationResult = inputValidation(nameInput),
			phoneValidationResult = inputValidation(phoneInput),
			policyValidationResult = inputValidation(policyChbox);

	if(nameValidationResult && phoneValidationResult && policyValidationResult) {
		const userData = {
			userFirstName: nameInput.value,
			userPhone: parsePhoneNumber(phoneInput.value).number
		}

		users.push(userData);
		console.dir(users);
		modalSwitchDone(modal);
		document.querySelector('.modal__form').reset();
	}
});


singUpBtns.forEach((item)=>{
	item.addEventListener('click', () => {
		modalOpenClose(modal);
	});
});

modalCloseBtn.forEach((item)=>{
	item.addEventListener('click', (e)=> {
		if(e.target.parentNode.className == 'modal__window modal__window-done') {
			modalOpenClose(modal, ()=>{
				modalSwitchToAnother(e.target.parentNode);
			});
			
		} else {
			modalOpenClose(modal);
		}
	});
});

modalOverlay.addEventListener('click', ()=> {
	modalOpenClose(modal);
})

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
