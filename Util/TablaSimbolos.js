const Expresion = require('../Modelo/Expresion')

class TablaSimbolos {
    constructor() {
        this.tabla = {};
        this.arrays = {};
        this.metodos = {};
    }

    agregarVariable(expresion) {
        if(expresion.valor === null){
            if(expresion.tipo === 'ENTERO'){
                let obj = {
                    valor: 0,
                    tipoValor: 'ENTERO',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(expresion.tipo === 'DOUBLE'){
                let obj = {
                    valor: 0.0,
                    tipoValor: 'DOUBLE',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(expresion.tipo === 'BOOL') {
                let obj = {
                    valor: true,
                    tipoValor: 'BOOL',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(expresion.tipo === 'CHAR') {
                let obj = {
                    valor: '0',
                    tipoValor: 'CHAR',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(expresion.tipo === 'CADENA') {
                let obj = {
                    valor: "",
                    tipoValor: 'CADENA',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            }
        } else {
            expresion.valor = Expresion(expresion.valor)
        }
        expresion.ids.forEach(id => {
            if (this.tabla[id] === undefined) {
                this.tabla[id] = { tipo: expresion.tipo, valor: expresion.valor };
            } else {
                console.error(`La variable ${id} ya está declarada, cambiando su valor...`);
                this.tabla[id].valor = expresion.valor;
            }
        });
        console.log("SE TEMRINO DE DECLARAR LA VARIABLE--------------------")
        return null;
    }

    deleteVariable(id) {
        if (this.tabla[id] !== undefined) {
            delete this.tabla[id];
            console.log(`La variable ${id} ha sido eliminada correctamente.`);
        } else {
            console.error(`La variable ${id} no existe y por lo tanto no se puede eliminar.`);
        }
    }
    

    asignarValor(id, valor, linea, columna) {
        if (this.tabla[id] !== undefined) {
            this.tabla[id].valor = valor;
            return { tipo: 'asignacion', id, valor, linea, columna };
        } else {
            console.error(`La variable ${id} no está declarada.`);
        }
    }

    increasedecreaseValor(id, tipo, linea, columna) {
        if (this.tabla[id] !== undefined) {
            if (tipo === 'INCREASE'){
                this.tabla[id].valor.valor++;
                return { tipo: 'INCREMENTO', id, linea, columna };
            } else if (tipo === 'DECREASE'){
                this.tabla[id].valor.valor--;
                return { tipo: 'DECREMENTO', id, linea, columna };
            }
        } else {
            console.error(`La variable ${id} no está declarada.`);
        }
    }

    getValor(id) {
        if (this.tabla[id] !== undefined) {
            console.log("RETORNO ",this.tabla[id].valor)
            return this.tabla[id].valor;
        } else {
            console.error(`La variable ${id} no está declarada.`);
            return undefined;
        }
    } 
    
    // Arrays
    agregarArray(expresion){
        if (this.arrays[expresion.id] === undefined){
            // Arreglo de Una dimension
            if (!expresion.cuadrada){
                if (expresion.size !== null){
                    let array = [];
                    this.arrays[expresion.id] = { tipo: expresion.tipo, valor: array, limite: expresion.size.valor };
                } else {
                    let arraytemp = [];
                    let tipoValor = expresion.valor?.tipoOperacion ?? 'valor por defecto';
                    if (tipoValor === 'CSTR') {
                        expresion.valor = Expresion(expresion.valor);
                    }
                    expresion.valor.forEach(valor => {
                        let val = Expresion(valor)
                        arraytemp.push(val);
                    });
                    this.arrays[expresion.id] = {tipo: expresion.tipo, valor: arraytemp, limite: expresion.valor.length };
                }
            // Arreglo de Dos dimensiones
            } else {
                if (expresion.size !== null && expresion.size2 !== null) {
                    let arraytmp1 = [];
                    let arraytmp2 = [];
                    let array = [arraytmp1,arraytmp2];
                    this.arrays[expresion.id] = { tipo: expresion.tipo, valor: array, limite: expresion.size.valor, limite2: expresion.size2.valor};
                } else {
                    let arraytmp1 = [];
                    let arraytmp2 = [];
                    expresion.valor.forEach(valor => {
                        let val = Expresion(valor)
                        arraytmp1.push(val);
                    });
                    expresion.valores2.forEach(valor => {
                        let val = Expresion(valor)
                        arraytmp2.push(val);
                    });
                    let array = [arraytmp1,arraytmp2];
                    this.arrays[expresion.id] = { tipo: expresion.tipo, valor: array, limite1: arraytmp1.length, limite2: arraytmp2.length};
                }
            }
        } else {
            console.error(`El array ${expresion.id} ya está declarado`);
        }
        return null
    }

    getValorArray(id, p1, p2){
        console.log("----ENTRO A GET VALOR ARRAY-----")
        if (this.arrays[id] !== undefined){
            let array = this.arrays[id].valor
            console.log("p1: ",p1)
            console.log("p2: ",p2)
            console.log("Arreglo: \n",array)
            if (p2 === null){
                if (p1.tipoValor === 'ID' || p1.tipoValor === 'ARRAY') {
                    const opValor1 = Expresion(p1);
                    let n1 = Expresion(opValor1);
                    return array[n1.valor]
                }
                return array[p1.valor]
            } else {
                if((p1.tipoValor === 'ID' || p1.tipoValor === 'ARRAY') && (p2.tipoValor === 'ID' || p2.tipoValor === 'ARRAY')){
                    const opValor1 = Expresion(p1);
                    let n1 = Expresion(opValor1);
                    const opValor2 = Expresion(p2);
                    let n2 = Expresion(opValor2);
                    return array[n1.valor][n2.valor]
                }
                else if (p1.tipoValor === 'ID' || p1.tipoValor === 'ARRAY') {
                    const opValor1 = Expresion(p1);
                    let n1 = Expresion(opValor1);
                    return array[n1.valor][p2.valor]
                }
                else if (p2.tipoValor === 'ID' || p2.tipoValor === 'ARRAY') {
                    const opValor2 = Expresion(p2);
                    let n2 = Expresion(opValor2);
                    return array[p1.valor][n2.valor]
                }
                return array[p1.valor][p2.valor]
            }
        }
        return null
    }

    getArrayId(id){
        if (this.arrays[id] !== undefined){
            let array = this.arrays[id].valor;
            return array;
        }
    }
    
    asignarValorArray(expresion){
        let tipoValor = expresion.valor?.tipoValor ?? 'valor por defecto';
        if (tipoValor === 'ID' || tipoValor === 'ARRAY') {
            expresion.valor = Expresion(expresion.valor);
        }
        if (this.arrays[expresion.id] !== undefined){
            if (expresion.pos2 === null){
                this.arrays[expresion.id].valor[expresion.pos1.valor] = expresion.valor
            } else {
                this.arrays[expresion.id].valor[expresion.pos1.valor][expresion.pos2.valor] = expresion.valor
            } 
        }
    }
    clear(){
        this.tabla = {};
        this.arrays = {};
        this.metodos = {};
    }

    existeVariable(id) {
        return this.tabla.hasOwnProperty(id);
    }

    existeArray(id) {
        return this.arrays.hasOwnProperty(id);
    }

    getTabla() {
        return this.tabla;
    }

    getArray(){
        return this.arrays;
    }

    // Guardado de Metodos y Funciones

    agregarMetodo(id, instrucciones, parametros){
        if (this.metodos[id] === undefined) {
            this.metodos[id] = { instrucciones: instrucciones, parametros: parametros };
            console.log("Metodo Guardado")
        } else {
            console.error(`El metodo ${id} ya ha sido declarado`);
        }
    }

    getMetodo(id){
        if (this.metodos[id] !== undefined){
            return this.metodos[id]
        } else {
            console.error(`El metodo ${id} no ha sido declarado`)
            return undefined
        }
    }

    //Variables Auxiliares para metodos

    agregarVariableAux(expresion) {
        console.log("Variable aux, ",expresion)
        if(expresion.valor === null){
            if(expresion.tipo === 'ENTERO'){
                let obj = {
                    valor: 0,
                    tipoValor: 'ENTERO',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(expresion.tipo === 'DOUBLE'){
                let obj = {
                    valor: 0.0,
                    tipoValor: 'DOUBLE',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(expresion.tipo === 'BOOL') {
                let obj = {
                    valor: true,
                    tipoValor: 'BOOL',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(expresion.tipo === 'CHAR') {
                let obj = {
                    valor: '0',
                    tipoValor: 'CHAR',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(expresion.tipo === 'CADENA') {
                let obj = {
                    valor: "",
                    tipoValor: 'CADENA',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            }
        } else {
            expresion.valor = Expresion(expresion.valor)
        }
        if (this.tabla[expresion.ids] === undefined) {
            this.tabla[expresion.ids] = { tipo: expresion.tipo, valor: expresion.valor };
        } else {
            console.error(`La variable ${expresion.ids} ya está declarada, cambiando su valor...`);
            console.log("antes ",this.tabla[expresion.ids].valor)
            this.tabla[expresion.ids].valor = expresion.valor;
            console.log("despues ",this.tabla[expresion.ids].valor)
        }
        console.log("SE TEMRINO DE DECLARAR LA VARIABLE--------------------")
        return null;
    }
}

module.exports = TablaSimbolos