const book = (author, language, subject, title) => {
  this.author = author;
  this.language = language;
  this.subject = subject;
  this.title = title;
  this.isFavorite = false;

  const li = document.createElement("li");
  li.textContent = `${book.title} by ${book.author}`;

     // Create favorite button
     const favButton = document.createElement("button");
     favButton.textContent = this.isFavorite ? "❤️" : "♡";
     li.append(favButton);
 
     // Toggle favorite property on click
     favButton.addEventListener("click", () => {
       this.isFavorite = !this.isFavorite;
       favButton.textContent = this.isFavorite ? "❤️" : "♡";
     });
     return li;
}
