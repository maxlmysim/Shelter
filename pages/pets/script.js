import pets from '../../script/our-pets.js';

const burger = document.querySelector('.burger');
const page = document.querySelector('.page');
page.style.height = document.documentElement.clientHeight + 'px';

burger.addEventListener('click', function () {
    burger.classList.toggle('burger_open');
    document.querySelector('.nav-menu').classList.toggle('nav-menu_open');
    page.classList.toggle('page-shadow');
    let navigation = document.querySelector('.nav-menu');
    navigation.addEventListener('click', function (event) {
        if (event.target.classList.contains('paragraph-mobile-menu')) {
            burger.classList.remove('burger_open');
            document.querySelector('.nav-menu').classList.remove('nav-menu_open');
            page.classList.remove('page-shadow');
        }
    });
    page.addEventListener('click', function (event) {
        if (event.target.classList.contains('page-shadow')) {
            burger.classList.remove('burger_open');
            document.querySelector('.nav-menu').classList.remove('nav-menu_open');
            page.classList.remove('page-shadow');
        }
    });
});
//
// function createPetCard(obj) {
//     let petsCard = document.createElement('div'),
//         modalWindow = document.createElement('div'),
//         petImg = document.createElement('img'),
//         name = document.createElement('h4'),
//         name2 = document.createElement('h3'),
//         button = document.createElement('button'),
//         description = document.createElement('p'),
//         breed = document.createElement('p'),
//         list = document.createElement('ul'),
//         age = document.createElement('li'),
//         inoculations = document.createElement('li'),
//         diseases = document.createElement('li'),
//         parasites = document.createElement('li');
//
//     petImg.className = 'pets-card__photo';
//     petImg.src = obj.img;
//     petImg.alt = obj.name;
//     name.className = 'pets-card__name';
//     name.textContent = obj.name;
//     button.className = 'button';
//     button.textContent = 'Learn More';
//     button.classList.add('button_transparent');
//     petsCard.className = 'pets-card';
//     petsCard.append(petImg, name, button);
//
//     description.className = 'pets-card__description';
//     description.textContent = obj.description;
//     breed.className = 'pets-card__breed';
//     breed.textContent = `${obj.type} - ${obj.breed}`;
//     age.innerHTML = `<b>Age:</b> ${obj.age}`;
//     let [...inoculationsList] = obj.inoculations;
//     inoculations.innerHTML = `<b>Inoculations:</b> ${inoculationsList}`;
//     let [...diseasesList] = obj.diseases;
//     diseases.innerHTML = `<b>Diseases:</b> ${diseasesList}`;
//     let [...parasitesList] = obj.parasites;
//     parasites.innerHTML = `<b>Parasites:</b> ${parasitesList}`;
//
//     list.append(age, inoculations, diseases, parasites);
//
//     name2.className = 'pets-card__name';
//     name2.textContent = obj.name;
//
//     modalWindow.append(name2, breed, description, list);
//     modalWindow.className = 'modal-window';
//     modalWindow.style.display = 'none';
//
//     petsCard.append(modalWindow);
//
//     return petsCard;
// }
//
// let petsCards = document.querySelector('.pets-cards');
//
// // pets.forEach(pet => {
// //     petsCards.append(createPetCard(pet));
// // });
//
//
// let arrowLeft = document.querySelector('.arrow-left'),
//     arrowRight = document.querySelector('.arrow-right');
//
// // arrowLeft.addEventListener('click', function (){
// //     petsCards.scrollLeft += 360;
// //     console.log(1321);
// // })
// //
// // arrowRight.addEventListener('click', function (){
// //     petsCards.scrollLeft -= 360;
// })