# Jesterly - Meme Social Network Back-end

Jesterly is a social network, where you can register and post memes for everyone to see. Also you can make 'memelists' which are like 'curated collections' maybe about a topic in particular or whatever concept you feel like, where you can include memes from yourself or others. (Same concept as spotify playlists).

There are authentication restrictions to perform some actions, like deleting a meme, updating an user, etc. Some actions are for everyone, other can only be done by an specific user (deleting a meme that a user himslef uploaded) or an admin.

## Technologies

-  NodeJS
-  MongoDB Atlas
-  Insomnia
-  Cloudinary

## Libraries

-  Express
-  Mongoose
-  dotenv
-  bcrypt
-  Jsonwebtoken
-  Nodemon (dev)

## Installation

```sh
cd project-7-jesterly-backend
npm i
```

## Import Insomnia File

All the endpoints already created to test the application. Create a new collection, click in the title and import a file from URL using the one below

-  https://raw.githubusercontent.com/blue-keyboard/project-7-jesterly-backend/main/Insomnia_Jesterly_Endpoints

![image](https://github.com/user-attachments/assets/16710b23-209f-4812-a8b1-a635094f7e16)

![image](https://github.com/user-attachments/assets/20e42e50-20ff-41fa-ad1f-c41578af1e2a)

## Scripts

Run dev server:

```sh
npm run dev
```

Run server:

```sh
npm run start
```

Initiallize some users and an admin:

```sh
npm run seed
```

## Endpoints

---

**Users**

| HTTP Method | URL                                         | Auth              | Description                       |
| ----------- | ------------------------------------------- | ----------------- | --------------------------------- |
| `GET`       | http://localhost:3000/api/v1/users          | Admin             | Retrieves list of Users           |
| `GET`       | http://localhost:3000/api/v1/users/:id      | Everyone          | Retrieves User by Id              |
| `POST`      | http://localhost:3000/api/v1/users/register | Everyone          | Adds new User to database         |
| `POST`      | http://localhost:3000/api/v1/users/login    | Everyone          | Logins User and gives an Auth key |
| `PUT`       | http://localhost:3000/api/v1/users/:id      | Admin             | Updates User by Id                |
| `DELETE`    | http://localhost:3000/api/v1/users/:id      | Admin / Same User | Deletes Author by Id              |

**Memes**

| HTTP Method | URL                                          | Auth              | Description                              |
| ----------- | -------------------------------------------- | ----------------- | ---------------------------------------- |
| `GET`       | http://localhost:3000/api/v1/memes           | Everyone          | Retrieves list of Memes                  |
| `GET`       | http://localhost:3000/api/v1/memes/:id       | Everyone          | Retrieves Meme by Id                     |
| `GET`       | http://localhost:3000/api/v1/memes/tags/:tag | Everyone          | Retrieves list of Memes that matches tag |
| `POST`      | http://localhost:3000/api/v1/memes/          | User              | Adds new Meme to database                |
| `DELETE`    | http://localhost:3000/api/v1/memes/:id       | Admin / Same User | Deletes Meme by Id                       |

**Memelists**

| HTTP Method | URL                                        | Auth              | Description                   |
| ----------- | ------------------------------------------ | ----------------- | ----------------------------- |
| `GET`       | http://localhost:3000/api/v1/memelists     | Everyone          | Retrieves list of Memelists   |
| `GET`       | http://localhost:3000/api/v1/memelists/:id | Everyone          | Retrieves Memelist by Id      |
| `POST`      | http://localhost:3000/api/v1/memelists/    | User              | Adds new Memelist to database |
| `PUT`       | http://localhost:3000/api/v1/memelists/:id | Same User         | Updates Memelist by Id        |
| `DELETE`    | http://localhost:3000/api/v1/memelists/:id | Admin / Same User | Deletes Memelist by Id        |
