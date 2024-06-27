const replies = [];
const inputContainer = document.createElement("div");
const commentsContainer = document.querySelector(".comments-container");

const input = document.createElement("input");
input.classList.add("input");

input.addEventListener('keydown', e =>{
    handleEnter(e, null);
});

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

function handleEnter(e, current) {
    if (e.key === 'Enter' && e.target.value !== '') {
        const newComment = {
            text: e.target.value,
            likes: 0,
            responses: []
        }
        if (current === null) {
            replies.unshift(newComment);
        } else {
            current.responses.unshift(newComment);
        }

        e.target.value = '';
        // No borrar todo el contenedor de comentarios, solo actualizar el contenido.
        commentsContainer.innerHTML = '';
        commentsContainer.appendChild(inputContainer);

        renderComments(replies, commentsContainer);
    }
}

function renderComments(arr, parent){
    arr.forEach(element => {
        const comment = document.createElement("div");
        comment.classList.add('comment');

        const line = document.createElement("div");
        line.classList.add('line');

        const commentWrapper = document.createElement("div");
        commentWrapper.classList.add('comment-wrapper');  

        const commentContent = document.createElement("div");
        commentContent.classList.add('comment-content');

        const photo = document.createElement("div");
        photo.classList.add('photo');

        const commentInfo = document.createElement("div");
        commentInfo.classList.add('comment-info');

        const header = document.createElement("div");
        header.classList.add('user-name');

        const responsesContainer = document.createElement("div");
        responsesContainer.classList.add('responses-container');
        
        const textContainer = document.createElement("div");
        textContainer.textContent = element.text;

        const actionsContainer = document.createElement("div");
        actionsContainer.classList.add('actions');

        const replyButton = document.createElement("button");
        const likeButton = document.createElement("button");

        replyButton.textContent = "Reply";
        likeButton.textContent = `${
            element.likes > 0 ? `${element.likes} like` : "like"
        }` ;

        replyButton.addEventListener('click', e =>{
            const newInput = input.cloneNode(true);
            newInput.value = '';
            newInput.focus();
            newInput.addEventListener('keydown', e =>{
                handleEnter(e, element);
            });
            comment.insertBefore(newInput, responsesContainer);     
        });

        likeButton.addEventListener('click', e =>{
            element.likes++;
            likeButton.textContent = `${
                element.likes > 0 ? `${element.likes} like` : "like"
            }` ;
        });

        // append

        comment.appendChild(line);
        comment.appendChild(commentWrapper);
        commentWrapper.appendChild(commentContent);
        commentContent.appendChild(photo);
        commentContent.appendChild(commentInfo);
        commentInfo.appendChild(header);
        commentInfo.appendChild(textContainer);
        commentInfo.appendChild(actionsContainer);
        actionsContainer.appendChild(replyButton);
        actionsContainer.appendChild(likeButton);
        comment.appendChild(responsesContainer);

        if(element.responses.length > 0){
            renderComments(element.responses, responsesContainer);
        }

        parent.appendChild(comment);
        
    });
}
