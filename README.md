# Cyber web

## 🚀 Objective

The main goal of this project is to:

- Offer a minimal and modern setup for building scalable front-end applications.

- Combine **Vite's blazing fast dev server**, **TypeScript's type safety**, and **Tailwind's utility-first CSS**.

- Provide a clean structure to easily start new projects.

---

## 🛠️ Technologies Used

- [Vite](https://vitejs.dev/) – next generation front-end tooling

- [TypeScript](https://www.typescriptlang.org/) – strongly typed JavaScript

- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS framework
- **Routing**: React Router
- **API Communication**: Axios
- **Build Tool**: Vite
- **Version Control**: Git + Conventional Commits
---

## Strategy

A two-branch strategy was adopted: one for production and another for development.
- Frontend development branch -> **main**
- Backend development branch -> **main**
- Frontend production branch -> **feature/deploy**
- Backend production branch -> **feature/config-deploy**

**Development**: In the main branch, Docker was not used, so you can run the project normally by following the steps in section 1.

**Production**: In the production branches, Docker Compose was used to later deploy to AWS. More details are described in section 2.

## 📦 Development: Installation

### 1. Clone the repository

```bash

git clone https://github.com/joaonevescampos/desafio-3-cyber-web-frontend.git

```
Change to your repository

```bash
cd desafio-3-cyber-web-frontend
```

Install the dependencies:
```bash
npm install
```
Make sure that the .env is on the project.

Run the project:
```bash
npm run dev
```

## Production: Deployment with Docker and AWS

### 2) How to deploy backend, frontend and database in production?
- An EC2 instance was created on AWS, configured with an SSH key to enable cloning private GitHub repositories. After creating the instance, it was connected to my computer via key pair. An Ubuntu Linux machine was used, and within this machine, in the Linux terminal, the following steps were followed:

### 2.1) Docker Installation

**2.1.1. Update the system**

```bash
sudo apt update
sudo apt upgrade -y
```

**2.1.2. Install dependencies**


```bash
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release -y
```

**2.1.3. Add Docker's GPG key**

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

**2.1.4. Add Docker repository**

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**2.1.5. Update package list**
```bash
sudo apt update
```

**2.1.6. Install Docker**
```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```
**2.1.7. Add user to docker group (to avoid using sudo)**
```bash
sudo usermod -aG docker $USER
```
Important: Log out and log back in for the change to take effect.

**2.1.8. Test installation**
```bash
docker --version
docker images
docker ps -a
```

### 2.2) Create a project folder and docker-compose.yml in the bash terminal:
```bash
mkdir project && cd project && cat > docker-compose.yml << 'EOF'
services:
  db:
    image: postgres:15
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
      POSTGRES_DB: cyber-web-desafio3
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - app-network

  backend:
    build: ./cyber-web-backend
    container_name: backend
    restart: always
    env_file:
      - ./cyber-web-backend/.env.production
    ports:
    - "4000:4000"
    command: sh -c "npx prisma migrate deploy && npm start"
    depends_on:
      - db
    networks:
      - app-network

  frontend:
    build: ./desafio-3-cyber-web-frontend
    container_name: frontend
    restart: always
    ports:
      - "80:80"
    env_file:
      - ./desafio-3-cyber-web-frontend/.env.production
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  db_data:
EOF

```
### 2.3) Clone the frontend and backend repositories:

**2.3.1) Frontend:**

`git clone https://github.com/joaonevescampos/desafio-3-cyber-web-frontend.git`

**2.3.2) Backend:**

`git clone https://github.com/joaonevescampos/cyber-web-backend.git`

### 2.4) Switch to production branches:

**Frontend**

Enter the frontend repository: `cd desafio-3-cyber-web-frontend`
Switch to production branch: `git checkout feature/deploy`

**Backend**

Enter the backend repository: `cd cyber-web-backend`
Switch to production branch: `git checkout feature/config-deploy`

- Now everything is ready to install the packages for Docker. 

### 2.5) Run docker compose on the EC2 instance:

**Remember you must be at the root "project" folder, in the directory containing the docker-compose.yml and both repositories:**

`cd ..`

**2.5.1) Run this command to create the images and containers:**

`docker compose up -d --build`

**2.5.2) Run the commands to create and populate the tables in the PostgreSQL database**

`docker exec -it backend npx prisma migrate deploy`

`docker exec -it backend npm run seed:prod`

- Done! Now the backend should be running at **http://18.117.245.170/api** and the frontend is on port 80 at **http://18.117.245.170/** or 
**http://ec2-18-117-245-170.us-east-2.compute.amazonaws.com/**

## Authors

### Group 5: "Sertão Squad"

- [Guilherme Paes Cavalcanti](https://github.com/Guy1717)
- [Iury Allan Alves Diogenes](https://github.com/iuryallan)
- [João Victor Neves Campos de Jesus](https://github.com/joaonevescampos)
- [Nicole Da Silva Rodrigues](https://github.com/nicolerdgs)
- [Samily Vitoria Bonfim Mendes](https://github.com/samndess)
