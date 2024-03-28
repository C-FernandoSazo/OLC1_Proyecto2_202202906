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

"int"                   return 'INT';
"double"                return 'DOUBLE';
"bool"                  return 'BOOL';
"char"                  return 'CHAR';
"std::string"           return 'STD';
"="                     return 'IGUAL';
";"                     return 'PUNTOYCOMA';

([a-zA-Z])[a-zA-Z0-9_]* return 'ID';    //Nombre de variables
[0-9]+("."[0-9]+)\b     return 'DECIMAL';
[0-9]+\b                return 'ENTERO';

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
<string>["]             { yytext = cadena; this.popState(); return 'cadena'; }

<<EOF>>                 return 'EOF';

.		 {  errores.push({tipo: "Lexico", error: yytext, linea: yylloc.first_line, columna : yylloc.first_column+1})    }

// Finaliza parte de Léxica
/lex

//Presedencia

%start init 

%%

init : entrada EOF  { console.log("Entrada procesada con éxito."); return $1; }
    | error EOF     { console.log("Error al procesar la entrada."); }
;    

entrada : entrada sentencia { $1.push($2); $$=$1; }
        | sentencia         { $$=[$1]; }
;

sentencia : declaracion_variable PUNTOYCOMA    { $$ = $2; }
;

declaracion_variable : tipo ID IGUAL valor { $$ = {tipo: $1, id: $2, valor: $4}; console.log("Variable declarada:", $2, "=", $4); }
;

tipo
    : INT  { $$ = 'int'; }
    | DOUBLE { $$ = 'double'; }
    | BOOL { $$ = 'bool'; }
    | CHAR { $$ = 'char'; }
    | STD { $$ = 'std::string'; }
;

valor
    : ENTERO { $$ = {tipo: 'entero', valor: $1}; }
    | DECIMAL { $$ = {tipo: 'decimal', valor: $1}; }
    | CADENA { $$ = {tipo: 'cadena', valor: $1}; }
;