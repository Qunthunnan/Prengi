# <span id="ua">Prengi</span>
Один з моїх проєктів "лендінг сторінки", який написаний на чистому JS без використання Jquery. Серед сторонніх бібліотек використовуються <a href = "https://splidejs.com/">Splidejs</a> - для побудови слайдерів, <a href = "https://intl-tel-input.com/">intl-tel-input</a> - для вибору регіону номера телефона, <a href = "https://github.com/catamphetamine/libphonenumber-js">libphonenumber-js</a> - для форматування та валідації номера телефону в залежності від регіону.

<a href = "#en">English version of the documentation</a>

- <a href = "#ua">Українська версія документації</a>
    - <a href = "#functionsUa">Функції</a>
    - <a href = "#eventListenersUa">Події та обробники</a>
    - <a href = "#slidersUa">Робота зі слайдерами</a>
- <a href = "#en">English version of the documentation</a>
    - <a href = "#functionsEn">Functions</a>
    - <a href = "#eventListenersEn">Events and event listeners</a>
    - <a href = "#slidersEn">Working with sliders</a>

## <span id = "functionsUa">Функції</span>
### `phoneSmallEditing`
Функція для вибору дозволених символів в рядку.

```javascript
function phoneSmallEditing(phone)
```

### `headerSmallPhoneAdaptation`
Функція для адаптації контенту у хедері для малих екранів.

```javascript
function headerSmallPhoneAdaptation(headerPhonesElements)
```

### `headerNormalPhoneAdaptation`
Функція для адаптації контенту у хедері для середніх екранів.
```javascript
function headerNormalPhoneAdaptation(headerPhonesElements, headerPhones)
```


### `formatPhoneNumber`
Функція для форматування введеного номера телефону.

```javascript
function formatPhoneNumber(phoneNumber)
```

### `modalOpen`
Функція для плавного відкриття модального вікна.

```javascript
function modalOpen(element, action)
```

### `modalClose`
Функція для плавного закриття модального вікна.

```javascript
function modalClose(element, action)
```

### `modalOpenClose`
Функція для відкриття або закриття модального вікна з плавним ефектом.

```javascript
function modalOpenClose(element, action)
```
### `modalSwitchDone`
Функція для перемикання між модальними вікнами.

```javascript
function modalSwitchDone(element)
```

### `modalSwitchToAnother`
Функція для прихованного перемикання між двома модальними вікнами.
```javascript
function modalSwitchToAnother(modalWindow) 
```
### `inputValidation`
Функція для валідації введених даних у формі.

```javascript
function inputValidation(input)
```

### `showErrors`
Функція для відображення повідомлень про помилки валідації.

```javascript
function showErrors(input, error)
```

### `deleteError`
Функція для видалення повідомлень про помилки валідації.

```javascript
function deleteError(input)
```


## <span id = "eventListenersUa">Події та обробники</span>
### Обробка введення номера телефону

```javascript
phoneInput.addEventListener('input', function (e) {
    let phoneNumber = phoneInput.value;
    let formattedNumber = formatPhoneNumber(phoneNumber);
    phoneInput.value = formattedNumber;
    inputValidation(e.target);
});
```
Цей обробник викликається кожен раз, коли користувач вводить номер телефону в модальному вікні. Використовується функція `formatPhoneNumber` для автоматичного форматування введеного номера телефону.

### Обробка введення імені

```javascript
nameInput.addEventListener('input', (e)=> {
    inputValidation(e.target);
});
```
Цей обробник викликається при введенні імені користувача. Застосовує функцію `inputValidation` для валідації введених даних.

### Обробка зміни стану чекбокса політики

```javascript
policyChbox.addEventListener('input', (e)=> {
    inputValidation(e.target);
});
```
Ця подія відбувається при зміні стану чекбокса політики конфіденційності. Викликає функцію inputValidation для валідації стану чекбокса.

### Обробка кліку по кнопці відправлення форми

