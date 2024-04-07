const showBtn = document.querySelector(".show");
const closeBtn = document.querySelector(".close");
const dialogEle = document.querySelector("#dialog");

//Show dialog box when add button is clicked
showBtn.addEventListener("click", () => {
  dialogEle.showModal();

  // Clear input fields after submission or everytime dialog box is opened
  document.querySelector(".title").value = "";
  document.querySelector(".author").value = "";
  document.querySelector(".pages").value = "";
  document.querySelector(".read").checked = false;
});

//Close dialog box when close button is clicked
closeBtn.addEventListener("click", () => {
  dialogEle.close();
});

const myLibrary = [];


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {

  //Getting user input from the DOM
  const title = document.querySelector(".title").value;
  const author = document.querySelector(".author").value;
  const pages = document.querySelector(".pages").value;
  const read = document.querySelector(".read").checked;

  //Adding retrieved info to the constructor
  myLibrary.push(new Book(title, author, pages, read));

  // Display the newly added book information by removing previously printed
  const results = document.querySelector(".results");
  results.innerHTML = "";

  //Looping through the array to display each book info
  for (let i = 0; i < myLibrary.length; i++) {

    const bookInfo = document.createElement("div");

    const titleSpan = document.createElement("span");
    titleSpan.textContent = myLibrary[i].title;
    bookInfo.appendChild(titleSpan);

    const authorSpan = document.createElement("span");
    authorSpan.textContent = myLibrary[i].author;
    bookInfo.appendChild(authorSpan);

    const pagesSpan = document.createElement("span");
    pagesSpan.textContent = myLibrary[i].pages;
    bookInfo.appendChild(pagesSpan);

    const readBtn = document.createElement("button");
    readBtn.textContent = myLibrary[i].read ? "Read" : "Unread";
    bookInfo.appendChild(readBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    bookInfo.appendChild(deleteBtn);

    results.appendChild(bookInfo);

    //When read or unread status is clicked it toggles between read or unread
    readBtn.addEventListener("click", () => {
      if (readBtn.innerHTML === "Read") {
        readBtn.textContent = "Unread";
      } else {
        readBtn.textContent = "Read";
      }
    });

    deleteBtn.addEventListener("click", () => {
      
      // Remove the book from the library array
      myLibrary.splice(i, 1);
      
      // Remove the book entry from the DOM
      bookInfo.remove();

      //if there is no book in library it displays "Empty"
      if (myLibrary.length === 0) {
        const emptyH2 = document.createElement("h2");
        emptyH2.textContent = "Empty";
        results.appendChild(emptyH2);
      }
    });
  }
}

const submitButton = document.querySelector(".submit");

submitButton.addEventListener("click", (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  const title = document.querySelector(".title").value;
  const author = document.querySelector(".author").value;
  const pages = document.querySelector(".pages").value;

  if (title === "" || author === "" || pages === "") {
    dialogEle.close();
  } else {
    addBookToLibrary();
  }

 

  // Close dialog after submission
  dialogEle.close();
});g