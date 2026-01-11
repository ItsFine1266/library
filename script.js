let myLibrary = [];

// using localstorage to save data
function loadBooks() {
  const stored = localStorage.getItem("libraryArr");
  if (stored) {
    myLibrary = JSON.parse(stored);
  } else {
    myLibrary = [];
  }
}

function saveBooks() {
  localStorage.setItem("libraryArr", JSON.stringify(myLibrary));
}

const bookName = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");

class Book {
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(name, author, pages, read) {
  const book = new Book(name, author, pages, read);
  myLibrary.push(book);
  saveBooks();
  displayBooks();
}

function displayBooks() {
  const card = document.querySelector(".card");
  card.innerHTML = "";
  myLibrary.forEach(book => {
    const content = document.createElement("div");
    content.classList.add("card-content");

    content.innerHTML = `
      <h3 class="book-name">${book.name}</h3>
      <p class="book-info">Author: ${book.author}</p>
      <p class="book-info">Pages: ${book.pages}</p>
      <p class="book-info">Read: ${book.read ? "Read" : "Not read"}</p>
      <button class="deleteButton">Delete</button>
      <button class="toggleButton">Toggle Read</button>
    `;

    const deleteButton = content.querySelector(".deleteButton");
    const toggleButton = content.querySelector(".toggleButton");
    const index = myLibrary.indexOf(book);

    deleteButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      saveBooks();
      displayBooks();
    });

    toggleButton.addEventListener("click", () => {
      myLibrary[index].toggleRead();
      saveBooks();
      displayBooks();
    });

    card.appendChild(content);
  });
};

// form validation
function logError(text) {
  const error = document.querySelector(".errors");
  error.textContent = text;
}

function validateInputs() {
  checkInput(bookName, "Title")
  checkInput(bookAuthor, "Author")
  checkPages()
}

function checkInput(input, value) {
  input.addEventListener("input", () => {
    input.reportValidity();
    if (input.validity.valueMissing) {
      logError(`${value} must be filled in`);
      input.setCustomValidity(`${value} must be at least a character in length`);
    } else {
      logError("");
      input.setCustomValidity("");
    }
  });
}

function checkPages() {
  bookPages.addEventListener("input", () => {
    if (bookPages.validity.rangeUnderflow) {
      logError("Page count too small")
    } else {
      logError("")
    }
  });
}

validateInputs();

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("submit", (event) => {
  event.preventDefault();

  if (bookName.value === "" || bookAuthor.value === "" || bookPages.value === "") {
    logError("Values are missing")
  } else {
    const title = bookName.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const read = bookRead.value;

    dialog.close();
    addBookToLibrary(title, author, pages, read);
    saveBooks();
    displayBooks();
  }
});

const body = document.querySelector("body");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".addBook");
const closeButton = document.querySelector(".close");

addBook.addEventListener("click", () => {
  bookName.value = "";
  bookAuthor.value = "";
  bookPages.value = "";

  logError("")
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

loadBooks();

if (myLibrary.length === 0) {
  addBookToLibrary("book 1", "jeff", "3", true);
  addBookToLibrary("book 2", "jeff", "3", false);
  addBookToLibrary("book 3", "jeff", "3", true);
  addBookToLibrary("book 4", "jeff", "3", false);
  addBookToLibrary("book 5", "jeff", "3", true);
} else {
  displayBooks();
}