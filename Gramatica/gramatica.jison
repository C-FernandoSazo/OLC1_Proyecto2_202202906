%{
    // Importar librerías y variables
        var cadena = '';
        var errores = [];
        var TablaSims = [];
        var textoConsola = 'Salida:\n';
%}
%lex // Inicia parte léxica

%options case-insensitive
%x character
%x string
%x MULTILINE_COMMENT

// Tokens
%%

\s+         //ignora espacios en blanco
"//".*		{   }
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {   }

"=="                    { console.log("ENTRO A DOBLE IGUAL"); return 'ORIGUAL'; }
"!="                    { return 'ORDIF'; }
"<="                    { return 'ORMENORIGUAL'; }
">="                    { return 'ORMAYORIGUAL'; }
"||"                    { return 'OR'; }
"&&"                    { return 'AND'; }
"!"                     { return 'NOT'; }
"<<"                    { return 'ASIGN'; }
"++"                    { return 'INCREASE'; }
"--"                    { return 'DECREASE'; }
"int"                   { return 'INT'; }
"double"                { return 'DOUBLE'; }
"bool"                  { return 'BOOL'; }
"char"                  { return 'CHAR'; }
"std::string"           { return 'STD'; }
"="                     { return 'IGUAL'; }
":"                     { return 'PUNTOS' }
"true"                  { return 'TRUE'; }
"false"                 { return 'FALSE'; }
","                     { return 'COMA'; }
";"                     { return 'PUNTOYCOMA'; }
"+"                     { return 'SUMA'; }
"-"                     { return 'RES'; }
"*"                     { return 'MULT'; }
"/"                     { return 'DIV'; }
"%"                     { return 'MOD'; }
"pow"                   { return 'POW'; }
"("                     { return 'OPENPAREN'; }
")"                     { return 'CLOSEPAREN'; }
"<"                     { return 'ORMENOR'; }
">"                     { return 'ORMAYOR'; }
"{"                     { return 'OPENLLAVE'; }
"}"                     { return 'CLOSELLAVE'; }
"?"                     { return 'INCOGNITA'; }
"cout"                  { return 'COUT'; }
"endl"                  { return 'ENDL'; }

([a-zA-Z])[a-zA-Z0-9_]* { console.log('Token: ID, Valor: ' + yytext); return 'ID'; }    //Nombre de variables
[0-9]+("."[0-9]+)\b     { console.log('Token: DECIMAL, Valor: ' + yytext); return 'DECIMAL'; }
[0-9]+\b                { console.log('Token: ENTERO, Valor: ' + yytext); return 'ENTERO'; }

