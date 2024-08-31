// Information for adding a new book to our collection
let bookTitle = document.getElementById("book-title")
let bookAuthor = document.getElementById("book-author")
let bookPages = document.getElementById("book-pages")
let bookRead = document.getElementById("book-read")
let addNewBook = document.getElementById("book-add")

// Book statistics query selectors
let numBooksRead = document.getElementById("books-read")
let numBooksUnread = document.getElementById("books-unread")
let totalBooks = document.getElementById("total-books")

// Table query selector
let tableSelector = document.getElementById("main--books-table")

// An array of Book objects used as our "Library"
const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  // Add to table
}
