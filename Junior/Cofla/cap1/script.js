/*
Info 

Roberto = $1.5 usd
Pedro = $1.7 usd
Cofla = $3 usd

helado de agua = $0.6 usd
helado de crema = $1 usd
helado marca heladix = $1.6 usd
helado marca heladovich = $1.7 usd
helado marca helardo = $1.8 usd
helado con confite= $2.9 usd
pote de 1/4kg = $2.9 usd

Crear Soluciones

-Pedirles que ingresen el monto que tienen y mostrarles el helado mas caro 
-Si hay 2 o mas con el mismo precio, mostrar ambos.
-Cofla quiere saber cuanto es el vuelto. 
*/

let dineroCofla = prompt("cuanto dinero tienes Cofla?");
let dineroPedro = prompt("cuanto dinero tienes Pedro?");
let dineroRoberto = prompt("cuanto dinero tienes Roberto?");

dineroCofla = parseInt(dineroCofla);
dineroPedro = parseInt(dineroPedro);
dineroRoberto = parseInt(dineroRoberto);

if(dineroCofla >= 0.6 && dineroCofla < 1){
    alert("Cofla, comprate el helado de agua");
    alert("y te sobran " + (dineroCofla - 0.6));
}
else if(dineroCofla >= 1 && dineroCofla < 1.6){
    alert("Cofla, comprate el helado de crema");
    alert("y te sobran " +( dineroCofla - 1));
}
else if(dineroCofla >= 1.6 && dineroCofla < 1.7){
    alert("Cofla, comprate el helado marca heladix");
    alert("y te sobran " + (dineroCofla - 1.6));
    
}
else if(dineroCofla >= 1.7 && dineroCofla < 1.8){
    alert("Cofla, comprate el helado marca heladovich");
    alert("y te sobran " +( dineroCofla - 1.7));
}
else if(dineroCofla >= 1.8 && dineroCofla < 2.9){
    alert("Cofla, comprate el helado marca helardo");
    alert("y te sobran " + (dineroCofla - 1.8));
}
else if(dineroCofla >= 2.9){
    alert("Cofla, comprate el helado con confite o pote de 1/4kg");
    alert("y te sobran " + (dineroCofla - 2.9));
}
else {
    alert("Cofla, lo siento, el dinero no te alcanza");
}

if(dineroPedro >= 0.6 && dineroPedro < 1){
    alert("Pedro, comprate el helado de agua");
    alert("y te sobran " + (dineroPedro - 0.6));
}

else if(dineroPedro >= 1 && dineroPedro < 1.6){
    alert("Pedro, comprate el helado de crema");
    alert("y te sobran " + (dineroPedro - 1));
}
else if(dineroPedro >= 1.6 && dineroPedro < 1.7){
    alert("Pedro, comprate el helado marca heladix");
    alert("y te sobran " + (dineroPedro - 1.6));
}
else if(dineroPedro >= 1.7 && dineroPedro < 1.8){
    alert("Pedro, comprate el helado marca heladovich");
    alert("y te sobran " + (dineroPedro - 1.7));
}
else if(dineroPedro >= 1.8 && dineroPedro < 2.9){
    alert("Pedro, comprate el helado marca helardo");
    alert("y te sobran " + (dineroPedro - 1.8));
}
else if(dineroPedro >= 2.9){
    alert("Pedro, comprate el helado con confite o pote de 1/4kg");
    alert("y te sobran " + (dineroPedro - 2.9));
}
else {
    alert("Pedro, lo siento, el dinero no te alcanza")
}

if(dineroRoberto >= 0.6 && dineroRoberto < 1){
    alert("Roberto, comprate el helado de agua");
    alert("y te sobran " + (dineroRoberto - 0.6));
}
else if(dineroRoberto >= 1 && dineroRoberto < 1.6){
    alert("Roberto, comprate el helado de crema");
    alert("y te sobran " + (dineroRoberto - 1));
}
else if(dineroRoberto >= 1.6 && dineroRoberto < 1.7){
    alert("Roberto, comprate el helado marca heladix");
    alert("y te sobran " + (dineroRoberto - 1.6));
}
else if(dineroRoberto >= 1.7 && dineroRoberto < 1.8){
    alert("Roberto, comprate el helado marca heladovich");
    alert("y te sobran " + (dineroRoberto - 1.7));
}
else if(dineroRoberto >= 1.8 && dineroRoberto < 2.9){
    alert("Roberto, comprate el helado marca helardo");
    alert("y te sobran " + (dineroRoberto - 1.8));
}
else if(dineroRoberto >= 2.9){
    alert("Roberto, comprate el helado con confite o pote de 1/4kg");
    alert("y te sobran " + (dineroRoberto - 2.9));
}
else {
    alert("Roberto, lo siento, el dinero no te alcanza")
}