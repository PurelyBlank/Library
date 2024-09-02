// Information for adding a new book to our collection
let bookTitle = document.getElementById("book-title")
let bookAuthor = document.getElementById("book-author")
let bookPages = document.getElementById("book-pages")
let bookRead = document.getElementById("book-read")
const bookForm = document.getElementById("book-form")
let deleteAllBooks = document.getElementById("delete-all-books")

// Book statistics query selectors
let numBooksRead = document.getElementById("books-read")
let numBooksUnread = document.getElementById("books-unread")
let totalBooks = document.getElementById("total-books")

// Table query selector
let tableSelector = document.getElementById("main--books-table")

bookForm.addEventListener("submit", (e) => {
  if (!bookForm.checkValidity()) { return }

  e.preventDefault()
  let newBook = new Book(
    bookTitle.value, 
    bookAuthor.value, 
    bookPages.value, 
    bookRead.checked
  )
  addBookToLibrary(newBook)
  bookForm.reset()
})

deleteAllBooks.addEventListener("click", (e) => {
  myLibrary = []
  booksRead = 0
  booksUnread = 0
  updateBookStats() 
  removeAllRowsExceptHeader();
})

// An array of Book objects used as our "Library"
let myLibrary = [];
let counter = 0
let booksRead = 0
let booksUnread = 0

function Book(title, author, pages, haveRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
  this.id = ++counter
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  displayBook(book)
  updateBookStats()
}

function displayBook(book) {
  // displays book on the page
  let bookBeenRead = book.haveRead ? "Yes" : "No"
  let tableRow = `
                  <tr id="${book.id}">
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.pages}</td>
                    <td><button class="been-read" id="been-read-${book.id}" onclick="changeRead(this)">${bookBeenRead}</button></td>
                    <td><input id="remove-book" type="button" value="Remove" onclick="removeBook(this)"></td>
                  </tr>
                  `
  tableSelector.innerHTML += tableRow
  let beenRead = document.querySelector("#been-read-" + book.id)
  if (bookBeenRead === "Yes") {
    beenRead.style.backgroundColor = "#52b154"
    ++booksRead
  }
  else {
    beenRead.style.backgroundColor = "#cf1d1de1"
    ++booksUnread
  }
  updateBookStats()
}

function updateBookStats() {
  // updates the statistics on books
  numBooksRead.textContent = "BOOKS READ: " + booksRead
  numBooksUnread.textContent = "BOOKS UNREAD: " + booksUnread
  totalBooks.textContent = "TOTAL BOOKS: " + myLibrary.length
}

function changeRead(button) {
  // Get the row ID from the button's parent row
  const tableRow = button.parentNode.parentNode
  const rowId = tableRow.getAttribute("id")

  // Find the book object associated with the row
  let book = myLibrary.find(book => book.id == rowId)
  if (!book) return; // Book not found, exit function

  // Get the button element and update its text and style
  let beenReadButton = button
  if (beenReadButton.textContent === "Yes") {
    beenReadButton.textContent = "No"
    beenReadButton.style.backgroundColor = "#cf1d1de1";
    --booksRead
    ++booksUnread
    book.haveRead = false
  } else {
    beenReadButton.textContent = "Yes"
    beenReadButton.style.backgroundColor = "#52b154";
    ++booksRead
    --booksUnread
    book.haveRead = true;
  }

  updateBookStats();
}


function removeBook(button) {
  // Get the row ID from the button's parent row
  const tableRow = button.parentNode.parentNode;
  const rowId = tableRow.getAttribute("id");
  
  let bookToRemove = myLibrary.find(book => book.id == rowId);
  myLibrary = myLibrary.filter(book => book.id != rowId);
  
  if (bookToRemove.haveRead) {
    --booksRead
  } else {
    --booksUnread
  }

  tableRow.parentNode.removeChild(tableRow);
  updateBookStats()
}


function removeAllRowsExceptHeader() {
  let table = document.getElementById("main--books-table");

  // Get all rows in the table, skipping the first one (header)
  let rows = table.getElementsByTagName("tr")
  while (rows.length > 1) {
    table.deleteRow(1)
  }
}
