async function displayBooks() {
    try {
        const response = await fetch('books.json');
        const booksData = await response.json();
        const booksContainer = document.querySelector('.books');

        booksData.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <img src="${book.imageLink}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Country: ${book.country}</p>
                <p>Language: ${book.language}</p>
                <p>Pages: ${book.pages}</p>
                <p>Year: ${book.year}</p>
                <a href="${book.link}" target="_blank">Learn More</a>
                <button class="like-button">Like</button>
                <button class="comment-button">Comment</button>
                <div class="comment-form" style="display: none;">
                    <textarea class="comment-text" rows="4" placeholder="Enter your comment"></textarea>
                    <button class="submit-comment">Submit</button>
                </div>
                <p class="comment-status" style="display: none;">You commented: <span class="comment-text"></span></p>
            `;

            const likeButton = bookElement.querySelector('.like-button');
            const commentButton = bookElement.querySelector('.comment-button');
            const commentForm = bookElement.querySelector('.comment-form');
            const commentText = bookElement.querySelector('.comment-text');
            const submitComment = bookElement.querySelector('.submit-comment');
            const commentStatus = bookElement.querySelector('.comment-status');

            likeButton.addEventListener('click', () => {
                if (!loggedInUser) {
                    alert('Please sign in to like books.');
                } else {
                    alert(`You liked "${book.title}"`);
                }
            });

            commentButton.addEventListener('click', () => {
                if (!loggedInUser) {
                    alert('Please sign in to comment on books.');
                } else {
                    commentForm.style.display = 'block';
                }
            });

            submitComment.addEventListener('click', () => {
                const comment = commentText.value.trim();
                if (comment !== '') {
                    commentStatus.style.display = 'block';
                    commentStatus.querySelector('.comment-text').textContent = comment;
                    commentForm.style.display = 'none';
                } else {
                    alert('Please enter a comment.');
                }
            });

            booksContainer.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error fetching and displaying books:', error);
    }
}

window.addEventListener('load', displayBooks);
