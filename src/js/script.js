const mainSlider = new Splide( '.splide[aria-label="mainSlider"]' ),
      productsSlider = new Splide('.splide[aria-label="productsSlider"]'),
      productsButtons = ['Prengi Production', 'Prengi FMC', 'Prengi Mallz', 'Retail Prengi', 'Logistic Prengi', 'IT Prengi HR'];


mainSlider.mount();

productsSlider.on( 'pagination:mounted', function ( data ) {
    // You can add your class to the UL element
    data.list.classList.add( 'splide__pagination--custom' );
  
    // `items` contains all dot items
    data.items.forEach( function ( item) {
      item.button.textContent = productsButtons[item.page];
    } );
  } );
  

productsSlider.mount();