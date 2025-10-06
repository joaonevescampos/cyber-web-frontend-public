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
  
## 📦 Installation

### 1. Clone the repository

```bash

git  clone  https://github.com/joaonevescampos/cyber-web-frontend.git

```
Change to your repository

```bash
cd cyber-web-frontend
```

Install the dependencies:
```bash
npm install
```

Run the project:
```bash
npm run dev
```

### Docker
#### 1) Como foi feito?
- Foi subido em docker para dev (backend e banco de dados) e para produção (backend, banco de dados e frontend).
- Foi escolhido a porta 4000 para rodar o backend, porta 3000 para o frontend e 5432 para o banco de dados.

#### 2) Como usei o docker e subir as imagens e containers?
- Optei em usar o docker compose para facilitar subir ambos projetos ao mesmo tempo criando um arquivo docker-compose.yml uma pasta onde tinha ambos projetos (backend e frontend). Criei também para cada projeto um Dockerfile. Cada projeto tem suas variáveis de ambiente onde eu optei em criar .env.development para desenvolvimento e .env.production para ambiente de produção.

OBS.: Para subir para a AWS

#### 2.1) Como subir o backend e banco em dev?
- Primeiro certifique-se que não está usando as 3 portas que vão ser necessárias para testa a aplicação: 3000, 4000 e 5432.

Teste para verificar se não tem portas ativas:

`sudo lsof -i :<port number>`

Para remover:

`sudo kill -9 <PID>`

- O ideal é remover as imagens e containers que criou no seu docker para previnir possíveis conflitos:

Remover todos os cotainers: `docker container prune -f `

Remover todas as imagens: `docker rmi -f $(docker images -q)`

OBS.: Caso não tenha permissão, digite os comandos:

`sudo usermod -aG docker $USER`

`newgrp docker`

- Agora está tudo pronto para instalar os pacotes para o docker:

OBS.: **Certifique-se que está dentro da pasta ./cyber-web-backend**

Rode este comando para criar as imagens e containers:

`NODE_ENV=development COMMAND="npm run dev" docker compose up -d --build`

- **Rode os comandos para criar e popular as tabelas no banco de dados postgres**

`docker exec -it backend npx prisma migrate dev`

`docker exec -it backend npm run seed:dev`

- Pronto! Agora o backend deve está funcionando em **http://localhost:4000**. O frontend não roda em docker, então  é necessário, dentro do repositório do frontend, rodar: `npm run dev`. Com isso o front em ambiente de desenvolvimento vai rodar em: **http://localhost:5173/**

### Deploy com Docker e AWS

#### 2.2) Como subir o backend, frontend e banco em produção?

- Se tiver com containers rodando:

`docker compose down`

- O ideal é remover as imagens e containers que criou no seu docker para previnir possíveis conflitos:

Remover todos os cotainers: `docker container prune -f`

Remover todas as imagens: `docker rmi -f $(docker images -q)`

OBS.: Caso não tenha permissão, digite os comandos:

`sudo usermod -aG docker $USER`

`newgrp docker`

- Certifique-se que não está usando as 3 portas que vão ser necessárias para testa a aplicação: 3000, 4000 e 5432.

Teste para verificar se não tem portas ativas:

`sudo lsof -i :<port number>`

Para remover:

`sudo kill -9 <PID>`


Verifique se as imagens e containers foram excluidos mesmo:

`docker ps -a`

`docker images`

- Agora você irá precisar criar uma pasta e dentro dela inserir o código do docker-compose.yml e clonar os dois repositorios (frontend e backend). Siga os passos a seguir:

#### 1) Criar a pasta e o docker-compose.yml no terminal do bash:
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

  backend:
    build: ./cyber-web-backend
    container_name: backend
    restart: always
    env_file:
      - ./cyber-web-backend/.env.${NODE_ENV:-development}
    environment:
      - NODE_ENV=${NODE_ENV:-development}
    ports:
      - "4000:4000"
    command: ${COMMAND:-npm start}
    depends_on:
      - db

  frontend:
    build: ./desafio-3-cyber-web-frontend
    container_name: frontend
    restart: always
    ports:
      - "3000:80"
    env_file:
      - ./desafio-3-cyber-web-frontend/.env.${NODE_ENV:-development}
    environment:
      - NODE_ENV=${NODE_ENV:-development}
    command: >
      sh -c "
      if [ '$NODE_ENV' = 'development' ]; then
        npm run dev -- --host 0.0.0.0;
      else
        nginx -g 'daemon off;';
      fi"
    depends_on:
      - backend

volumes:
  db_data:
EOF

```
2) clonar os repositórios do front e back:

2.1) Frontend: 

`git clone https://github.com/joaonevescampos/desafio-3-cyber-web-frontend.git`

2.2) Backend: 

`git clone https://github.com/joaonevescampos/cyber-web-backend.git`


- Agora está tudo pronto para instalar os pacotes para o docker. **Lembre que deve estar na raiz "project", na pasta onde tem o docker-compose.yml e ambos repositórios:**

Rode este comando para criar as imagens e containers:

`NODE_ENV=production docker compose up -d --build`

- **Rode os comandos para criar e popular as tabelas no banco de dados postgres**

`docker exec -it backend npx prisma migrate deploy`

`docker exec -it backend npm run seed:prod`

- Pronto! Agora o backend deve está funcionando em **http://localhost:4000** e frontend está em **http://localhost:3000**


## Authors

### Group 5: "Sertão Squad"

- [Guilherme Paes Cavalcanti](https://github.com/Guy1717)
- [Iury Allan Alves Diogenes](https://github.com/iuryallan)
- [João Victor Neves Campos de Jesus](https://github.com/joaonevescampos)
- [Nicole Da Silva Rodrigues](https://github.com/nicolerdgs)
- [Samily Vitoria Bonfim Mendes](https://github.com/samndess)
