let myLibrary = [];

class Book {
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(name, author, pages, read) {
  const book = new Book(name, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const card = document.querySelector(".card");
  card.innerHTML = ""
  for (let counter = 0; counter < myLibrary.length; counter++) {
    const content = document.createElement("div");
    content.classList.add("card-content");
    content.dataset.id = myLibrary[counter].id;
    content.innerHTML = `
      <h3 class="book-name">${myLibrary[counter].name}</h3>
      <p class="book-info">Author: ${myLibrary[counter].author}</p>
      <p class="book-info">Pages: ${myLibrary[counter].pages}</p>
      <p class="book-info">Read: ${myLibrary[counter].read ? "Read" : "Not read"}</p>
      <button class="deleteButton">Delete</button>
      <button class="toggleButton">Toggle Read</button>
    `;

    const deleteButton = content.querySelector(".deleteButton");

    deleteButton.addEventListener("click", () => {
      for (let x = 0; x < myLibrary.length; x++) {
        if (myLibrary[x].id === content.getAttribute("data-id")) {
          myLibrary.splice(myLibrary[x], 1);
          content.remove();
          displayBooks();
        }
      }
    });

    const toggleButton = content.querySelector(".toggleButton");

    toggleButton.addEventListener("click", () => {
     for (let x = 0; x < myLibrary.length; x++) {
        if (myLibrary[x].id === content.getAttribute("data-id")) {
          myLibrary[x].toggleRead();
          displayBooks();
        }     
      }
    });

    card.appendChild(content);
  };
}

console.log(myLibrary);

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value;

  dialog.close();
  addBookToLibrary(title, author, pages, read);
  displayBooks();
});

displayBooks();

const body = document.querySelector("body");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".addBook");
const closeButton = document.querySelector(".close");

addBook.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

addBookToLibrary("bob", "jeff", "3", true);
addBookToLibrary("jeff", "jeff", "3", false);
addBookToLibrary("bob", "jeff", "3", true);
addBookToLibrary("jeff", "jeff", "3", false);
addBookToLibrary("jeff", "jeff", "3", true);