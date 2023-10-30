'use strict';

function titleClickHandler(event) {
    console.log('Link was clicked!'); // Wyświetla tekst w konsoli
    console.log(event); // Wyświetla obiekt event w konsoli

    /* remove class 'active' from all article links  */

    /* add class 'active' to the clicked link */

    /* remove class 'active' from all articles */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}