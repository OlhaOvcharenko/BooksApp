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

    render();
   
}