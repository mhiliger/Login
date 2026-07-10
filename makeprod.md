# Production Deployment Guide

This guide provides the steps to deploy the Login application to a production environment.

## I. Prerequisites

Before you begin, ensure you have the following:

*   A production server (e.g., a Linux VM) with `Node.js` and `npm` installed.
*   A PostgreSQL database server.
*   Access to a Google Cloud project with Secret Manager enabled.
*   SSL certificates for your domain.

---

## II. Backend Deployment (Login-BE)

### 1. Clone the Repository

Clone the repository to your production server:

```bash
git clone https://github.com/mhiliger/Login.git
cd Login
```

### 2. Install Dependencies

Install the production dependencies for the backend:

```bash
cd Login-BE
npm install --production
```

### 3. Configure Environment

The backend is configured using environment variables. You can either create a `.env` file in the `Login-BE` directory or set the environment variables directly on your server.

**Required Environment Variables:**

*   `DB_HOST`: The hostname of your PostgreSQL database.
*   `DB_PORT`: The port of your PostgreSQL database (defaults to 5432).
*   `DB_USER`: The username for your PostgreSQL database.
*   `DB_NAME`: The name of your PostgreSQL database (defaults to "SysAccess").
*   `REST_PORT`: The port for the backend server (defaults to 8080).

**Google Cloud Secret Manager:**

The backend uses Google Cloud Secret Manager to securely store sensitive information like database passwords and API keys. You will need to create the following secrets in your Google Cloud project:

*   `login-db-password`
*   `login-access-token`
*   `login-refresh-token`
*   `SSL-KEY-PATH`
*   `SSL-CERT-PATH`
*   `SSL-CHAIN-PATH`
*   `RESEND_API_KEY`
*   `login-internal-key`

Ensure that your production server has the necessary IAM permissions to access these secrets.

### 4. Run Database Migrations

The database needs to be initialized with the correct tables and schemas. The SQL migration files are located in the `Login-BE/sql` directory.

**Note:** This is a manual process. You will need to run the SQL scripts in the correct order against your database. The order should be:

1.  `sql/permissions/create table.sql`
2.  `sql/roles/create table.sql`
3.  `sql/users/create table.sql`
4.  `sql/RolePerms/create table.sql`
5.  `sql/UserRoles/create table.sql`
6.  `sql/registration/alter_users.sql`
7.  `sql/registration/create_tokens.sql`
8.  `sql/permissions/migration_add_perm_key.sql`
9.  `sql/registration/migrate_status.sql`

You can use a tool like `psql` to run these scripts.

### 5. Start the Application

Use a process manager like `pm2` to run the backend server in the background and ensure it restarts on failure.

```bash
# Install pm2 globally
npm install -g pm2

# Start the backend server with pm2
pm2 start index.js --name "login-backend"
```

---

## III. Frontend Deployment (Login-FE)

### 1. Install Dependencies and Build

Install the dependencies and build the production version of the frontend:

```bash
cd Login-FE
npm install
npm run build
```

This will create a `dist` directory containing the static files for the frontend.

### 2. Serve the Frontend with Nginx

Use Nginx to serve the static frontend files and proxy API requests to the backend.

First, install Nginx on your server:

```bash
sudo apt-get update
sudo apt-get install nginx
```

### 3. Configure Nginx

Create a new Nginx configuration file for your application (e.g., `/etc/nginx/sites-available/login-app`).

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your_domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name your_domain.com;

    # SSL Certificate
    ssl_certificate /path/to/your/ssl_certificate.crt;
    ssl_certificate_key /path/to/your/ssl_private_key.key;

    # Root and index
    root /path/to/your/Login/Login-FE/dist;
    index index.html;

    # API Proxy
    location /api {
        proxy_pass http://localhost:8080; # Assuming the backend is running on port 8080
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static files
    location / {
        try_files $uri /index.html;
    }
}
```

**Enable the Nginx Configuration:**

```bash
sudo ln -s /etc/nginx/sites-available/login-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```
---
