%{
    // Importar librerías y variables
        var cadena = '';
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
"std::toString"         { return 'STS'; }
"="                     { return 'IGUAL'; }
":"                     { return 'PUNTOS' }
"true"                  { return 'TRUE'; }
"false"                 { return 'FALSE'; }
","                     { return 'COMA'; }
"."                     { return 'PUNTO'; }
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
"["                     { return 'OPENCORCHETE'; }
"]"                     { return 'CLOSECORCHETE'; }
"?"                     { return 'INCOGNITA'; }
"cout"                  { return 'COUT'; }
"endl"                  { return 'ENDL'; }
"if"                    { return 'IF'; }
"else"                  { return 'ELSE'; }
"new"                   { return 'NEW'; }
"switch"                { return 'SWITCH'; }
"case"                  { return 'CASE'; }
"default"               { return 'DEFAULT'; }
"break"                 { return 'BREAK'; }
"continue"              { return 'CONTINUE'; }
"return"                { return 'RETURN'; }
"tolower"               { return 'TOLOWER'; }
"toupper"               { return 'TOUPPER'; }
"round"                 { return 'ROUND'; }
"length"                { return 'LENGTH'; }
"typeof"                { return 'TYPEOF'; }
"c_str"                 { return 'CSTR'; }
"do"                    { return 'DO'; }
"while"                 { return 'WHILE'; }
"for"                   { return 'FOR'; }
"void"                  { return 'VOID'; }
"execute"                { return 'EXECUTE'; }

// Expresiones Regulares
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

[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?[']	        { yytext=yytext.substr(1, yyleng-2); return 'CARACTER' }

<<EOF>>                 return 'EOF';

.		 {  global.reportes.agregarError({tipo: "Lexico", error: 'El simbolo "'+yytext+'" no pertenece al lenguaje', linea: yylloc.first_line, columna : yylloc.first_column+1})  }

// Finaliza parte de Léxica
/lex

%{

    function nuevoValor(valor, tipoValor, linea, columna, pos1=null, pos2=null) {
        let obj = {
            valor: valor,
            tipoValor: tipoValor,
            linea: linea,
            columna: columna,
            pos1: pos1,
            pos2: pos2
        }
        return obj;
    }

    function asignarValor(id, valor) {
        let obj = {
            id: id,
            valor: valor,
            tipoOperacion: "ASIGNACION"
        }
        return obj;
    }

    function nuevaOpUnit(valor,tipoOperacion,linea,columna,comodin=false){
        let obj = {
            valor: valor,
            tipoOperacion: tipoOperacion,
            comodin: comodin,
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

    function nuevaFunction(id, parametros, instrucciones, tipoOperacion, retorno){
        let obj = {
            id: id,
            parametros: parametros, 
            instrucciones: instrucciones,
            tipoOperacion: tipoOperacion,
            retorno: retorno
        }
        return obj;
    }

    function newCall(id, parametros, execute) {
        let obj = {
            id: id,
            parametros: parametros,
            tipoOperacion: "CALL",
            execute: execute
        }
        return obj;
    }

    function sentenciaControl(condicion, tipoOperacion, bloque, elseblock=null) {
        let obj = {
            condicion: condicion,
            tipoOperacion: tipoOperacion,
            bloque: bloque,
            elseblock: elseblock
        }
        return obj;
    }

    function instance_var(ids, tipo, linea, columna, valor = null){
        let obj = {
            ids: ids,
            tipo: tipo,
            valor: valor,
            tipoOperacion: "declaracion_var",
            linea: linea,
            columna: columna
        }
        return obj
    }

    function instance_array(id, tipo, size, valores, size2, valores2, fila, columna, cuadrada){
        let obj = {
            id: id,
            tipo: tipo,
            size: size,
            valor: valores,
            size2: size2,
            valores2: valores2,
            tipoOperacion: 'declaracion_array',
            fila: fila,
            columna: columna,
            cuadrada: cuadrada
        }
        return obj;
    }

    function modify_array(id, valor, pos1, pos2=null){
        let obj = {
            id: id,
            valor: valor,
            tipoOperacion: 'modify_array',
            pos1: pos1,
            pos2: pos2
        }
        return obj;
    }

    function sent_while(condicion, instrucciones, tipoOperacion){
        let obj = {
            condicion: condicion,
            instrucciones: instrucciones,
            tipoOperacion: tipoOperacion
        }
        return obj;
    }

    function sent_for(declaracion, condicion, update, instrucciones){
        let obj = {
            declaracion: declaracion,
            condicion: condicion,
            update: update,
            tipoOperacion: 'sent_for',
            instrucciones: instrucciones
        }
        return obj;
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

init : entrada EOF  { console.log("Entrada procesada con éxito."); retorno = { instrucciones: $1 }; return retorno; }
;    

entrada : entrada sentencia { $1.push($2); $$=$1; }
        | sentencia         { $$=[$1]; }
;

sentencia : declaracion_functions              { $$ = $1; }
        | declaracion_variable PUNTOYCOMA      { $$ = $1; }
        | declaracion_array PUNTOYCOMA         { $$ = $1; }
        | expresion PUNTOYCOMA                 { $$ = $1; }
        | sent_transf PUNTOYCOMA               { $$ = $1; }
        | sent_if                              { $$ = $1; }
        | sent_switch                          { $$ = $1; }
        | sent_while                           { $$ = $1; }
        | sent_for                             { $$ = $1; }
        | sent_dowhile PUNTOYCOMA              { $$ = $1; }
        | print PUNTOYCOMA                     { $$ = $1; }
        | ID IGUAL expresion PUNTOYCOMA        { $$ = asignarValor($1, $3); }
        | EXECUTE llamada PUNTOYCOMA           { $2.execute = true; $$ = $2; }
        | error PUNTOYCOMA    { console.log("Error al procesar la entrada."); 
    global.reportes.agregarError({tipo: "Sintactico", error: $1, linea: this._$.first_line, columna : this._$.first_column}); }
;

declaracion_variable
    : tipo lista_ids                          { $$ = instance_var($2, $1, this._$.first_line, this._$.first_column+1); }
    | tipo lista_ids IGUAL expresion              { $$ = instance_var($2, $1, this._$.first_line, this._$.first_column+1, $4); }
;

lista_ids
    : lista_ids COMA ID                       { $1.push($3); $$ = $1; }
    | ID                                      { $$ = [$1]; }
;

declaracion_array
    : tipo ID OPENCORCHETE CLOSECORCHETE IGUAL NEW tipo OPENCORCHETE expresion CLOSECORCHETE {
        $$ = instance_array($2, $1, $9, null, null, null, this._$.first_line, this._$.first_column+1, false);
    }
    | tipo ID OPENCORCHETE CLOSECORCHETE IGUAL native_function {
        $$ = instance_array($2, $1, null, $6, null, null, this._$.first_line, this._$.first_column+1, false);
    }
    | tipo ID OPENCORCHETE CLOSECORCHETE OPENCORCHETE CLOSECORCHETE IGUAL NEW tipo OPENCORCHETE expresion CLOSECORCHETE OPENCORCHETE expresion CLOSECORCHETE {
        $$ = instance_array($2, $1, $11, null, $14, null, this._$.first_line, this._$.first_column+1, true);
    }
    | tipo ID OPENCORCHETE CLOSECORCHETE IGUAL OPENCORCHETE lista_values CLOSECORCHETE {
        $$ = instance_array($2, $1, null, $7, null, null, this._$.first_line, this._$.first_column+1, false);
    }
    | tipo ID OPENCORCHETE CLOSECORCHETE OPENCORCHETE CLOSECORCHETE IGUAL OPENCORCHETE OPENCORCHETE lista_values CLOSECORCHETE COMA OPENCORCHETE lista_values CLOSECORCHETE CLOSECORCHETE {
        $$ = instance_array($2, $1, null, $10, null, $14, this._$.first_line, this._$.first_column+1, true);
    }
    // Operaciones sobre arrays
    | ID OPENCORCHETE expresion CLOSECORCHETE IGUAL expresion   { $$ = modify_array($1, $6, $3) }
    | ID OPENCORCHETE expresion CLOSECORCHETE OPENCORCHETE expresion CLOSECORCHETE IGUAL expresion  { $$ = modify_array($1, $9, $3, $6) }
;

declaracion_functions: VOID ID OPENPAREN parametros CLOSEPAREN bloque   { $$ = nuevaFunction($2, $4, $6, "METODO", null) }
                    | VOID ID OPENPAREN CLOSEPAREN bloque   { $$ = nuevaFunction($2, null, $5, "METODO", null) }
                    | tipo ID OPENPAREN parametros CLOSEPAREN bloque { $$ = nuevaFunction($2, $4, $6, "FUNCION", $1) }
                    | tipo ID OPENPAREN CLOSEPAREN bloque        { $$ = nuevaFunction($2, null, $5, "FUNCION", $1) }
;

parametros: parametros COMA comb_parametros      { $$ = $1.push($3); $$ = $1; }
            | comb_parametros                   { $$ = [$1]; }
;

comb_parametros: tipo ID OPENCORCHETE CLOSECORCHETE  { $$ = instance_array($2, $1, null, null, null, null, this._$.first_line, this._$.first_column+1, false); }
                | tipo ID           { $$ = instance_var([$2], $1, this._$.first_line, this._$.first_column+1); }  
;   

llamada: ID OPENPAREN lista_expresion CLOSEPAREN   { $$ = newCall($1, $3, false)}
        | ID OPENPAREN CLOSEPAREN               { $$ = newCall($1, null, false)}
;

tipo
    : INT       { $$ = 'ENTERO'; }
    | DOUBLE    { $$ = 'DOUBLE'; }
    | BOOL      { $$ = 'BOOL'; }
    | CHAR      { $$ = 'CHAR'; }
    | STD       { $$ = 'CADENA'; }
;

expresion : expresion SUMA expresion        { $$ = nuevaOpBinaria($1, $3, 'SUMA', this._$.first_line, this._$.first_column+1) }
            | expresion RES expresion       { $$ = nuevaOpBinaria($1, $3, 'RESTA', this._$.first_line, this._$.first_column+1) }
            | expresion MULT expresion      { $$ = nuevaOpBinaria($1, $3, 'MULT', this._$.first_line, this._$.first_column+1) }
            | expresion DIV expresion       { $$ = nuevaOpBinaria($1, $3, 'DIV', this._$.first_line, this._$.first_column+1) }
            | expresion MOD expresion       { $$ = nuevaOpBinaria($1, $3, 'MOD', this._$.first_line, this._$.first_column+1) }
            | RES expresion %prec umenos                { $$ = nuevaOpBinaria($1, null, 'NEGATIVO', this._$.first_line, this._$.first_column+1)}
            | POW OPENPAREN expresion COMA expresion CLOSEPAREN     { $$ = nuevaOpBinaria($1, $3, 'POW', this._$.first_line, this._$.first_column+1) }
            | OPENPAREN tipo CLOSEPAREN expresion  { $$ = nuevaOpUnit($4, 'CASTEO', this._$.first_line, this._$.first_column+1, $2) }
            | actualizacion     { $$ = $1; }
            | native_function   { $$ = $1; }
            | op_relacional     { $$ = $1; }
            | op_logicos        { $$ = $1; }
            | llamada           { $$ = $1; }
            | valor             { $$ = $1; }
;

lista_expresion : lista_expresion COMA expresion  { $1.push($3); $$ = $1; }
            | expresion     { $$ = [$1]; }
;

op_relacional
            : expresion ORIGUAL expresion       { $$ = nuevaOpBinaria($1, $3, 'IGUALACION', this._$.first_line, this._$.first_column+1) } 
            | expresion ORDIF expresion         { $$ = nuevaOpBinaria($1, $3, 'DIF', this._$.first_line, this._$.first_column+1) } 
            | expresion ORMENOR expresion       { $$ = nuevaOpBinaria($1, $3, 'MENORQUE', this._$.first_line, this._$.first_column+1) } 
            | expresion ORMENORIGUAL expresion  { $$ = nuevaOpBinaria($1, $3, 'MENORIGUALQUE', this._$.first_line, this._$.first_column+1) }   
            | expresion ORMAYOR expresion       { $$ = nuevaOpBinaria($1, $3, 'MAYORQUE', this._$.first_line, this._$.first_column+1) }  
            | expresion ORMAYORIGUAL expresion  { $$ = nuevaOpBinaria($1, $3, 'MAYORIGUALQUE', this._$.first_line, this._$.first_column+1) } 
            | expresion INCOGNITA expresion PUNTOS expresion  { $$ = nuevaOpTernaria($1, $3, $5, 'IFSHORT', this._$.first_line, this._$.first_column+1) }
;

op_logicos
        : expresion AND expresion   { $$ = nuevaOpBinaria($1, $3, 'AND', this._$.first_line, this._$.first_column+1) } 
        | expresion OR expresion    { $$ = nuevaOpBinaria($1, $3, 'OR', this._$.first_line, this._$.first_column+1) } 
        | NOT expresion             { $$ = nuevaOpBinaria($2, null, 'NOT', this._$.first_line, this._$.first_column+1) }
;

print:  COUT ASIGN expresion             { $$ = nuevaOpUnit($3,'PRINT',this._$.first_line, this._$.first_column+1) }
        | COUT ASIGN expresion ASIGN ENDL   { $$ = nuevaOpUnit($3,'PRINT',this._$.first_line, this._$.first_column+1,true) }
;

//Bloque de instrucciones
bloque: OPENLLAVE entrada CLOSELLAVE    { $$ = $2; }
        | OPENLLAVE CLOSELLAVE          { $$ = []; }
;

sent_transf: BREAK       { $$ = nuevaOpUnit($1, 'BREAK', this._$.first_line, this._$.first_column+1) }
            | CONTINUE   { $$ = nuevaOpUnit($1, 'CONTINUE', this._$.first_line, this._$.first_column+1) }
            | RETURN     { $$ = nuevaOpUnit($1, 'RETURN', this._$.first_line, this._$.first_column+1) }
            | RETURN expresion  { $$ = nuevaOpUnit($1, 'RETURN', this._$.first_line, this._$.first_column+1, $2) }
;

sent_if: IF OPENPAREN expresion CLOSEPAREN bloque                   { $$ = sentenciaControl($3, 'sent_if', $5) }
        | IF OPENPAREN expresion CLOSEPAREN bloque ELSE bloque      { $$ = sentenciaControl($3, 'sent_if',$5, $7) }
        | IF OPENPAREN expresion CLOSEPAREN bloque ELSE sent_if     { $$ = sentenciaControl($3, 'sent_if',$5, $7) }
;

sent_switch: SWITCH OPENPAREN expresion CLOSEPAREN OPENLLAVE cases_list CLOSELLAVE              { $$ = sentenciaControl($3, 'sent_switch', $6)}
        | SWITCH OPENPAREN expresion CLOSEPAREN OPENLLAVE cases_list default_case CLOSELLAVE    { $$ = sentenciaControl($3, 'sent_switch', $6, $7) }
;

cases_list: cases_list case_statement { $1.push($2); $$ = $1; }
        | case_statement      { $$ = [$1]; }
;

case_statement: CASE expresion PUNTOS entrada                   { $$ = { case: $2, bloque: $4, breakval: false} }
            | CASE expresion PUNTOS entrada BREAK              { $$ = { case: $2, bloque: $4, breakval: true} }
;

default_case: DEFAULT PUNTOS entrada  { $$ = { case: 'DEFAULT', bloque: $3 } }
;

sent_while: WHILE OPENPAREN expresion CLOSEPAREN bloque    { $$ = sent_while($3, $5, 'sent_while') }
;

sent_dowhile: DO bloque WHILE OPENPAREN expresion CLOSEPAREN    { $$ = sent_while($5, $2, 'sent_dowhile') }
;

sent_for: FOR OPENPAREN declaracion_variable PUNTOYCOMA op_relacional PUNTOYCOMA actualizacion CLOSEPAREN bloque  { $$ = sent_for($3, $5, $7, $9) }
;

actualizacion: ID INCREASE                  { $$ = nuevaOpUnit($1, 'INCREASE', this._$.first_line, this._$.first_column+1) }
            | ID DECREASE                   { $$ = nuevaOpUnit($1, 'DECREASE', this._$.first_line, this._$.first_column+1) }
;

native_function: TOLOWER OPENPAREN expresion CLOSEPAREN     { $$ = nuevaOpUnit($3, 'TOLOWER', this._$.first_line, this._$.first_column+1) }
                | TOUPPER OPENPAREN expresion CLOSEPAREN    { $$ = nuevaOpUnit($3, 'TOUPPER', this._$.first_line, this._$.first_column+1) }
                | ROUND OPENPAREN expresion CLOSEPAREN      { $$ = nuevaOpUnit($3, 'ROUND', this._$.first_line, this._$.first_column+1) }
                | valor PUNTO LENGTH OPENPAREN CLOSEPAREN   { $$ = nuevaOpUnit($1, 'LENGTH', this._$.first_line, this._$.first_column+1) }
                | TYPEOF OPENPAREN expresion CLOSEPAREN     { $$ = nuevaOpUnit($3, 'TYPEOF', this._$.first_line, this._$.first_column+1) }
                | STS OPENPAREN expresion CLOSEPAREN        { $$ = nuevaOpUnit($3, 'TOSTRING', this._$.first_line, this._$.first_column+1) }
                | valor PUNTO CSTR OPENPAREN CLOSEPAREN     { $$ = nuevaOpUnit($1, 'CSTR', this._$.first_line, this._$.first_column+1) }
;

valor
    : ENTERO        { $$ = nuevoValor($1, 'ENTERO', this._$.first_line, this._$.first_column+1) }
    | DECIMAL       { $$ = nuevoValor($1, 'DOUBLE', this._$.first_line, this._$.first_column+1) }
    | CADENA        { $$ = nuevoValor($1, 'CADENA', this._$.first_line, this._$.first_column+1) }
    | CARACTER      { $$ = nuevoValor($1, 'CHAR', this._$.first_line, this._$.first_column+1) }
    | booleano      { $$ = nuevoValor($1, 'BOOL', this._$.first_line, this._$.first_column+1) }
    | ID            { $$ = nuevoValor($1, 'ID', this._$.first_line, this._$.first_column+1) }
    | ID OPENCORCHETE expresion CLOSECORCHETE   { $$ = nuevoValor($1, 'ARRAY', this._$.first_line, this._$.first_column+1, $3) }
    | ID OPENCORCHETE expresion CLOSECORCHETE OPENCORCHETE expresion CLOSECORCHETE { $$ = nuevoValor($1, 'ARRAY', this._$.first_line, this._$.first_column+1, $3, $6)}
;

lista_values : lista_values COMA valor  { $1.push($3); $$ = $1; }
            | valor     { $$ = [$1]; }
;

booleano : TRUE     { $$ = true;   }
        | FALSE     { $$ = false;  }
;