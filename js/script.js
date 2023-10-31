'use strict';   // Włącza tryb ścisły JavaScript, który pomaga w wyłapywaniu powszechnych błędów i "cichych" błędów, sprawiając, że JavaScript jest bardziej przewidywalny.

function titleClickHandler(event) { // Definiujemy funkcję titleClickHandler, która będzie wywoływana, gdy użytkownik kliknie na jeden z linków na stronie. event to obiekt zdarzenia, który zawiera informacje o tym zdarzeniu.
    event.preventDefault(); // Zapobiega domyślnej akcji przeglądarki. W tym przypadku, kliknięcie na link zwykle prowadziłoby do przejścia do nowej strony lub przewinięcia strony, ale ta linia zapobiega temu.
    const clickedElement = this;    // this w kontekście nasłuchiwacza zdarzeń odnosi się do elementu, który wywołał zdarzenie - w tym przypadku, do klikniętego linku. Przypisujemy go do stałej clickedElement dla łatwiejszego dostępu.
    console.log('Link was clicked!'); // Wypisuje informację w konsoli deweloperskiej, że link został kliknięty.

    /* [DONE] remove class 'active' from all article links  */
    // Znajduje wszystkie aktywne linki (linki z klasą 'active') i usuwa z nich klasę 'active'. Służy to "dezaktywacji" linków.
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    // Dodaje klasę 'active' do klikniętego linku i wyświetla w konsoli ten kliknięty element.
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE]remove class 'active' from all articles */
    // Znajduje wszystkie aktywne artykuły (artykuły z klasą 'active') i usuwa z nich klasę 'active'.
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    // Pobiera wartość atrybutu 'href' z klikniętego linku, co zazwyczaj jest selektorem CSS wskazującym na konkretny artykuł na stronie.
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article owiadającą wartości atrybutu 'href' klikniętego linku.using the selector (value of 'href' attribute) */
    // Znajduje na stronie artykuł, który ma id lub klasę odp
    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('targetArticle:', targetArticle);
}
// Znajduje wszystkie linki wewnątrz elementu z klasą 'titles'.
const links = document.querySelectorAll('.titles a');
// Dla każdego linku dodaje nasłuchiwacz zdarzeń, który wywoła funkcję titleClickHandler przy kliknięciu na link.
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}