```javascript
modalSubmitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const nameValidationResult = inputValidation(nameInput),
          phoneValidationResult = inputValidation(phoneInput),
          policyValidationResult = inputValidation(policyChbox);

    if(nameValidationResult && phoneValidationResult && policyValidationResult) {
        const userData = {
            userFirstName: nameInput.value,
            userPhone: libphonenumber.parsePhoneNumber(phoneInput.value).number
        }
    }
});
```

Цей обробник викликається при спробі відправити форму. Здійснює валідацію усіх полів форми та, у разі успішної валідації, обробляє дані форми.

### Обробка кліку по кнопці "Зареєструватися"

```javascript
singUpBtns.forEach((item)=>{
    item.addEventListener('click', () => {
        modalOpenClose(modal);
    });
});
```

Цей обробник викликає відкриття модального вікна при кліку на кнопку "Зареєструватися" на сторінці.

### Обробка кліку по кнопці закриття модального вікна

```javascript
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
```
Цей обробник викликає закриття модального вікна. Якщо відбувається спроба закрити вікно підтвердження реєстрації, спочатку викликається функція modalSwitchToAnother, а потім виконується закриття.

### Обробка кліку на overlay модального вікна

```javascript
modalOverlay.addEventListener('click', ()=> {
    modalOpenClose(modal);
})
```
Ця подія відбувається при кліку на overlay модального вікна та викликає його закриття.

### Обробка зміни розміру вікна (медіа-запити)

```javascript
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
```
Ці обробники відслідковують зміну розміру вікна та викликають відповідні функції адаптації телефонів в заголовку.

## <span id = "slidersUa">Робота зі слайдерами</span>
### Ініціалізація головного слайдера
```javascript
const mainSlider = new Splide('.splide[aria-label="mainSlider"]', {
    drag: true,
});
mainSlider.mount();
```
Цей код ініціалізує головний слайдер на сторінці та встановлює опцію, яка дозволяє "dragging" - переключення слайдів через перетаскування зображень.

### Ініціалізація слайдера секції "products"

```javascript
const productsSlider = new Splide('.splide[aria-label="productsSlider"]');
productsSlider.mount();
```
Цей код ініціалізує слайдер продуктів на сторінці.

### Визначення тексту кнопок пагінації у слайдера продуктів

```javascript
productsSlider.on('pagination:mounted', function (data) {
    data.list.classList.add('splide__pagination--custom');

    data.items.forEach(function (item) {
        item.button.textContent = productsButtons[item.page];
    });
});
```
Ця функція встановлює текст кнопок пагінації у слайдера продуктів відповідно до зазначених значень у масиві productsButtons.


# <span id = "en">Prengi</span>
One of my "landing page" projects written in pure JS without using jQuery. Among third-party libraries, I use <a href = "https://splidejs.com/">Splidejs</a> for building sliders, <a href = "https://intl-tel-input.com/">intl-tel-input</a> for selecting the phone number region, and <a href = "https://github.com/catamphetamine/libphonenumber-js">libphonenumber-js</a> for formatting and validating phone numbers based on the region.


## <span id = "functionsEn">Functions</span>
### `phoneSmallEditing`
Function to select allowed characters in a string.

```javascript
function phoneSmallEditing(phone)
```

### `headerSmallPhoneAdaptation`
Function to adapt content in the header for small screens.


```javascript
function headerSmallPhoneAdaptation(headerPhonesElements)
```

### `headerNormalPhoneAdaptation`
Function to adapt content in the header for medium screens.


```javascript
function headerNormalPhoneAdaptation(headerPhonesElements, headerPhones)
```


### `formatPhoneNumber`
Function to format the entered phone number.

```javascript
function formatPhoneNumber(phoneNumber)
```

### `modalOpen`
Function for smoothly opening a modal window.


```javascript
function modalOpen(element, action)
```

### `modalClose`
Function for smoothly closing a modal window.


