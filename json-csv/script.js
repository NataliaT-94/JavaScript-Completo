const jsonForm = document.querySelector('#jsonform');
const csvForm = document.querySelector('#csvform');
const bConvert = document.querySelector('#bConvert');

bConvert.addEventListener('click', e=>{
    convertJSONtoCSV();
});

function convertJSONtoCSV(){
    let json;
    let keys = [];
    let values = [];

    try {
        json = JSON.parse(jsonForm.value);
    } catch (error) {
        console.log('Formato incorrecto JSON', error);
        alert("Formato incorrecto JSON");
        return; // salir de la función si hay un error de formato JSON
    }

    if(Array.isArray(json)){//algoritmo
        json.forEach((item)=>{

            const nkeys = Object.keys(item); //obtengo las propiedades de mi objeto
            
            if(keys.length === 0){//quiere decir que no hay nada
                keys = [...nkeys];
            }else{
                if(nkeys.length !== keys.length){
                    throw new Error('El número de keys es diferente');
                }else{
                    console.log("ok", nkeys);
                }
            }
            const row = keys.map(k =>{
                return item[k];//extraigo los valores del elemento que estoy iterando
            });
            values.push([...row]);
        });
        console.log(keys, values);
        values.unshift(keys);

        const text = values.map(v => v.join(',')).join('\n');
        csvForm.value = text;
    }else{
        alert("No es un arreglo de objetos");
    }
}