// Expresion Cadena con caracteres especiales
["]                     { cadena = ''; this.begin("string"); }
<string>[^"\\]+         { cadena += yytext; }
<string>"\\\""          { cadena += "\""; }
<string>"\\n"           { cadena += "\n"; }
<string>\s              { cadena += " "; }
<string>"\\t"           { cadena += "\t"; }
<string>"\\\\"          { cadena += "\\"; }
<string>"\\\'"          { cadena += "\'"; }
<string>"\\r"           { cadena += "\r"; }
<string>["]             { yytext = cadena; this.popState(); console.log('Token: CADENA, Valor: ' + yytext); return 'CADENA'; }

[']                         { cadena = ''; this.begin("character"); }
<character>([^'\\]|\\.)     { cadena = yytext;}
<character>[']              { yytext = cadena; this.popState(); console.log('Token: CHAR, Valor: ' + yytext); return 'CARACTER'; }

<<EOF>>                 return 'EOF';

.		 {  errores.push({tipo: "Lexico", error: 'El simbolo "'+yytext+'" no pertenece al lenguaje', linea: yylloc.first_line, columna : yylloc.first_column+1})  }

// Finaliza parte de Léxica
/lex

%{
    var tablaSimbolos = {};

    function nuevoValor(valor, tipoValor, linea, columna) {
        let obj = {
            valor: valor,
            tipoValor: tipoValor,
            linea: linea,
            columna: columna
        }
        return obj;
    }

    function nuevaOpBinaria(valor1, valor2, tipoOperacion, linea, columna) {
        let obj = {
            valor1: valor1,
            valor2: valor2,
            tipoOperacion: tipoOperacion,
            linea: linea,
            columna: columna
        }
        return obj;
    }

    function nuevaOpTernaria(condicion, expresion1, expresion2, tipoOperacion, linea, columna) {
        let obj = {
            condicion: condicion,
            expresion1: expresion1,
            expresion2: expresion2,
            tipoOperacion: tipoOperacion,
            linea: linea,
            columna: columna
        }
        return obj;
    }

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

    var tablaSimbolos = new TablaSimbolos();
%}

//Presedencia
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'ORIGUAL', 'ORDIF', 'ORMENOR', 'ORMENORIGUAL', 'ORMAYOR', 'ORMAYORIGUAL'
%left 'SUMA' 'RES'
%left 'MULT' 'DIV'
%left 'MOD'
%left 'INCREASE', 'DECREASE'
%nonassoc 'POW'
%right umenos
%left 'OPENPAREN'

%start init 

%%

init : entrada EOF  { console.log("Entrada procesada con éxito."); retorno = { instrucciones: $1, errores: errores, texto: textoConsola }; errores = []; textoConsola = "Salida:\n"; return retorno; }
;    

entrada : entrada sentencia { $1.push($2); $$=$1; }
        | sentencia         { $$=[$1]; }
;

sentencia : declaracion_variable PUNTOYCOMA    { $$ = $1; }
        | op_artimetica PUNTOYCOMA             { $$ = $1; }
        | op_relacional PUNTOYCOMA             { $$ = $1; }
        | fun_cout PUNTOYCOMA
        | error PUNTOYCOMA    { console.log("Error al procesar la entrada."); 
    errores.push({tipo: "Sintactico", error: $1, linea: this._$.first_line, columna : this._$.first_column}); }
;

declaracion_variable
    : tipo lista_ids                          { $$ = tablaSimbolos.agregarVariable($1, $2, this._$.first_line, this._$.first_column); }
    | tipo lista_ids IGUAL valor              { $$ = tablaSimbolos.agregarVariable($1, $2, $4, this._$.first_line, this._$.first_column); }
;

lista_ids
    : lista_ids COMA ID                       { $1.push($3); $$ = $1; }
    | ID                                      { $$ = [$1]; }
;

tipo
    : INT  { $$ = 'ENTERO'; }
    | DOUBLE { $$ = 'DOUBLE'; }
    | BOOL { $$ = 'BOOL'; }
    | CHAR { $$ = 'CHAR'; }
    | STD { $$ = 'CADENA'; }
;

op_artimetica : valor SUMA valor    { $$ = nuevaOpBinaria($1, $3, 'SUMA', this._$.first_line, this._$.first_column+1) }
            | valor RES valor       { $$ = nuevaOpBinaria($1, $3, 'RESTA', this._$.first_line, this._$.first_column+1) }
            | valor MULT valor      { $$ = nuevaOpBinaria($1, $3, 'MULT', this._$.first_line, this._$.first_column+1) }
            | valor DIV valor       { $$ = nuevaOpBinaria($1, $3, 'DIV', this._$.first_line, this._$.first_column+1) }
            | valor MOD valor       { $$ = nuevaOpBinaria($1, $3, 'MOD', this._$.first_line, this._$.first_column+1) }
            | POW OPENPAREN valor COMA valor CLOSEPAREN     { $$ = nuevaOpBinaria($3, $5, 'POW', this._$.first_line, this._$.first_column+1) }
            | ID INCREASE      { $$ = tablaSimbolos.increasedecreaseValor($1, 'INCREASE', this._$.first_line, this._$.first_column+1) }
            | ID DECREASE     { $$ = tablaSimbolos.increasedecreaseValor($1, 'DECREASE', this._$.first_line, this._$.first_column+1) }
;

op_relacional: valor ORIGUAL valor      { $$ = nuevaOpBinaria($1, $3, 'IGUALACION', this._$.first_line, this._$.first_column+1) } 
            | valor ORDIF valor         { $$ = nuevaOpBinaria($1, $3, 'DIF', this._$.first_line, this._$.first_column+1) } 
            | valor ORMENOR valor       { $$ = nuevaOpBinaria($1, $3, 'MENORQUE', this._$.first_line, this._$.first_column+1) } 
            | valor ORMENORIGUAL valor  { $$ = nuevaOpBinaria($1, $3, 'MENORIGUALQUE', this._$.first_line, this._$.first_column+1) } 
            | valor ORMAYOR valor       { $$ = nuevaOpBinaria($1, $3, 'MAYORQUE', this._$.first_line, this._$.first_column+1) } 
            | valor ORMAYORIGUAL valor  { $$ = nuevaOpBinaria($1, $3, 'MAYORIGUALQUE', this._$.first_line, this._$.first_column+1) } 
            | op_relacional INCOGNITA valor PUNTOS valor  { $$ = nuevaOpTernaria($1, $3, $5, 'IFSHORT', this._$.first_line, this._$.first_column+1) }
;

fun_cout: COUT ASIGN valor              { textoConsola += $3.valor; }
        | COUT ASIGN valor ASIGN ENDL   { textoConsola += $3.valor+'\n'; }
;

valor
    : ENTERO        { $$ = nuevoValor($1, 'ENTERO', this._$.first_line, this._$.first_column+1) }
    | DECIMAL       { $$ = nuevoValor($1, 'DOUBLE', this._$.first_line, this._$.first_column+1) }
    | CADENA        { $$ = nuevoValor($1, 'CADENA', this._$.first_line, this._$.first_column+1) }
    | CARACTER      { $$ = nuevoValor($1, 'CHAR', this._$.first_line, this._$.first_column+1) }
    | booleano      { $$ = nuevoValor($1, 'BOOL', this._$.first_line, this._$.first_column+1) }
    | op_artimetica { $$ = $1 }
    | ID {
        try {
            var variable = tablaSimbolos.obtenerValor($1);
            console.log(variable); 
            $$ = nuevoValor(variable.valor, variable.tipoValor, variable.linea, variable.columna)
        } catch (error) {
            console.error("Error al obtener la variable:", $1);
            errores.push({tipo: "Semantico", error: 'No existe la variable "' + $1 +'"', linea: this._$.first_line, columna : this._$.first_column}) 
            $$ = nuevoValor(null, null, this._$.first_line, );
        }
    }
;

booleano : TRUE     { $$ = true;   }
        | FALSE     { $$ = false;  }
;