```javascript
function modalClose(element, action)
```

### `modalOpenClose`
Function to open or close a modal window with a smooth effect.


```javascript
function modalOpenClose(element, action)
```
### `modalSwitchDone`
Function to switch between modal windows.


```javascript
function modalSwitchDone(element)
```

### `modalSwitchToAnother`
Function to hidden switch between two modal windows.
```javascript
function modalSwitchToAnother(modalWindow) 
```
### `inputValidation`
Function for validating entered data in the form.

```javascript
function inputValidation(input)
```

### `showErrors`
Function to display validation error messages.

```javascript
function showErrors(input, error)
```

### `deleteError`
Function to delete validation error messages.

```javascript
function deleteError(input)
```


## <span id = "eventListenersEn">Event Listeners</span>
### Handling phone number input

```javascript
phoneInput.addEventListener('input', function (e) {
    let phoneNumber = phoneInput.value;
    let formattedNumber = formatPhoneNumber(phoneNumber);
    phoneInput.value = formattedNumber;
    inputValidation(e.target);
});
```
This handler is triggered every time the user enters a phone number in the modal window. The `formatPhoneNumber` function is used for automatic formatting of the entered phone number.

### Handling name input

```javascript
nameInput.addEventListener('input', (e)=> {
    inputValidation(e.target);
});
```
This handler is triggered when the user enters their name. It applies the `inputValidation` function to validate the entered data.

### Handling the change of the privacy policy checkbox state

```javascript
policyChbox.addEventListener('input', (e)=> {
    inputValidation(e.target);
});
```
This event occurs when the state of the privacy policy checkbox changes. It calls the `inputValidation` function to validate the checkbox state.

### Handling the click on the form submission button

```javascript
modalSubmitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const nameValidationResult = inputValidation(nameInput),
          phoneValidationResult = inputValidation(phoneInput),
          policyValidationResult = inputValidation(policyChbox);

    if(nameValidationResult && phoneValidationResult && policyValidationResult) {
        const userData = {
            userFirstName: nameInput.value,
            userPhone: libphonenumber.parsePhoneNumber(phoneInput.value).number
        }
    }
});
```

This handler is triggered when attempting to submit the form. It validates all form fields, and upon successful validation, processes the form data.

### Handling the click on the "Sign Up" button

```javascript
singUpBtns.forEach((item)=>{
    item.addEventListener('click', () => {
        modalOpenClose(modal);
    });
});
```

This handler opens the modal window when clicking the "Sign Up" button on the page.

### Handling the click on the modal window close button

```javascript
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
```
This handler closes the modal window. If an attempt is made to close the registration confirmation window, the modalSwitchToAnother function is called first, and then the closure is executed.

### Handling the click on the modal window overlay

```javascript
modalOverlay.addEventListener('click', ()=> {
    modalOpenClose(modal);
})
```
This event occurs when clicking on the overlay of the modal window and triggers its closure.

### Handling the window size change (media queries)

```javascript
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
```
These handlers track changes in window size and call the corresponding adaptation functions for phones in the header.

## <span id = "slidersEn">Sliders</span>
### Initializing the main slider
```javascript
const mainSlider = new Splide('.splide[aria-label="mainSlider"]', {
    drag: true,
});
mainSlider.mount();
```
This code initializes the main slider on the page and sets an option that allows "dragging" - switching slides by dragging images.

### Initializing the products section slider

```javascript
const productsSlider = new Splide('.splide[aria-label="productsSlider"]');
productsSlider.mount();
```
This code initializes the product slider on the page.

### Defining the text of pagination buttons in the products slider

```javascript
productsSlider.on('pagination:mounted', function (data) {
    data.list.classList.add('splide__pagination--custom');

    data.items.forEach(function (item) {
        item.button.textContent = productsButtons[item.page];
    });
});
```
This function sets the text of pagination buttons in the product slider according to the specified values in the productsButtons array.
