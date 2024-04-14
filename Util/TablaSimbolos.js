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
            } else if(tipo === 'DOUBLE'){
                let obj = {
                    valor: 0.0,
                    tipoValor: 'DOUBLE',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(tipo === 'BOOL') {
                let obj = {
                    valor: true,
                    tipoValor: 'BOOL',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(tipo === 'CHAR') {
                let obj = {
                    valor: '0',
                    tipoValor: 'CHAR',
                    linea: expresion.linea,
                    columna: expresion.columna
                }
                expresion.valor = obj;
            } else if(tipo === 'CADENA') {
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
            this.tabla[id].valor.valor = valor;
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
                    let tipoValor = expresion.valores?.tipoOperacion ?? 'valor por defecto';
                    if (tipoValor === 'CSTR') {
                        expresion.valores = Expresion(expresion.valores);
                    }
                    expresion.valores.forEach(valor => {
                        arraytemp.push(valor);
                    });
                    this.arrays[expresion.id] = {tipo: expresion.tipo, valor: arraytemp, limite: expresion.valores.length };
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
                    expresion.valores.forEach(valor => {
                        arraytmp1.push(valor);
                    });
                    expresion.valores2.forEach(valor => {
                        arraytmp2.push(valor);
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
        if (this.arrays[id] !== undefined){
            let array = this.arrays[id].valor
            console.log("Arreglo: \n",array)
            if (p2 === null){
                return array[p1.valor]
            } else {
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
}

module.exports = TablaSimbolos