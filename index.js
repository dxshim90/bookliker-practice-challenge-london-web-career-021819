document.addEventListener("DOMContentLoaded", function() {
  renderBooks()
});

const bookURL = 'http://localhost:3000/books'
const listEL = document.getElementById('list')
const showEL = document.getElementById('show-panel')
const user = {"id":1, "username":"pouros"}

function getBooks() {
  return fetch(bookURL)
  .then(response => response.json())
}

function addBook(book) {
  const liEL = document.createElement('li')
  liEL.dataset.id = book.id
  liEL.className = `book ${book.id}`
  liEL.innerText = book.title
  listEL.appendChild(liEL)

  liEL.addEventListener('click', (event) => {
      showBook(book)
    })
}



function likeBook(book) {
  fetch(`http://localhost:3000/books/${book.id}`, {
    headers: { "Content-Type": "application/json" },
    method: 'PATCH',
    body: JSON.stringify(book)
  }).then(() => showBook(book))
}

function renderBooks() {
  getBooks()
  .then(books => books.forEach(addBook))
}


function showBook(book) {
  showEL.innerHTML = `
  <div class="show-page">
  <h1> ${book.title} </h1>
  <p> ${book.description} </p>
  <img src='${book.img_url}' />
  <ul>
  ${book.users.map(user => user.username)}
  <br><br><br><br>
  <button class ="like-button"> Read Book </button>
  </div>
  `
  showEL.querySelector('button.like-button').addEventListener('click', (event) => {
    if (event.target.className === `like-button`) {
      book.users.push(user)
      likeBook(book)
    }
  })

}
