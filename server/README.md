# Node JS + Express + Typescript

Iniciar localmente:

```bash
cd server
npm install
npm run dev
```
Running: http://localhost:4000


# Iniciar proyecto con Docker

Iniciar el proyecto con Docker:

```bash
docker-compose up --build
```

Finalizar el proyecto con Docker:

```bash
docker-compose down
```

# ROUTES

| Method | Route         |
| ------ | ------------- |
| `GET`  | `/history`    |
| `GET`  | `/lists`      |
| `POST` | `/results`    |

# DB

-   [MongoDB](https://www.mongodb.com/)

# ENV

MONGODB_URI=mongodb+srv://tecnica-msa:tecnica-msa@cluster0.obrls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=4000

# TEST

```bash
npm run test
```

