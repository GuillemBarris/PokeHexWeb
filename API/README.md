# Configuració del Projecte al Servidor

## Instal·lar Dependencies

en el cmb o el powershell del teu ordinador utilizes aquesta comanda per instal·lar les dependencies

```bash
npm install bcrypt cors dotenv express jsonwebtoken mssql
```


## Archiu .env

Crees l'archiu .env i poses aquestes dades, cambia els valors depenent, de la base de dades a on la tinguis.

```bash
# Exemple .env
PORT=3000
DB_SERVER=localhost
JWT_SECRET=my_secret_key
USER=db_user
PASSWORD=db_password
DB_DATABASE=PokeHexDatabase
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

## Iniciar servidor 

```bash
npm run
```

# Crear Usuari (UserController.js UserRoutes.js)

## Ruta
```bash
 POST /api/v1/users/createUser/
 ```

## Body Request (JSON):
```json
{
  "name": "Ash",
  "email": "ash@example.com",
  "type": "trainer",
  "password": "pikachu123"
}
```
## Resposta d’èxit (HTTP 201):
```json
{
  "message": "User created successfully"
}
```
## Gestio d'errors:

### 400 Bad Request:

Falten camps obligatoris a la sol·licitud (ex: name, email, password).

```json
{ "message": "Missing required fields" }
```

### 409 Conflict:

L’email ja està registrat en la base de dades.

```json
{ "message": "Email already exists" }
```

### 500 Internal Server Error:

Error del servidor (ex: error de connexió a la base de dades, error en xifrar la contrasenya).

```json
{ "message": "Internal server error" }
```

# Obtenir Usuari per Email i Contrasenya (UserController.js UserRoutes.js)

## Ruta
```bash
GET /api/v1/users/getUserByEmail/:email/:password
```
### Paràmetres de la Ruta:

email: L'email de l'usuari que es vol obtenir.

password: La contrasenya de l'usuari que es vol obtenir

## Resposta d’èxit (HTTP 200):
```json
{
  "message": "User logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "trainer"
}
```

## Gestio d'Errors
### 400 Bad Request:
Falten camps obligatoris a la sol·licitud (ex: email, password).
```json
{ "message": "Missing required fields" }
```

### 401 Unauthorized:
La contrasenya proporcionada no és vàlida.

```json
{ "message": "Invalid password" }
```
### 404 Not Found:
No s'ha trobat cap usuari amb l'email proporcionat.
```json
{ "message": "User not found" }
```

### 500 Internal Server Error:
Error del servidor (ex: error de connexió a la base de dades, error en verificar la contrasenya).
```json
{ "message": "Internal server error" }
```
## Exemple de Sol·licitud:
```bash
GET /api/v1/users/getUserByEmail/ash@example.com/pikachu123
```
## Exemple de Resposta d’Èxit:
```json
{
  "message": "User logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "trainer"
}
```