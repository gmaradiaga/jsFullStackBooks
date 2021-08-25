import BookService from './services/BookService';
const bookService = new BookService();
import { format } from 'timeago.js';

class UI {
  async renderBooks() {
    const books = await bookService.getBooks();
    const bookCardsContainer = document.getElementById('books-cards');
    bookCardsContainer.innerHTML = '';
    books.forEach((book) => {
      const div = document.createElement('div');
      div.className = '';
      div.innerHTML = `
          <div class="card m-2">
            <div class="row">
            <div class="col-md-4">
              <img src="${book.imgPath}" class="img-fluid" alt="" />
            </div>
            <div class="col-md-8">
              <div class="card-block px-2">
                <h4 class="card-title">${book.title}</h4>
                <p class="card-text">${book.author}</p>
                <p class="card-text">${book.isbn}</p>
                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
              </div>
            </div>
            </div>
            <div class="card-footer">
              ${format(book.created_at)}
            </div>
          </div>
      `;
      bookCardsContainer.appendChild(div);
    });
  }

  async addNewBook(book) {
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }

  async deleteBook(id) {
    await bookService.deleteBook(id);
    this.renderBooks();
  }

  clearBookForm() {
    document.getElementById('book-form').reset();
    document.getElementById('title').focus();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement('div');
    div.className = `alert alert-${colorMessage} message`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.col-md-4');
    const bookForm = document.querySelector('#book-form');
    container.insertBefore(div, bookForm);
    setTimeout(() => {
      document.querySelector('.message').remove();
    }, secondsToRemove);
  }
}

export default UI;
