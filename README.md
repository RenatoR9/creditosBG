en el caso de ejecutar los mismos comando debe crear una base de datos en sql server version 20 con el nombre de SolicitudCreditoBG y ejecutar el script de las tablas
luego ejecutar el insert de datos

Dependencias e indicaciones
FRONT
1. instalar node.js
2. instalar npm install -g @angular/cli
3. crear proyecto angular ng new créditos
4. instalar Bootstrap npm install Bootstrap
5.instalar npm install sweetalert2
6. instalar npm install jwt-decode

BACK
1. crear nuevo proyecto
2. escoger la opcion de asp.net core web api
3. configurar ubicacion y nombre del proyecto
4. escoger la version de .net en este caso 8
5. configurar en administrador de paquetes nuget
6. agregar Microsoft.EntityFrameworkCore.SqlServer, Microsoft.EntityFrameworkCore.Tools
7. configurar el DbContext donde van todas las entidades
8. configurar el program.cs  declarar el DbContext
9. agregar la cadena de conexion en appsettings.json
10. una vez creadas todas las entidades necesarias crear las migraciones necesarias con Add-Migration y luegro actualizar la base de datos con Update-Database
11. en este caso se creo las tablas en slq server con un script y luego por medio del comando (Scaffold-DbContext "server=serverName;database=dabatseName;trusted_connection=true;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models)
12. se adjunta el script dentro del repositorio llamado tables y un script de ingreso de datos para los tipos de usuarios
13. para el jwt se instalo con el siguiente comando para la version 8 de .net  (dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.5)
