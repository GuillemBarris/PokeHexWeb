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


