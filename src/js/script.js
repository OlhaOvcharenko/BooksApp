{
    'use strict';
    const select = {
        templateOf: {
            booksList: '.books-list',
            booksItems: '#template-book',
        }
    }

    const template = {
        templateBook: Handlebars.compile(document.querySelector(select.templateOf.booksItems).innerHTML),
    }

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

    function initActions(){

        const images = document.querySelectorAll('.book__image');

        for(const image of images){
        
            image.addEventListener('dblclick', function(event){
            event.preventDefault();

            /* Get the book id from data-id attribute */
            const bookId = image.dataset.id;

            if(favoriteBooks.includes(bookId)){

                const bookIndex = favoriteBooks.indexOf(bookId);
                
                if (bookIndex !== -1) {
                  favoriteBooks.splice(bookIndex, 1);
                }

                /* Remove the 'favorite' class from the element */
                image.classList.remove('favorite');

            } else {

                /* Add 'favorite' class to the clicked element */
                image.classList.add('favorite');

                /* Add the book id to favoriteBooks array */
                favoriteBooks.push(bookId);

                /* Log the updated favoriteBooks array */
                console.log('favoriteBooks:', favoriteBooks);

                }
            });
        }
    }

    render();
    initActions();

   
}