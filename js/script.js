'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {
  console.log('generateTitleLinks', generateTitleLinks);

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    let articleId = article.getAttribute('id');
    console.log('articleId:', articleId);

    /* find the title element */
    /* get the title from the title element */
    let articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle', articleTitle)

    /* create HTML of the link */
    let linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log('html', html)
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
console.log('links', links)

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
  link.style.color = 'green';
}

}

generateTitleLinks(); // Tutaj wywołujemy funkcję, aby faktycznie wykonać zawarty w niej kod.