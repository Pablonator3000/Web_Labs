document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const commentsContainer = document.getElementById('comments');

    preloader.style.display = 'block';

    const filter = Math.random() > 0.5 ? '?id_gte=100' : '?id_lte=200';

    fetch(`https://jsonplaceholder.typicode.com/comments${filter}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            preloader.style.display = 'none';

            data.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                            <h3>${comment.name}</h3>
                            <p><strong>Email:</strong> ${comment.email}</p>
                            <p>${comment.body}</p>
                        `;
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(error => {
            preloader.style.display = 'none';
            const errorMessage = document.createElement('p');
            errorMessage.classList.add('error');
            errorMessage.textContent = `⚠ Что-то пошло не так: ${error.message}`;
            commentsContainer.appendChild(errorMessage);
        });
});