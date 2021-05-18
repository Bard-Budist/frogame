# Prueba Tecnica SoluNova

# Frogamer Backend

Resumen de la prueba:

- Implementar endpoint HTTP: POST /api/users para la persistencia de usuarios.
- Implementar endpoint HTTP: POST /api/login para obtener un JWT si el usuario existe y
las credenciales son válidas.
- Implementar endpoint HTTP: GET /api/users que requiera autenticación mediante JWT.
Utilizar identificador público único extraído del JWT para filtrar por el usuario requerido.

## Tecnologias utilizadas

- Nodejs
- ExpressJs
- JWT
- Cloud.mongodb for database

## Estructura del proyecto

![image](https://user-images.githubusercontent.com/44384347/118600804-18ccd380-b777-11eb-899c-dd23a7b92883.png)


- `db` Conexion con MongoDB
- `jwt` Metodos asociados a JWT
- `routes` Desarrollo de los endpoints
- `services` Desarrollo de servicio, como operacion en DB y algunas validaciones

## Variables de entorno

Variables configuradas en el archivo  `.env` en la carpeta root del proyecto

- `URL_MONGO` -> Mongo URI
- `MONGO_USER` -> Usuario de autenticacion de mongo
- `MONGO_PASSWORD` -> Contraseña Mongo db
- `DB_NAME` -> Nombre de la base de datos
- `SECRET_KEY` -> Clave secreta de bcrypt
- `PORT` -> Puerto en que corre el servidor

