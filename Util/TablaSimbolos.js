class TablaSimbolos {
    constructor() {
        this.tabla = {};
    }

    agregarVariable(tipo, ids, valor = 0, linea, columna) {
        let declaraciones = [];
        if(valor === 0){
            if(tipo === 'DOUBLE'){
                valor = 0.0;
            } else if(tipo === 'BOOL') {
                valor = true;
            } else if(tipo === 'CHAR') {
                valor = '0';
            } else if(tipo === 'CADENA') {
                valor = "";
            }
        }
        ids.forEach(id => {
            if (this.tabla[id] === undefined) {
                this.tabla[id] = { tipo: tipo, valor: valor };
                declaraciones.push({ tipo: 'declaracion', id, valor, linea, columna });
            } else {
                console.error(`La variable ${id} ya está declarada.`);
            }
        });
        return declaraciones;
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

    obtenerValor(id) {
        if (this.tabla[id] !== undefined) {
            return this.tabla[id].valor;
        } else {
            console.error(`La variable ${id} no está declarada.`);
            return undefined;
        }
    }   
}