const btnNumber = document.querySelectorAll('.btn-number');
const btnOperator = document.querySelectorAll('.btn-operator');
const btnEqual = document.querySelector('.btn-equal');
const btnclear = document.querySelector('.btn-clear');
const btnBackspace = document.querySelector('.btn-backspace');
const textoSuperior = document.querySelector('.valor-superior');
const textoInferior = document.querySelector('.valor-inferior');

class Calculadora {
    constructor(textoInferior, textoSuperior){
        this.textoInferior = textoInferior;// estas variables repetitivas se crean y se utilizan como varibles locales dentro de la class Calculadora para que no se sobre escriban o afecten a las variables de afuera
        this.textoSuperior = textoSuperior;
        this.inferior = '';//esta variable se utiliza como un valor inicial
        this.superior = '';//esta variqble se utiliza como un valor final
        this.operador = undefined;// esta varible es lo se utiliza como lo que va a suceder con el valor inicial y final

    }

    agregarNumero(numero){//el valor de numero se toma del (boton.innerText)
        if(numero === '.' && this.inferior.includes('.')) return;// si numero en igual a "." y ya esta incluido el ".", entonces no realizar nada
        this.inferior = this.inferior + numero;//se agrega el numero que precionamos y se concatena con el sigiente numero precionado
    }

    imprimirDisplay(){
        this.textoInferior.innerText = this.inferior;//el texto dentro del textoinferior va a ser igual a lo que sea inferior
        this.textoSuperior.innerText = this.superior;//el texto dentro del textosuperior va a ser igual a lo que sea superior
    }

    borrar(){
        this.inferior = this.inferior.slice(0,-1);//slice: retorna  una posicion dentro de un string
    }

    elegirOperador(operador){
        if(this.inferior == '') return; //si inferior esta vacio no ejecutes nada
        if(this.superior != ''){//si superior es distinto de vacio
            this.realizarCalculo();//realiza la siguiente funcion
        }

        this.operador = operador;//el operador local e igual al operador que se preciono
        this.superior = this.inferior;//el valor de superior va a ser igual al valor deinferior
        this.inferior = '';//inferior pasa a valer vacio
    }

    realizarCalculo(){
        let resultado;
        let conversioSuperior = parseFloat(this.superior);//parseFloat: pasa el string a numero
        let conversioInferior = parseFloat(this.inferior);

        if(isNaN(conversioSuperior) || isNaN(conversioInferior)) return;
        
        switch (this.operador) {// switch genera casos, en caso de que sea + realizar lo siguiente
            case '+':
                resultado = conversioSuperior + conversioInferior;
                break;
            case '-':
                resultado = conversioSuperior - conversioInferior;
                break;
            case '*':
                resultado = conversioSuperior * conversioInferior;
                break;
            case '/':
                resultado = conversioSuperior / conversioInferior;
                break;
        
            default: return;
        }

        this.inferior = resultado; //una vez que se realize la operacion, el valor inferior es el resultado
        this.operador = undefined; // el operador para a ser indefinido
        this.superior = ''; // superior pasa a estar vacio 
    }

    limpiarPantalla(){
        this.inferior = '';
        this.superior = '';
        this.operador = undefined;
    }

}

const calculadora = new Calculadora(textoInferior, textoSuperior);//llamamos a la clase

btnNumber.forEach(boton =>{
    boton.addEventListener('click',()=>{//cuando se haga click se agrega el texto
        calculadora.agregarNumero(boton.innerText);//innerText: es el texto que va dentro de ">AC<"
        calculadora.imprimirDisplay();
    })
    
});

btnBackspace.addEventListener('click', ()=>{//no es necesario usar el forEach porque es solo una tecla
    calculadora.borrar();
    calculadora.imprimirDisplay();
});

btnOperator.forEach(boton =>{
    boton.addEventListener('click',()=>{//cuando se haga click se agrega el texto
        calculadora.elegirOperador(boton.innerText);//innerText: es el texto que va dentro de ">AC<"
        calculadora.imprimirDisplay();
    });
});

btnEqual.addEventListener('click', ()=>{//no es necesario usar el forEach porque es solo una tecla
    calculadora.realizarCalculo();
    calculadora.imprimirDisplay();
});

btnclear.addEventListener('click', ()=>{//no es necesario usar el forEach porque es solo una tecla
    calculadora.limpiarPantalla();
    calculadora.imprimirDisplay();
});