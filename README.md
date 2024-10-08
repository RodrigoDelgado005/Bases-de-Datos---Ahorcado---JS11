# Bases-de-Datos---Ahorcado---JS11

Requisitos para el Proyecto "El Ahorcado"
1- Requisitos de Software
Para desarrollar y ejecutar el proyecto del juego "El Ahorcado", necesitaremos tener instalados los siguientes programas y herramientas:

Node.js: Debemos tener instalado la versión más reciente de Node.js, ya que es necesario para ejecutar el servidor backend y gestionar las dependencias del proyecto. Podemos encontrarlo en su pagina oficial

MySQL: Necesitaremos un servidor de base de datos MySQL para almacenar los puntajes de los jugadores, podemos instalar MySQL o utilizar herramientas como XAMPP que incluyen MySQL junto con un servidor web.

2- Conocimientos Necesarios
Para desallorar y utilizar este proyecto, debemos tener conocimientos sobre lo siguiente:

JavaScript: Conocimientos basicos-intermedios con la programación en JavaScript, tanto en el frontend (para desarrollar la lógica del juego y las interacciones del usuario) como en el backend (para gestionar las solicitudes y respuestas del servidor).

HTML y CSS: Conocimiento básico de HTML para desarrollar la estructura el contenido de la página web y CSS para aplicar los estilos para el juego.

Node.js y Express: Conocimientos sobre como funcionan Node.js y el framework Express para crear un servidor y manejar rutas y solicitudes HTTP.

MySQL: Conocimientos basicos sobre como utilizar las bases de datos MySQL, como la creación de tablas y realizar consultas, para guardar y obtener datos.

Uso de APIs: Conocimientos sobre el uso de APIs, ya que debemos realizar una conexion a una API para que el juego obtenga las palabras aleatorias.

Igualmente es importante aclarar que en caso de que no cumplamos con estos conocimientos, hay mucha informacion en blogs como tambien videos para poder solucionar problemas o ayudarnos con el desarrollo.

3- Instalación de Modulos Necesarios
Para que todo funcione correctamente, debemos instalar los modulos necesarios para el proyecto, lo cual podemos hacerlo ejecutando el siguiente comando en la terminal dentro de la carpeta del proyecto:

npm install express mysql body-parser cors

Esto instalará los módulos necesarios para que el servidor funcione correctamente.

4- Configuración de la Base de Datos
Debemos crear una base de datos en MySQL con el nombre que queramos y una tabla llamada scores o como tambien la queramos llamar, con la siguiente estructura:


CREATE TABLE scores (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(3) NOT NULL,

    puntos INT NOT NULL,

    tiempo INT NOT NULL,

    fecha DATETIME
);


Con esta base de datos podremos almacenar los puntajes de los usuarios.

Ya con esto podremos realizar y jugar al "Juego del Ahorcado"