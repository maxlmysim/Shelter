import pets from '../../script/our-pets.js';

const burger = document.querySelector('.burger')

burger.addEventListener('click', function(){
    burger.classList.toggle('burger_open')
    document.querySelector('.nav-menu').classList.toggle('nav-menu_open')

    let navigation =  document.querySelector('.nav-menu')
    navigation.addEventListener('click', function(event){
        if(event.target.classList.contains('paragraph-mobile-menu')) {
            burger.classList.remove('burger_open')
            document.querySelector('.nav-menu').classList.remove('nav-menu_open')
        }
    })
})

