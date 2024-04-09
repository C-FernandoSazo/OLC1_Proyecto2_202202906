%{
    // Importar librerías y variables
        const Aritmetica = require("../Util/Aritmetica");
        const TablaSimbolos = require('../Util/TablaSimbolos');
        const OpTernario = require('../Util/Comparaciones/Ternario');
        var cadena = '';
        var errores = [];
        var textoConsola = 'Salida:\n';
        var tablaSimbolos = new TablaSimbolos();
%}
%lex // Inicia parte léxica

%options case-insensitive
%x character
%x string

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
"if"                    { return 'IF'; }
"else"                  { return 'ELSE'; }

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

[']                            { this.begin("character"); }
<character>\\x[0-9a-fA-F]{2}   { return 'CARACTER';}
<character>"\\n"               { return 'CARACTER'; }
<character>"\\t"               { return 'CARACTER'; }
<character>"\\r"               { return 'CARACTER'; }
<character>[^\\\']             { return 'CARACTER'; }
<character>\'                  { this.popState(); }

<<EOF>>                 return 'EOF';

.		 {  errores.push({tipo: "Lexico", error: 'El simbolo "'+yytext+'" no pertenece al lenguaje', linea: yylloc.first_line, columna : yylloc.first_column+1})  }

// Finaliza parte de Léxica
/lex

%{

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

    function sentenciaIf(condicion, bloque, elseblock=null) {
        let obj = {
            condicion: condicion,
            tipoOperacion: 'sent_if',
            bloque: bloque,
            elseblock: elseblock
        }
        return obj
    }

    function casteo(tipo, valor) {
        if (tipo === 'DOUBLE' && valor.tipoValor === 'ENTERO'){
            valor.valor = valor.valor + 0.0
            return valor;
        }
        else if (tipo === 'ENTERO' && valor.tipoValor === 'DOUBLE'){
            valor.valor = Math.round(valor.valor);
            return valor;
        }
        else if (tipo === 'STRING' && typeof valor == 'number'){
            valor.valor.toString();
            return valor;
        }
        else if (tipo === 'CHAR' && valor.tipoValor === 'ENTERO'){
            valor.valor = String.fromCharCode(valor.valor)
            return valor
        }
        else if (tipo === 'ENTERO' && valor.tipoValor === 'CHAR'){
            valor.valor = valor.valor.charCodeAt(0);
            return valor
        }
        else if (tipo === 'DOUBLE' && valor.tipoValor === 'CHAR'){
            valor.valor = valor.valor.charCodeAt(0) + 0.0;
            return valor
        }
        else {
            return undefined;
        }
    }

%}

//Presedencia
%right 'NOT'
%left 'OR'
%left 'AND'
%nonassoc INCOGNITA
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

init : entrada EOF  { console.log("Entrada procesada con éxito."); retorno = { instrucciones: $1, errores: errores, texto: textoConsola, tablaS: tablaSimbolos.obtenerTabla()  }; 
                        errores = []; textoConsola = "Salida:\n"; return retorno; }
;    

entrada : entrada sentencia { $1.push($2); $$=$1; }
        | sentencia         { $$=[$1]; }
;

sentencia : declaracion_variable PUNTOYCOMA    { $$ = $1; }
        | expresion PUNTOYCOMA              { $$ = $1; }
        | sent_if                           { $$ = $1; }
        | print PUNTOYCOMA
        | error PUNTOYCOMA    { console.log("Error al procesar la entrada."); 
    errores.push({tipo: "Sintactico", error: $1, linea: this._$.first_line, columna : this._$.first_column}); }
;

declaracion_variable
    : tipo lista_ids                          { $$ = tablaSimbolos.agregarVariable($1, $2, this._$.first_line, this._$.first_column); }
    | tipo lista_ids IGUAL expresion              { $$ = tablaSimbolos.agregarVariable($1, $2, this._$.first_line, this._$.first_column, $4); }
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

expresion : expresion SUMA expresion        { var result = Aritmetica(nuevaOpBinaria($1, $3, 'SUMA', this._$.first_line, this._$.first_column+1)) 
                                                $$ = nuevoValor(result.valor, result.tipoValor, this._$.first_line, this._$.first_column+1)}
            | expresion RES expresion       { var result = Aritmetica(nuevaOpBinaria($1, $3, 'RESTA', this._$.first_line, this._$.first_column+1)) 
                                                $$ = nuevoValor(result, 'ENTERO', this._$.first_line, this._$.first_column+1)}
            | expresion MULT expresion      { var result = Aritmetica(nuevaOpBinaria($1, $3, 'MULT', this._$.first_line, this._$.first_column+1)) 
                                                $$ = nuevoValor(result, 'ENTERO', this._$.first_line, this._$.first_column+1)}
            | expresion DIV expresion       { var result = Aritmetica(nuevaOpBinaria($1, $3, 'DIV', this._$.first_line, this._$.first_column+1)) 
                                                $$ = nuevoValor(result, 'ENTERO', this._$.first_line, this._$.first_column+1)}
            | expresion MOD expresion       { var result = Aritmetica(nuevaOpBinaria($1, $3, 'MOD', this._$.first_line, this._$.first_column+1)) 
                                                $$ = nuevoValor(result, 'ENTERO', this._$.first_line, this._$.first_column+1)}
            | POW OPENPAREN expresion COMA expresion CLOSEPAREN     { var result = Aritmetica(nuevaOpBinaria($3, $5, 'POW', this._$.first_line, this._$.first_column+1)) 
                                                $$ = nuevoValor(result, 'ENTERO', this._$.first_line, this._$.first_column+1)}
            | ID INCREASE           { $$ = tablaSimbolos.increasedecreaseValor($1, 'INCREASE', this._$.first_line, this._$.first_column+1) }
            | ID DECREASE           { $$ = tablaSimbolos.increasedecreaseValor($1, 'DECREASE', this._$.first_line, this._$.first_column+1) }
            | OPENPAREN tipo CLOSEPAREN expresion  { $$ = casteo($2,$4); }
            | op_relacional     { $$ = $1; }
            | op_logicos        { $$ = $1; }
            | valor             { $$ = $1; }
;

op_relacional
            : expresion ORIGUAL expresion       { $$ = nuevaOpBinaria($1, $3, 'IGUALACION', this._$.first_line, this._$.first_column+1) } 
            | expresion ORDIF expresion         { $$ = nuevaOpBinaria($1, $3, 'DIF', this._$.first_line, this._$.first_column+1) } 
            | expresion ORMENOR expresion       { $$ = nuevaOpBinaria($1, $3, 'MENORQUE', this._$.first_line, this._$.first_column+1) } 
            | expresion ORMENORIGUAL expresion  { $$ = nuevaOpBinaria($1, $3, 'MENORIGUALQUE', this._$.first_line, this._$.first_column+1) } 
            | expresion ORMAYOR expresion       { $$ = nuevaOpBinaria($1, $3, 'MAYORQUE', this._$.first_line, this._$.first_column+1) } 
            | expresion ORMAYORIGUAL expresion  { $$ = nuevaOpBinaria($1, $3, 'MAYORIGUALQUE', this._$.first_line, this._$.first_column+1) } 
            | expresion INCOGNITA expresion PUNTOS expresion  { var result = OpTernario(nuevaOpTernaria($1, $3, $5, 'IFSHORT', this._$.first_line, this._$.first_column+1)) 
                                                                $$ = nuevoValor(result.valor, result.tipo, this._$.first_line, this._$.first_column+1)}
;

op_logicos
        : expresion AND expresion   { $$ = nuevaOpBinaria($1, $3, 'AND', this._$.first_line, this._$.first_column+1) } 
        | expresion OR expresion    { $$ = nuevaOpBinaria($1, $3, 'OR', this._$.first_line, this._$.first_column+1) } 
        | NOT expresion             { $$ = nuevaOpBinaria($2, null, 'NOT', this._$.first_line, this._$.first_column+1) }
;

print:  COUT ASIGN expresion             { textoConsola += $3.valor; }
        | COUT ASIGN expresion ASIGN ENDL   { textoConsola += $3.valor+'\n'; }
;

//Bloque de instrucciones
bloque: OPENLLAVE entrada CLOSELLAVE    { $$ = $2; }
        | OPENLLAVE CLOSELLAVE          { $$ = []; }
;

sent_if: IF OPENPAREN expresion CLOSEPAREN bloque                   { $$ = sentenciaIf($3, $5) }
        | IF OPENPAREN expresion CLOSEPAREN bloque ELSE bloque      { $$ = sentenciaIf($3, $5, $7) }
        | IF OPENPAREN expresion CLOSEPAREN bloque ELSE sent_if     { $$ = sentenciaIf($3, $5, $7) }
;

valor
    : ENTERO        { $$ = nuevoValor($1, 'ENTERO', this._$.first_line, this._$.first_column+1) }
    | DECIMAL       { $$ = nuevoValor($1, 'DOUBLE', this._$.first_line, this._$.first_column+1) }
    | CADENA        { $$ = nuevoValor($1, 'CADENA', this._$.first_line, this._$.first_column+1) }
    | CARACTER      { $$ = nuevoValor($1, 'CHAR', this._$.first_line, this._$.first_column+1) }
    | booleano      { $$ = nuevoValor($1, 'BOOL', this._$.first_line, this._$.first_column+1) }
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