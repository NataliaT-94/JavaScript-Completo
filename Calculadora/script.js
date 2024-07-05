const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item)=>{//item: hacemos referencia a todos los botones
    item.onclick=()=>{//cuando hacemos click en algun item(boton) se realiza la siguiente funcion
      if(item.id=="clear"){//si el id del item que presionamos es "clear"
        display.innerText="";//el texto se vuelve vacio, es decir se borra
      }  else if(item.id=="backspace"){
        let string = display.innerText.toString(); //todo dentro del display lo transformamos en caracteres(texto)
        display.innerText = string.substr(0, string.length-1);//borra el ultimo caracter
      } else if(display.innerText != "" && item.id=="equal"){//si el texto del display es diferente a vacio y  el id del item es equal
        display.innerText = eval(display.innerText);//la cadena de texto es tomada como una operacion
      } else if(display.innerText == "" && item.id=="equal"){//si el texto del display es igual a vacio y  el id del item es equal
        display.innerText = "Null";
        setTimeout(()=> (display.innerText = ""), 2000);//setTimeout: que realize una funcion en un determinado tiempo, el primer parametro es la accion (display se vuelva vacio) y el segundo parametro es el tiempo (2min)
      }else{
        display.innerText += item.id;//escribir el id al cual se hizo click
      }
    };
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");

let isDark = true;//el tema va a estar en dark

themeToggleBtn.onclick = ()=>{//cuando haga click
  calculator.classList.toggle("dark");// activamos el tema dark y que afecte a todos los elementos dentro de las class
  themeToggleBtn.classList.toggle("active"); // que si es active todo se vuelva claro
  isDark = !isDark;
}