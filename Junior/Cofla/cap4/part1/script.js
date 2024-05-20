/*
Info 



Crear Soluciones
-Perfeccionar la calculadora para poder implementar nuevas funciones ( calcular potencias, raices cuadradas y cubicas). 


*/
class Calculadora {
    constructor(){
    }
    sumar(num1,num2){
        return parseInt(num1) + parseInt(num2);
    }
    restar(num1,num2){
        return parseInt(num1) - parseInt(num2);
    }
    dividir(num1,num2){
        return parseInt(num1) / parseInt(num2);
    }
    multiplicar(num1,num2){
        return parseInt(num1) * parseInt(num2);
    }
    potenciar(num,exp){
        let numero = num;
        for(var i=1; i < exp; i++){
            numero = numero*num;
        }
        return numero;
        //return num**exp;
    }
    raizCuadrada(num){
        return Math.sqrt(num);
    }
    raizCubica(num){
        return Math.cbrt(num);
    }
}




const calculadora = new Calculadora();

alert("¿Que operacion deseas realizar?");
let operacion = prompt("1:sumar, 2:restar, 3:dividir, 4:multiplicar, 5:potenciacion, 6:raiz cuadrada, 7:raiz cubica");

if(operacion == 1){
    let numero1 = prompt("primer numero para sumar");
    let numero2 = prompt("segundo numero para sumar");
    resultado = calculadora.sumar(numero1,numero2);
    alert(`Tu resultado es ${resultado}`);
}
else if(operacion == 2){
    let numero1 = prompt("primer numero para restar");
    let numero2 = prompt("segundo numero para restar");
    resultado = calculadora.restar(numero1,numero2);
    alert(`Tu resultado es ${resultado}`);
}
else if(operacion == 3){
    let numero1 = prompt("primer numero para dividir");
    let numero2 = prompt("segundo numero para dividir");
    resultado = calculadora.dividir(numero1,numero2);
    alert(`Tu resultado es ${resultado}`);
}
else if(operacion == 4){
    let numero1 = prompt("primer numero para multiplicar");
    let numero2 = prompt("segundo numero para multiplicar");
    resultado = calculadora.multiplicar(numero1,numero2);
    alert(`Tu resultado es ${resultado}`);
}
else if(operacion == 5){
    let numero1 = prompt("numero a potenciar");
    let numero2 = prompt("exponente");
    resultado = calculadora.potenciar(numero1,numero2);
    alert(`Tu resultado es ${resultado}`);
}
else if(operacion == 6){
    let numero1 = prompt("conocer la raiz cuadrada de:");
    resultado = calculadora.raizCuadrada(numero1);
    alert(`Tu resultado es ${resultado}`);
}  
else if(operacion == 7){
    let numero1 = prompt("conocer la raiz cubica de:");
    resultado = calculadora.raizCubica(numero1);
    alert(`Tu resultado es ${resultado}`);
}
else{
    alert("No se ha encotrado la operacion");
}