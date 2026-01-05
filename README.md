# ??? - Backend
* Juan Esteban Garzón Luján
* Clan: Linus (Ubuntu)

## Description.


## Prerequisites.

- Node.js >= 18.x
- PostgreSQL

## Installation.

1. Clone the repository:

    ```bash
    git clone https://github.com/EsstebanG/employability_assessment
    ```

2. Open the folder with Visual Studio Code and install the dependencies:

    ```bash
    npm install
    ```

3. Configure the environment variables according to your data in the `.env` file located in the project root directory:

    ```env
    # Server.
    NODE_ENV=development 
    PORT=3000

    # Database.
    DB_HOST=your_host (localhost)
    DB_PORT=your_port (5432)
    DB_USER=your_postgres_user (postgres)
    DB_PASSWORD=your_user_password
    DB_NAME=your_db_name

    # JWT.
    JWT_SECRET=super_secret_jwt_key
    JWT_EXPIRES_IN=3600s

    # Refresh Token
    JWT_REFRESH_SECRET=super_secret_refresh_key
    ```

4. Run the migrations (if there are none):

   ```bash
   npm run migration:run
   ```

5. Run the project:

    ```bash
    npm run start:dev
    ```