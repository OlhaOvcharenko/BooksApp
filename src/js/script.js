{
  'use strict';
  const select = {
    templateOf: {
      booksList: '.books-list',
      booksItems: '#template-book',
    }
  };

  const template = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.booksItems).innerHTML),
  };

  function render() {

    const allBooks = dataSource.books;

    for(let bookId in allBooks ) {

      const book = allBooks[bookId];
      console.log('book', book);

      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      /* generate HTML based on template */
      const generatedHTML = template.templateBook(book);
        
      /* Create element using utils.createDOMFromHTML */
      const item  = utils.createDOMFromHTML(generatedHTML);
        
      /* Find list of books */
      const menuOfBooks = document.querySelector(select.templateOf.booksList);

      /* add element to menu */
      menuOfBooks.appendChild(item);
    }

  }

  const favoriteBooks = [];
  
  function initActions() {

    const booksList = document.querySelector('.books-list');
  
    booksList.addEventListener('dblclick', function(event) {
      const clickedElement = event.target;
     
      if (clickedElement.offsetParent.classList.contains('book__image')) {
        event.preventDefault();
      
        /* Get the book id from data-id attribute */
        const bookId = clickedElement.offsetParent.dataset.id;
      
        if (favoriteBooks.includes(bookId)) {
          /* Remove the book id from favoriteBooks array */
          const bookIndex = favoriteBooks.indexOf(bookId);
          if (bookIndex !== -1) {
            favoriteBooks.splice(bookIndex, 1);
          }
      
          /* Remove the 'favorite' class from the element */
          clickedElement.offsetParent.classList.remove('favorite');

        } else {
          /* Add 'favorite' class to the clicked element */
          clickedElement.offsetParent.classList.add('favorite');
      
          /* Add the book id to favoriteBooks array */
          favoriteBooks.push(bookId);
      
          /* Log the updated favoriteBooks array */
          console.log('favoriteBooks:', favoriteBooks);
        }
      }
    });

    form.addEventListener('click', function(event) {
      const clickedElement = event.target;
  
      if (
        clickedElement.tagName === 'INPUT' &&
        clickedElement.type === 'checkbox' &&
        clickedElement.name === 'filter'
      ) {
        console.log('Value of clicked checkbox:', clickedElement.value);
        if (clickedElement.checked) {
          filters.push(clickedElement.value);
        } else {
          const index = filters.indexOf(clickedElement.value);
          if (index !== -1) {
            filters.splice(index, 1);
          }
        }
        filtersBook();
      }
    });
  }

  const filters = [];

  const form = document.querySelector('.filters');

  function filtersBook(){

    for(const book of dataSource.books ) {

      let shouldBeHidden = false;

      for(const filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookFiltered = document.querySelector(`[data-id="${book.id}"]`);

      if (shouldBeHidden) {
        bookFiltered.classList.add('hidden');
      } else {
        bookFiltered.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){
    if (rating <= 6)
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    else if (rating > 6 && rating <= 8)
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    else if (rating > 8 && rating <= 9)
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    else if (rating > 9)
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
   
  render();
  initActions();
}