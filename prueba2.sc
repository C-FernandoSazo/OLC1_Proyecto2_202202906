int entero = 147;
double num = 2.3;

cout<<entero+num<<endl;

int vacio;

if (entero>num) {
    int enteroif = 17;
    cout<<"Hola desde If";
    cout<<enteroif<<endl;
} else {
   int elseentero = 1;
   std::string car = "Hola desde ELSE";
   cout<<elseentero+car<<endl;
}

//Declaracion Vectores
 int vector1[]= new int[4]; 
 char vector2[][]= new char[4][4]; 
 std::string vector3[]= ["Hola","Mundo"]; 
 int vector4[][]= [ [1,2], [3,4] ];

vector3[0]="OLC1";

std::string cadena1 = vector3[0];
cout<<cadena1<<endl;

int conteo = 2;

while (conteo<10) {
cout<<"while"+conteo<<endl;
if(conteo > 7) {
  break;
}
conteo++;
}

if (1==1) {
 break;
}

cout<<"Salio del ciclo"<<endl;

for ( int i = 0; i<3; i++){ 
 cout<<"Ciclo for"<<endl;
 if(i==1){
  break;
}
}

vector3[1] = "COMPILADORES";

 do { 
  cout<<vector3[1]<<endl; 
  conteo++;
 } while (conteo<7);


std::string cadenaU = toupper("HOLaMundO");
std::string cadenaL = tolower("HOLaMundO");

cout<<cadenaU+" "+cadenaL;

double valor = round(15.51);

cout<<valor<<endl;

std::string vector[] = ["Hola", "Mundo"]; 
 std::string cadena = "compi1GANAMOS"; 
 int sizeVector = vector.length(); //Almacena 2 
 int sizeCadena = cadena.length(); //Almacena 6

cout<<sizeVector<<endl;
cout<<sizeCadena<<endl;

 cout<<typeof(5+5)<<endl;

 std::string var =std::toString(1+20+30); 
std::string var2=std::toString(true);

cout<<var<<endl;
cout<<var2<<endl;

std::string var1 = "compi1"; 
 char caracteres[] =  var1.c_str();

cout<<vector[0]<<endl;
cout<<caracteres[0]<<endl;
cout<<caracteres[1]<<endl;
cout<<caracteres[2]<<endl;
cout<<caracteres[3]<<endl;
cout<<caracteres[4]<<endl;
cout<<caracteres[5]<<endl;