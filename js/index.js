const bookshelf = bookData;

const removeBook = (book) => {
  // Can you find the book?
  const idx = bookshelf.indexOf(book);
  return idx !== -1
    ? // If the book was found, remove it
      bookshelf.splice(idx, 1)
    : // Otherwise, it's the same bookshelf
      bookshelf;
};

//filterbooks here

const filterBooks = (books) => {
  const searchBtn = document.querySelector(".searchBtn");
  searchBtn.addEventListener("click", () => {
    const searchData = document.querySelector(".searchData");
    const userSearch = searchData.value.toLowerCase();
    const filteredBooks = books.filter((book) => {
      // book.title.toLowerCase().includes(searchData.value.toLowerCase()))
      if (searchData === "") {
        return bookshelf;
      } else {//possibly find a way to make this smaller?
        // const searchTitle = book.title.join(""); don't need if using in field below
        const searchAuthor = book.author.join("");
        const searchSub = book.subject.join("");
        //join together here for searching for all ??
        //yes, use concat??
        const searchAllData = book.title
          .concat(searchAuthor, searchSub)
          .toLowerCase();
        if (searchAllData.includes(userSearch)) {
          return book;
        }
      }
    });
    //to do: add a filter for author and subject

    renderApp({ bookshelf: filteredBooks });
  })
};
filterBooks(bookshelf);


const renderBook = (book) => {
  const li = document.createElement("li");
  li.textContent = `${book.title} by ${book.author}`;
//next issue for favBtn is getting it to stay when reloaded
  const favBtn = document.createElement("button");
  //this is where the star will show fave or not
  favBtn.textContent = "⚝";
  favBtn.addEventListener("click", () => {
    this.isFavorite = !this.isFavorite;
    favBtn.textContent = this.isFavorite ? "⭐" : "⚝";
  });
  li.append(favBtn);


  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.addEventListener("click", () => {
    removeBook(book);
    renderApp({
      name: "Online Library",
      bookshelf: bookshelf,
    });
  });
  li.prepend(removeBtn);

  const infoBtn = document.createElement("button");
  const par = document.createElement("p");
  li.append(par);
  infoBtn.textContent = "More Info";
  infoBtn.addEventListener("click", () => {
    if (infoBtn.textContent === "Less Info") {
      par.textContent = "";
      infoBtn.textContent = "More Info";
    } else {
      //instead of getBookshelf, we need to get the other info
      par.textContent = `Language: ${book.language} and Subject: ${book.subject}`;
      infoBtn.textContent = "Less Info";
    }
  });
  
  const commentBtn = document.createElement("button")
  commentBtn.textContent = "Comment";
  commentBtn.addEventListener("click", () => {
    const disableButton = () => {
      commentBtn.disabled = true;
    }
    disableButton();
    const commentCard = document.createElement("div");
  const comment = document.createElement("input");
  comment.setAttribute("type", "text");
  const sendBtn = document.createElement("button");
  sendBtn.textContent = "Send";
  sendBtn.addEventListener("click", () => {
    const commentPar = document.createElement("p");
    commentPar.className = "comment";
    const commentValue = comment.value;
    commentPar.textContent = commentValue;
//when send button clicked, display comment, and remove input field/send btn  
    
    if (commentValue === ""){
      return "error";
    } else {
      if (commentValue.length >= 281){
      return "Comment must be within 280 characters!";
      }
    }
    li.after(commentPar);
  })
  commentCard.append(comment, sendBtn);
  commentBtn.after(commentCard);
  // renderApp({
  //   name: "Online Library",
  //   bookshelf: bookshelf,
  // });
  
  })
  li.append(infoBtn, commentBtn);
  return li;
};

const renderBookshelf = (bookshelf) => {
  const ul = document.createElement("ul");
  //this is where we will render book to bookshelf
  //give all info inside array with ...
  const renderedBooks = bookshelf.map((book) => renderBook(book)); //the (book) made it so renderBook knew what info for which book to put
  ul.replaceChildren(...renderedBooks);
  //return here
  return ul;
};

const renderUserInput = () => {
  const UI = document.querySelector(".UI");
  const section = document.createElement("section");
  const titleUI = document.createElement("input");
  titleUI.className = "title";
  titleUI.placeholder = "Title";
  const authorUI = document.createElement("input");
  authorUI.className = "author";
  authorUI.placeholder = "Author";
  const subjectUI = document.createElement("input");
  subjectUI.className = "subject";
  subjectUI.placeholder = "Subject";
  const languageUI = document.createElement("input");
  languageUI.className = "language";
  languageUI.placeholder = "Language";
  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Book";

  //add a book functionality here
  addBtn.addEventListener("click", () => {
    let book = {
      title: titleUI.value,
      author: authorUI.value,
      subject: subjectUI.value,
      language: languageUI.value,
    };

    bookshelf.push(book);

    renderApp({
      name: "Online Library",
      bookshelf: bookshelf,
    });
  });
  section.append(titleUI, authorUI, subjectUI, languageUI, addBtn);
  UI.replaceChildren(section);
};

//render

const renderApp = (app) => {
  const main = document.querySelector("main");

  const userInput = renderUserInput();

  const h1 = document.createElement("h1");
  h1.textContent = app.name;

  const renderedBookshelf = renderBookshelf(app.bookshelf);
  //render to main
  main.replaceChildren(h1, renderedBookshelf);
  
};
renderApp({
  name: "Online Library",
  bookshelf: bookshelf,
});
