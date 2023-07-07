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

    const form = document.querySelector('.filters');

    form.addEventListener('click', function(event){
      event.preventDefault();
    });
  }

    
  render();
  initActions();
}