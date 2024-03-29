%{
    // Importar librerías y variables
        var cadena = '';
        var errores = [];
        var tokens = [];
%}
%lex // Inicia parte léxica

%options case-insensitive
%x string
%x MULTILINE_COMMENT

// Tokens
%%

\s+         //ignora espacios en blanco
"//".*		{   }
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {   }

"int"                   { console.log('Token: INT'); return 'INT'; }
"double"                { console.log('Token: DOUBLE'); return 'DOUBLE'; }
"bool"                  { console.log('Token: BOOL'); return 'BOOL'; }
"char"                  { console.log('Token: CHAR'); return 'CHAR'; }
"std::string"           { console.log('Token: STD'); return 'STD'; }
"="                     { console.log('Token: IGUAL'); return 'IGUAL'; }
"true"                  { console.log('Token: TRUE'); return 'TRUE'; }
"false"                 { console.log('Token: FALSE'); return 'FALSE'; }
";"                     { console.log('Token: PUNTOYCOMA'); return 'PUNTOYCOMA'; }
"+"                     return 'SUMA';
"-"                     return 'RES';
"*"                     return 'MULT';
"/"                     return 'DIV';

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

<<EOF>>                 return 'EOF';

.		 {  errores.push({tipo: "Lexico", error: yytext, linea: yylloc.first_line, columna : yylloc.first_column+1})    }

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

%}

//Presedencia
%left 'SUMA' 'RES'
%left 'MULT' 'DIV'

%start init 

%%

init : entrada EOF  { console.log("Entrada procesada con éxito."); retorno = { instrucciones: $1, errores: errores }; errores = []; return retorno; }
    | error EOF     { console.log("Error al procesar la entrada."); }
;    

entrada : entrada sentencia { $1.push($2); $$=$1; }
        | sentencia         { $$=[$1]; }
;

sentencia : declaracion_variable PUNTOYCOMA    { $$ = $1; }
        | op_artimetica PUNTOYCOMA             { $$ = $1; }
;

declaracion_variable : tipo ID IGUAL valor { $$ = {tipo: $1, id: $2, valor: $4}; console.log("Variable declarada:", $2, "=", $4); }
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
;

valor
    : ENTERO        { $$ = nuevoValor($1, 'ENTERO', this._$.first_line, this._$.first_column+1) }
    | DECIMAL       { $$ = nuevoValor($1, 'DOUBLE', this._$.first_line, this._$.first_column+1) }
    | CADENA        { $$ = nuevoValor($1, 'CADENA', this._$.first_line, this._$.first_column+1) }
    | booleano      { $$ = nuevoValor($1, 'BOOL', this._$.first_line, this._$.first_column+1) }
    | op_artimetica { $$ = $1 }
;

booleano : TRUE     { $$ = true;   }
        | FALSE     { $$ = false;  }
;