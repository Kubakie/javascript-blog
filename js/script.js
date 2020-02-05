'use strict';
function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    /*[DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}
// II część modułu (tags) settings:
const optArticleSelector = '.post',

      optTagsListSelector = '.tags.list',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
      optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
    optArticleTagsSelector = '.post-tags .list';
function generateTitleLinks(customSelector ='') {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    let html = '';
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        /* get the article id */
        console.log(articleId);
        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* get the title from the title element */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(articleId);
        console.log(articleTitle);
        /* create HTML of the link */
        html = html + linkHTML;
        /* insert link into titleList */
    }
    titleList.innerHTML = html;
    console.log(titleList, html);
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
    console.log(links);
}
generateTitleLinks();

/* Functions generating tags cloud */
function calculateTagsParams(tags) {
    const params = { 'max': 0, 'min': 999999};
//    [START LOOP]
   for(let tag in tags){
       console.log(tag + ' is used ' + tags[tag] + ' times');
       params.max = Math.max(tags[tag], params.max);
       params.min = Math.min(tags[tag], params.min);
   }
    return params;
}
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const tagClass = optCloudClassPrefix + classNumber;
  return tagClass;
}
function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
        console.log(article);
        /* find tags wrapper */
        const tagsList = article.querySelector(optArticleTagsSelector);
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        console.log('articleTags');
        console.log(articleTags);
        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray);

        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {
            /* generate HTML of the link */
            console.log(tag);
            /* add generated code to html variable */
            const linkHTML = '<li class="tag-inside-article "><a href="#tag-' + tag + '"> ' + tag + ' ' + ' </a></li>';
            html = html + linkHTML;
            console.log(linkHTML);
            /* [NEW] check if this link is NOT already in allTags */
            if(!allTags.hasOwnProperty(tag) ){
        /* [NEW] add generated code to allTags array */
                allTags[tag]= 1;
            
            /* END LOOP: for each tag */
            }
            else{
                allTags[tag]++;
            
            }
        }
        /* insert HTML of all the links into the tags wrapper */
        tagsList.innerHTML = html;
        console.log(tagsList, html);
        /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams)

 /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
/* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
   const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + '</li>';
console.log('tagLinkHTML:', tagLinkHTML);
    const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParam) + '</li>';
console.log('tagLinkHTML:', tagLinkHTML);

        const linkhtml = '<li><a href="#tag-' + tag + '">' + tag +  '(' + allTags[tag] +')' + '</a></li>'
allTagsHTML += tagLinkHTML;
        
         /* [NEW] END LOOP: for each tag in allTags */
    }
     /* [NEW] END LOOP: for each tag in allTags: */
      /* [NEW] add html from allTagsHTML to tagList */
    console.log(allTagsHTML);
    tagList.innerHTML = allTagsHTML;
}
generateTags();
function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const articleTag = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let tag of articleTag) {
        /* remove class active */
        tag.classList.remove('active');
        console.log(tag.classList);
        /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagswithhref = document.querySelectorAll('a[href^="'+ href+'"]');
    console.log('tagswithhrref:',tagswithhref)
    /* START LOOP: for each found tag link */
    for(let tagwithhref of tagswithhref){
    /* add class active */
        tagwithhref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]')
}
function addClickListenersToTags() {
    /* find all links to tags */
    const tags = document.querySelectorAll('a[href^="#tag-"]');
    console.log(tags);
    /* START LOOP: for each link */
    for (let tag of tags) {
        /* add tagClickHandler as event listener for that link */
        tag.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
}
addClickListenersToTags();