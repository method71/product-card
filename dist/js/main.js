// Вкладки продуктов
let changeProductsTabs = () => {
    let tabs = document.querySelectorAll('#productTabs .tabs__item');

    for(let i = 0; i < tabs.length; i++) tabs[i].addEventListener('click', change);

    function change() {
        let tab = this;
        let products = document.querySelectorAll('.product');
        let product = document.querySelector(`.product[data-id="${tab.getAttribute('data-product-id')}"]`);

        for(let i = 0; i < tabs.length; i++) tabs[i].classList.remove('tabs__item--current');
        for(let i = 0; i < products.length; i++) products[i].classList.add('product--hidden');

        tab.classList.add('tabs__item--current');
        product.classList.remove('product--hidden');
    }
}
changeProductsTabs();


// Добавление характеристик
let addProductParam = () => {
    let forms = document.querySelectorAll('.product__form');

    for(let i = 0; i < forms.length; i++) forms[i].addEventListener('submit', add);

    function add() {
        event.preventDefault();

        let form = this;
        let input = form.querySelector('input');
        let features = document.querySelector(`.product__features[data-id="${form.getAttribute('data-list')}"]`);
        
        if (input.value.trim().length == 0) {
            form.querySelector('input').value = '';
        } else {
            let feature = document.createElement('li');
            feature.textContent = input.value;
            features.append(feature);
            input.value = '';
        }
    }
}
addProductParam();


// Раскрывание продукта
let toggleProduct = () => {
    let headers = document.querySelectorAll('.product__header');

    for(let i = 0; i < headers.length; i++) headers[i].addEventListener('click', change);

    function change() {
        let header = this;
        let product = this.parentElement;
        let products = document.querySelectorAll('.product');

        for(let i = 0; i < products.length; i++) {
            products[i].classList.add('product--hidden');
            products[i].querySelector('.product__header').classList.remove('product__header--active');
        }

        product.classList.remove('product--hidden');
        header.classList.add('product__header--active');
    }
}
toggleProduct();