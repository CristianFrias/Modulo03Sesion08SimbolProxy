var persona = {
    [Symbol("id")]: 123456,  
    rut: "1.111.111-1",
    nombre: "Cristián",
    apellido:"Frías",
    edad: "37",
}

console.log(persona);
console.log("Propiedades sin Symbol", Object.getOwnPropertyNames(persona)); // no nos muestra Symbols

const [symbol] = Object.getOwnPropertySymbols(persona);
console.log("Valor simbolo: ", persona[symbol]);

console.log("Symbols", Object.getOwnPropertySymbols(persona));

const sim1 = Symbol.for("id");
const sim2 = Symbol.for("code");
const sim3 = Symbol.for("id");

console.log("Igualdad sim1 y sim2 ", sim1 === sim2);
console.log("Igualdad sim1 y sim3 ", sim1 === sim3);


// PROXY

var proxyPersona = new Proxy (persona, {
    get: function (objeto, propiedad) { //Obtenemos valores de propiedades del objeto
        if (propiedad === 'nombre') {
            return objeto[propiedad].toUpperCase()
        }
        if (propiedad === 'rut') {
            return objeto[propiedad].replaceAll(".","")
        }
        if (propiedad === 'edad') {
            return parseInt(objeto[propiedad])
        }
        return objeto [propiedad]
    },
    set: function (objeto, propiedad, valorNuevo) { //Asignamos valores de propiedades del objeto
        if (propiedad === 'nombre' || propiedad === 'apellido') {
            return objeto[propiedad] = valorNuevo.toUpperCase()
        }
        if (propiedad === 'edad') {
            if (isNaN(valorNuevo)) {
                throw "Debe agregar un valor númerico a la propiedad"
            }
            return objeto[propiedad] = parseInt(valorNuevo)
        }
        return objeto
    }
})
proxyPersona.nombre = "andrés";
proxyPersona.apellido = "garcía";
// proxyPersona.edad = "quince"; // muestra mensaje de error en consola
proxyPersona.edad = "15";

console.log(proxyPersona.nombre);
console.log(proxyPersona.apellido);
console.log(proxyPersona.rut);
console.log(proxyPersona.edad);