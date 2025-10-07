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

Foi adotada uma estratégia de duas branches: uma para produção e outra para desenvolvimento.
- Branch de desenvolvimento do frontend -> **main**
- Branch de desenvolvimento do backend -> **main**
- Branch de produção do frontend -> **feature/deploy**
- Branch de produção do backend -> **feature/config-deploy**


Desenvolvimento: Na branch main, não foi usado docker, então pode rodar o projeto normalmente com seguindo os passos da seção 1.

Produção: Nas branches de produção, foram usado docker compose para posteriormente subir na AWS. Mais detalhes descritos na seção 2.

## 📦 Development: Installation

### 1. Clone the repository

```bash

git  clone  https://github.com/joaonevescampos/cyber-web-frontend.git

```
Change to your repository

```bash
cd desafio-3-cyber-web-frontend
```

Install the dependencies:
```bash
npm install
```

Run the project:
```bash
npm run dev
```

## Produção: Deploy com Docker e AWS

### 2) Como subir o backend, frontend e banco em produção?
- Foi criado uma instancia em EC2 da AWS, configurado uma chave SSH para ser possível clonar os repositórios privados do github. Depois de criado a instância, conectou-se com a instância no meu computador por meio de par de chaves. Usou-se uma máquina Linux Ubuntu e dentro dessa máquina, no terminal linux, seguiu-se os seguintes passos abaixo:

### 2.1) Instalação do docker

**2.1.1. Atualizar o sistema**

```bash
sudo apt update
sudo apt upgrade -y
```

**2.1.2. Instalar dependências**


```bash
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release -y
```

**2.1.3. Adicionar a chave GPG do Docker**

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

**2.1.4. Adicionar o repositório do Docker**

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**2.1.5. Atualizar a lista de pacotes**
```bash
sudo apt update
```

**2.1.6. Instalar o Docker**
```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```
**2.1.7. Adicionar usuário ao grupo docker (para não usar sudo)**
```bash
sudo usermod -aG docker $USER
```
Importante: Faça logout e login novamente para que a mudança tenha efeito.

**2.1.8. Testar a instalação**
```bash
docker --version
docker images
docker ps -a
```

### 2.2) Criar uma pasta do projeto e o docker-compose.yml no terminal do bash:
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
### 2.3) clonar os repositórios do front e back:

**2.3.1) Frontend:**

`git clone https://github.com/joaonevescampos/desafio-3-cyber-web-frontend.git`

**2.3.2) Backend:**

`git clone https://github.com/joaonevescampos/cyber-web-backend.git`

### 2.4) Mudar para branches de produção:

**Frontend**

Entre no repositório do frontend: `cd desafio-3-cyber-web-frontend`
Mudar para a branch de produção: `git checkout feature/deploy`

**Backend**

Entre no repositório do backend: `cd cyber-web-backend`
Mudar para a branch de produção: `git checkout feature/config-deploy`

- Agora está tudo pronto para instalar os pacotes para o docker. 

### 2.5) Rodar o docker compose na instância EC2:

**Lembre que deve estar na raiz "project", na pasta onde tem o docker-compose.yml e ambos repositórios:**

`cd ..`

**2.5.1) Rode este comando para criar as imagens e containers:**

`docker compose up -d --build`

**2.5.2) Rode os comandos para criar e popular as tabelas no banco de dados postgres**

`docker exec -it backend npx prisma migrate deploy`

`docker exec -it backend npm run seed:prod`

- Pronto! Agora o backend deve está funcionando em **http://18.117.245.170/api** e frontend está na porta 80 em **http://18.117.245.170/** ou 
**http://ec2-18-117-245-170.us-east-2.compute.amazonaws.com/**
## Authors

### Group 5: "Sertão Squad"

- [Guilherme Paes Cavalcanti](https://github.com/Guy1717)
- [Iury Allan Alves Diogenes](https://github.com/iuryallan)
- [João Victor Neves Campos de Jesus](https://github.com/joaonevescampos)
- [Nicole Da Silva Rodrigues](https://github.com/nicolerdgs)
- [Samily Vitoria Bonfim Mendes](https://github.com/samndess)
