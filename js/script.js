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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors';

function generateTitleLinks(customSelector = '') {
  console.log('generateTitleLinks', generateTitleLinks);

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('Selected articles:', articles);

  let html = '';

  for (let article of articles) {

    /* get the article id */
    let articleId = article.getAttribute('id');
    console.log('articleId:', articleId);

    /* find the title element */
    /* get the title from the title element */
    let articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle', articleTitle);

    /* create HTML of the link */
    let linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log('html', html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('links', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
    link.style.color = 'green';
  }

}

generateTitleLinks(); // Tutaj wywołujemy funkcję, aby wykonać zawarty w niej kod.


function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: Number.MAX_SAFE_INTEGER, // użycie wbudowanej stałej dla bezpiecznego maksymalnego integera
  };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

function calculateTagClass(count, params) {
  // Znormalizuj liczbę wystąpień tagu
  const normalizedCount = (count - params.min) / (params.max - params.min);
  console.log('Normalized count for ' + count + ' is: ' + normalizedCount);

  // Oblicz klasę dla tagu
  const classNumber = Math.floor(normalizedCount * (optCloudClassCount - 1) + 1);
  console.log('Class number for ' + count + ' is: ' + classNumber);

  // Zwróć nazwę klasy
  const className = optCloudClassPrefix + classNumber;
  console.log('Class name for ' + count + ' is: ' + className);

  return className;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log('tagWrapper:', tagWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log('linkHTML', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html', html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  }
  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] calculate parameters for tags */
  const tagsParams = calculateTagsParams(allTags);  // przekształcenie listy tagów w chmurę
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOP: for each tag in allTags: */
  for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li class="' + calculateTagClass(allTags[tag], tagsParams) + '"><a href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);

    allTagsHTML += tagLinkHTML;
  }
  /* END LOOP: fot each tag in allTags */

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);
}

generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('Extracted tag from href:', tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove('active');
    console.log('Removed active class from:', activeTagLink);
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);  //Znajdź wszystkie linki na stronie, które prowadzą dokładnie tam, gdzie prowadzi link, na który właśnie kliknąłem, i zapisz je na liście w zmiennej tagLinks.
  console.log(tagLinks);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add('active');
    console.log('Added active class from:', tagLink);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks);
}


function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    console.log('Event listener added to:', tagLink);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();


function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles:', articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorsSelector);
    console.log('authorWrapper:', authorWrapper);

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log('author:', author);

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + author.replace(/\s+/g, '-').toLowerCase() + '">' + author + '</a>';
    console.log('linkHTML', linkHTML);

    /* insert HTML of the link into the author wrapper */
    authorWrapper.innerHTML = linkHTML;

    /* [NEW] check if this author is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(author)) {

      /* [NEW] add author to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

  /* END LOOP: for every article: */

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  if (authorList) {

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each author in allAuthors: */
    for (let author in allAuthors) {

      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML = '<li><a href="#author-' + author.replace(/\s+/g, '-').toLowerCase() + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
      allAuthorsHTML += authorLinkHTML;
    }
    /* END LOOP: for each author in allAuthors */

    /* [NEW] add html from allAuthors to authorList */
    authorList.innerHTML = allAuthorsHTML;
  }
}

generateAuthors();


function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "authorName" and extract author name from the "href" constant */
  const authorName = href.replace('#author-', '').replace(/-/g, ' ');
  console.log('Extracted author from href:', authorName);

  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */
    activeAuthorLink.classList.remove('active');
    console.log('Removed active class from:', activeAuthorLink);
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);  //Znajdź wszystkie linki na stronie, które prowadzą dokładnie tam, gdzie prowadzi link, na który właśnie kliknąłem, i zapisz je na liście w zmiennej tagLinks.
  console.log(authorLinks);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {

    /* add class active */
    authorLink.classList.add('active');
    console.log('Added active class to:', authorLink);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author ="' + authorName + '"]');
  console.log('Title links generated for author:', authorName);
}


function addClickListenersToAuthors() {
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {

    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    console.log('Event listener added to:', authorLink);
  }
  /* END LOOP: for each link */
}

addClickListenersToAuthors();
