const comments = [];
const inputContainer = document.createElement("div");
const input = document.createElement("input");
const commentsContainer = document.querySelector('#comments-container');

input.classList.add("input");

input.addEventListener('keydown', e =>{
    handleEnter(e, null);// es null porq aun no tenemos comentarios.
});

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

function handleEnter(e, current){ //e:se refiere al evento q estamos usando / current se refiere al comentario actual
    if(e.key === 'Enter' && e.target.value !== ''){//si presionamos la tecla enter y no esta vacio
        const newComment = { //creamos un nuevo comentario
            text: e.target.value, //texto
            likes: 0, //sin likes
            responses: [] //genera otro arreglo para poder generar otro comentario
        }

        if(current === null){//si estoy comentando a un comentario nuevo
            comments.unshift(newComment);//que aparesca el nuevo comentario al principio
        }else{
            current.responses.unshift(newComment);//o sino estoy contestando un comentario existente
        }

        e.target.value = '';
        commentsContainer.innerHTML = '';// limpiamos todo el interfas
        commentsContainer.appendChild(inputContainer);

        renderComments(comments, commentsContainer);//los parametros con el arreglo que estamos utilizando y el padre del arreglo
    }
}

function renderComments(arr, parent){
    arr.forEach(element => {
        const commentContainer = document.createElement("div");
        commentContainer.classList.add('comment-container');//cada comentario que yo agrege va a tener su contenedor

        const responsesContainer = document.createElement("div");
        responsesContainer.classList.add('responses-container');// a su vez va a tener una capa donde voy a ir almacenando las  respuestas
    
        const replyButton = document.createElement("button");//creamos un boton para la respuesta
        const likeButton = document.createElement("button");//creamos un boton para los llike

        const textContainer = document.createElement("div");
        textContainer.textContent = element.text;//creamos un div que contiene texto.

        const actionsContainer = document.createElement("div");
        
        replyButton.textContent = "Reply";
        likeButton.textContent = `${
            element.likes > 0 ? `${element.likes} like` : "like"
        }` ;// si la cantidad de likes es mayor a 0 quiero que me imprimas las cantidades de likes junto a la palabra like.


        replyButton.addEventListener('click', e =>{
            const newInput = inputContainer.cloneNode(true);//clonamos el input que ya continen todo lo de la capa padre.
            newInput.value = '';//por si el input principal tiene un texto
            newInput.focus();//para tener el foco en este input
            newInput.addEventListener('keydown', e =>{
                handleEnter(e, element);
            });//va a crear el nuevo comentario
            commentContainer.insertBefore(newInput, responsesContainer);
            //insertamos el nuevo input entre la capa del actions y el responsesContainer
        });

        likeButton.addEventListener('click', e =>{
            element.likes++;
            likeButton.textContent = `${
                element.likes > 0 ? `${element.likes} like` : "like"
            }` ;// si la cantidad de likes es mayor a 0 quiero que me imprimas las cantidades de likes junto a la palabra like.
        });

        //append 

        commentContainer.appendChild(textContainer);//primero insertamos el texto de ese comentario
        commentContainer.appendChild(actionsContainer);//despues insertamos la capa en donde van lo botones
        actionsContainer.appendChild(replyButton);//insertamos el boton de reply
        actionsContainer.appendChild(likeButton);//insertamos el boton de like

        commentContainer.appendChild(responsesContainer);//insertamos la capa del responsesContainer

        if(element.responses.length > 0){//si ese comentario tiene respuestas
            renderComments(element.responses, responsesContainer);// volvemos a llamar a la misma funcion
        }
        parent.appendChild(commentContainer);//cuando termina de crear todos los comentarios en la respuestas por ultimo se añade en la capa padre commentContainer que ya tiene toda la informacion necesaria para mostrar
         
    });

}