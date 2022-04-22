import listPets from '../../script/our-pets.js';

const burger = document.querySelector('.burger');
const page = document.querySelector('.page');
page.style.height = document.documentElement.clientHeight + 'px';

burger.addEventListener('click', function () {
    document.querySelector("body").classList.toggle('no-scroll');
    burger.classList.toggle('burger_open');
    document.querySelector('.nav-menu').classList.toggle('nav-menu_open');
    page.classList.toggle('page-shadow');
    let navigation = document.querySelector('.nav-menu');
    navigation.addEventListener('click', function (event) {
        if (event.target.classList.contains('paragraph-mobile-menu')) {
            burger.classList.remove('burger_open');
            document.querySelector('.nav-menu').classList.remove('nav-menu_open');
            page.classList.remove('page-shadow');
            document.querySelector("body").classList.remove('no-scroll');

        }
    });
    page.addEventListener('click', function (event) {
        if (event.target.classList.contains('page-shadow')) {
            document.querySelector("body").classList.remove('no-scroll');
            burger.classList.remove('burger_open');
            document.querySelector('.nav-menu').classList.remove('nav-menu_open');
            page.classList.remove('page-shadow');
        }
    });
});

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
    inoculations.className = 'h5-modal-window'
    let [...diseasesList] = obj.diseases;
    diseases.innerHTML = `<b>Diseases:</b> ${diseasesList.join(', ')}`;
    diseases.className = 'h5-modal-window'
    let [...parasitesList] = obj.parasites;
    parasites.innerHTML = `<b>Parasites:</b> ${parasitesList.join(', ')}`;
    parasites.className = 'h5-modal-window'

    list.append(age, inoculations, diseases, parasites);
    list.className = 'pets-card__extra-description'

    name2.className = 'pets-card__name';
    name2.textContent = obj.name;

    let wrapper = document.createElement('div');
    let modalContent = document.createElement('div');
    modalContent.className = 'modal-window__content'
    wrapper.className = 'modal-window__wrapper';
    petImg2.className = 'pets-card__photo';
    petImg2.src = obj.img;
    petImg2.alt = obj.name;
    modalContent.append(name2, breed, description, list)
    wrapper.append(petImg2, modalContent)
    buttonCloseModal.className = 'btn-close-window'
    modalWindow.append(wrapper, buttonCloseModal);
    modalWindow.className = 'modal-window';
    modalWindow.classList.add('hidden');

    petsCard.append(modalWindow);
    petsCard.dataset.id = id;

    return petsCard;
}

function randomCard(start) {
    let checkList = [];
    let newList = [];

    if (!start) {
        for (let i = 0; i < 3; i++) {
            checkList.push(+itemActive.children[i].dataset.id);
        }
    }

    while (newList.length < 3) {
        let number = Math.floor(Math.random() * listPets.length);

        if (!checkList.includes(number) && !newList.includes(number)) {
            newList.push(number);
        }
    }
    return newList;
}

let slider = document.querySelector('.slider'),
    petsCards = slider.querySelector('.pets-cards'),
    arrowLeft = slider.querySelector('.arrow-left'),
    arrowRight = slider.querySelector('.arrow-right'),
    itemLeft = slider.querySelector('#item-left'),
    itemRight = slider.querySelector('#item-right'),
    itemActive = slider.querySelector('#item-active'),
    carousel = slider.querySelector('#carousel'),
    moveLeft = () => {
        carousel.classList.add('transition-left');
        arrowLeft.removeEventListener('click', moveLeft);
        arrowRight.removeEventListener('click', moveRight);
    },
    moveRight = () => {
        carousel.classList.add('transition-right');
        arrowRight.removeEventListener('click', moveRight);
        arrowLeft.removeEventListener('click', moveLeft);
    };

function createListCard(item, boolean) {
    randomCard(boolean).forEach(pet => {
        item.append(createPetCard(listPets[pet], pet));
    });
};

(function () {
    createListCard(itemActive, true);
    createListCard(itemLeft);
    createListCard(itemRight);
})();

arrowLeft.addEventListener('click', moveLeft);
arrowRight.addEventListener('click', moveRight);

carousel.addEventListener('animationend', function (animationEvent) {
    if (animationEvent.animationName === 'move-left-1card' ||
        animationEvent.animationName === 'move-left-2card' ||
        animationEvent.animationName === 'move-left-3card') {
        itemRight.innerHTML = itemActive.innerHTML;
        itemActive.innerHTML = itemLeft.innerHTML;
        itemLeft.innerHTML = '';
        createListCard(itemLeft);
        arrowLeft.addEventListener('click', moveLeft);
        arrowRight.addEventListener('click', moveRight);
        carousel.classList.remove('transition-left');
    } else {
        itemLeft.innerHTML = itemActive.innerHTML;
        itemActive.innerHTML = itemRight.innerHTML;
        itemRight.innerHTML = '';
        createListCard(itemRight);
        arrowLeft.addEventListener('click', moveLeft);
        arrowRight.addEventListener('click', moveRight);
        carousel.classList.remove('transition-right');
    }
});

carousel.addEventListener('click', function (event) {
    let card = event.target.closest('.pets-card');
    let btnClose = card.querySelector('.btn-close-window')
    if (card) {
        card.children[3].classList.remove('hidden');
        page.classList.add('page-shadow');
        document.querySelector("body").classList.add('no-scroll');
        let close = (event) => {
            if (event.target.classList.contains('page-shadow') ||
                event.target.classList.contains('btn-close-window')) {
                document.querySelector("body").classList.remove('no-scroll');
                page.classList.remove('page-shadow');
                card.children[3].classList.add('hidden');
                page.removeEventListener('click', close)
                btnClose.removeEventListener('click', close)
            }
        }
        page.addEventListener('click', close);
        btnClose.addEventListener('click', close);
    }
});



