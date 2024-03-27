%{
    // Importar librerías y variables
        var cadena = '';
        var errores = [];
%}
%lex // Inicia parte léxica

%options case-insensitive
%x string

// Familia lexica
%%

\s+       //ignora espacios en blanco
/\/\/[^\n]*\n   //Comentario de una Linea
\/\*[\s\S]*?\*\/     //Coemtario Multilinea


[0-9]+("."[0-9]+)\b     return 'DOUBLE';
[0-9]+\b                return 'NUMBER';

"int"                  return 'INT';
"double"                 return 'DOUBLE';
"bool"               return '';
"true"                  return 'TRUE';
"false"                 return 'FALSE';

([a-zA-z])[a-zA-Z0-9_]* return 'ID';

// signos
"("                     return 'PARIZQ'
")"                     return 'PARDER'

"+"                     return 'MAS';
"-"                     return 'RES';
"*"                     return 'MUL';
"/"                     return 'DIV';
";"                     return 'PYC';
// Cadenas             "asdfasdfasf"
\"[^\"]*\"	{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }

<<EOF>>                 return 'EOF';

.		 {    console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);    }

// Finaliza parte de Léxica
/lex
