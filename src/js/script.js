{
  'use strict';
  const select = {
  
    templateOf:{
      booksTemplate: '#template-book',
    },

    listOf: {
      books: '.books-list',
    }

  };

  class BooksList {
  
    constructor(){

      const thisBooksList = this;
      console.log(thisBooksList);

      this.filters = [];
      this.favoriteBooks = [];
    
      this.initData();
      this.render();
      this.getElements();
      this.initActions();
  
    }

    initData(){
      this.data = dataSource.books;
    }

    render() {
      const template = {
        templateBook: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
      };

      for (const book of this.data) {
        book.ratingBgc = this.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
  
        const generatedHTML = template.templateBook(book);
        const itemHTML = utils.createDOMFromHTML(generatedHTML);
  
        const menuOfBooks = document.querySelector(select.listOf.books);
        menuOfBooks.appendChild(itemHTML);
      }
    }

    getElements(){
      this.dom = {};
      this.dom.booksList = document.querySelector(select.listOf.books);
      this.dom.form = document.querySelector('.filters');
    }

    initActions() {

      this.dom.booksList.addEventListener('dblclick', (event) => {
        const clickedElement = event.target;
      
        if (clickedElement.offsetParent.classList.contains('book__image')) {
          event.preventDefault();
        
          /* Get the book id from data-id attribute */
          const bookId = clickedElement.offsetParent.dataset.id;
        
          if (this.favoriteBooks.includes(bookId)) {
            /* Remove the book id from favoriteBooks array */
            const bookIndex = this.favoriteBooks.indexOf(bookId);
            if (bookIndex !== -1) {
              this.favoriteBooks.splice(bookIndex, 1);
            }
        
            /* Remove the 'favorite' class from the element */
            clickedElement.offsetParent.classList.remove('favorite');

          } else {
            /* Add 'favorite' class to the clicked element */
            clickedElement.offsetParent.classList.add('favorite');
        
            /* Add the book id to favoriteBooks array */
            this.favoriteBooks.push(bookId);
        
            /* Log the updated favoriteBooks array */
            console.log('favoriteBooks:', this.favoriteBooks);
          }
        }
      });

      this.dom.form.addEventListener('click', (event) => {
        const clickedElement = event.target;
    
        if (
          clickedElement.tagName === 'INPUT' &&
          clickedElement.type === 'checkbox' &&
          clickedElement.name === 'filter'
        ) {
          console.log('Value of clicked checkbox:', clickedElement.value);
          if (clickedElement.checked) {
            this.filters.push(clickedElement.value);
          } else {
            const index = this.filters.indexOf(clickedElement.value);
            if (index !== -1) {
              this.filters.splice(index, 1);
            }
          }
          this.filtersBook();
        }
      });
    }

    filtersBook(){

      for(const book of this.data ) {

        let shouldBeHidden = false;

        for(const filter of this.filters) {
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

    determineRatingBgc(rating){
      if (rating <= 6)
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      else if (rating > 6 && rating <= 8)
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      else if (rating > 8 && rating <= 9)
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      else if (rating > 9)
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }

  const app = new BooksList();
  console.log(app);
}