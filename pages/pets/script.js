import listPets from '../../script/our-pets.js';

const burger = document.querySelector('.burger');
const shadow = document.querySelector('.shadow');
let screenWidth = window.innerWidth;
const petsContainer= document.querySelector('.pets-container');

burger.addEventListener('click', function () {
    document.querySelector("body").classList.toggle('no-scroll');
    burger.classList.toggle('burger_open');
    document.querySelector('.nav-menu-tablet').classList.toggle('nav-menu_open');
    shadow.classList.toggle('hidden');
    let navigation = document.querySelector('.nav-menu-tablet');
    navigation.addEventListener('click', function (event) {
        if (event.target.classList.contains('paragraph-mobile-menu')) {
            burger.classList.remove('burger_open');
            document.querySelector('.nav-menu-tablet').classList.remove('nav-menu_open');
            shadow.classList.add('hidden');
            document.querySelector("body").classList.remove('no-scroll');

        }
    });
    shadow.addEventListener('click', function (event) {
        if (event.target.classList.contains('shadow')) {
            document.querySelector("body").classList.remove('no-scroll');
            burger.classList.remove('burger_open');
            document.querySelector('.nav-menu-tablet').classList.remove('nav-menu_open');
            shadow.classList.add('hidden');
        }
    });
});

let closeModalWindow = (event) => {
    let card = document.querySelector('.pets-card_active');
    let btnClose = card.querySelector('.btn-close-window');
    console.log(card.children[3]);
    if (event.target.classList.contains('shadow') ||
        event.target.classList.contains('btn-close-window')) {
        card.classList.remove('pets-card_active');
        document.querySelector("body").classList.remove('no-scroll');
        shadow.classList.add('hidden');
        card.children[3].classList.add('hidden');
        shadow.removeEventListener('click', closeModalWindow);
        btnClose.removeEventListener('click', closeModalWindow);
        setTimeout(function () {
            carousel.addEventListener('click', openModalWindow);
        }, 0);
    }
};

let openModalWindow = (event) => {
    let card = event.target.closest('.pets-card');
    let btnClose = card.querySelector('.btn-close-window');
    if (card) {
        card.classList.add('pets-card_active');
        card.children[3].classList.remove('hidden');
        shadow.classList.remove('hidden');
        document.querySelector("body").classList.add('no-scroll');
        carousel.removeEventListener('click', openModalWindow);
        shadow.addEventListener('click', closeModalWindow);
        btnClose.addEventListener('click', closeModalWindow);
        btnClose.classList.remove('hover');
    }
};

function createPetCard(obj, id) {
    let petsCard = document.createElement('div'),
        modalWindow = document.createElement('div'),
        petImg = document.createElement('img'),
        petImg2 = document.createElement('img'),
        name = document.createElement('h4'),
        name2 = document.createElement('h3'),
        button = document.createElement('button'),
        description = document.createElement('h5'),
        breed = document.createElement('h4'),
        list = document.createElement('ul'),
        age = document.createElement('li'),
        inoculations = document.createElement('li'),
        diseases = document.createElement('li'),
        parasites = document.createElement('li'),
        buttonCloseModal = document.createElement('div');

    petImg.className = 'pets-card__photo';
    petImg.src = obj.img;
    petImg.alt = obj.name;
    name.className = 'pets-card__name';
    name.textContent = obj.name;
    button.className = 'button';
    button.textContent = 'Learn More';
    button.classList.add('button_transparent');
    petsCard.className = 'pets-card';
    petsCard.append(petImg, name, button);

    description.className = 'pets-card__description';
    description.textContent = obj.description;
    breed.className = 'pets-card__breed';
    breed.textContent = `${obj.type} - ${obj.breed}`;
    age.innerHTML = `<b>Age:</b> ${obj.age}`;
    age.className = 'h5-modal-window';
    let [...inoculationsList] = obj.inoculations;
    inoculations.innerHTML = `<b>Inoculations:</b> ${inoculationsList.join(', ')}`;
    inoculations.className = 'h5-modal-window';
    let [...diseasesList] = obj.diseases;
    diseases.innerHTML = `<b>Diseases:</b> ${diseasesList.join(', ')}`;
    diseases.className = 'h5-modal-window';
    let [...parasitesList] = obj.parasites;
    parasites.innerHTML = `<b>Parasites:</b> ${parasitesList.join(', ')}`;
    parasites.className = 'h5-modal-window';

    list.append(age, inoculations, diseases, parasites);
    list.className = 'pets-card__extra-description';

    name2.className = 'pets-card__name';
    name2.textContent = obj.name;

    let wrapper = document.createElement('div');
    let modalContent = document.createElement('div');
    modalContent.className = 'modal-window__content';
    wrapper.className = 'modal-window__wrapper';
    petImg2.className = 'pets-card__photo';
    petImg2.src = obj.img;
    petImg2.alt = obj.name;
    modalContent.append(name2, breed, description, list);
    wrapper.append(petImg2, modalContent, buttonCloseModal);
    buttonCloseModal.className = 'btn-close-window';
    modalWindow.append(wrapper);
    modalWindow.className = 'modal-window';
    modalWindow.classList.add('hidden');

    petsCard.append(modalWindow);
    petsCard.dataset.id = id;

    return petsCard;
}


function random(length) {
    let newList = [];

    while (newList.length < length) {
        let number = Math.floor(Math.random() * listPets.length);

        if (!newList.slice(-6).includes(number)) {
            newList.push(number);
        }
    }
    return newList;
}

function createListPage(pageQuantity, list) {
    let pages = document.createElement('div')
    pages.className = 'pets-cards'
    for (let i = 1; i <= pageQuantity; i++) {
        let page = document.createElement('div');
        page.className = 'pets-card__page'
        page.dataset.page = i;
        let listPetsNum = list.splice(-8, 8);
        listPetsNum = listPetsNum.map(num => createPetCard(listPets[num], num));
        page.append(...listPetsNum);
        pages.append(page)
    }
    return pages;
}


let listPage = random(64);
petsContainer.append(createListPage(8, listPage))

let slider = document.querySelector('.slider'),
    petsCards = slider.querySelector('.pets-cards'),
    carousel = slider.querySelector('#carousel')

carousel.addEventListener('click', openModalWindow);



