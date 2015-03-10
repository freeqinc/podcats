#PodCats Application
Project for CSE 170/COGS 120

##Install Dependencies:
Podcats have multiple NodeJS dependencies in order to have successful web application. To install these dependencies:
```
npm install
```
Here is the list of dependencies:
* Compression 1.4.0
* Express 4.11.2
* hbs 2.8.0
* Express Handlebars 1.2.1 
* MongoDB 1.4.30
* Mongoose 3.8.23
* Morgan 1.5.1

##Starting DB (localhost):
Normally, localhost (especially not in virtual environment), MongoDB server will not start by default. To run application in localhost, one need to manually run MongoDB server. To do so, open another terminal and type:
```
mongod --dbpath data/db
```

##Starting Application:
All server components are handled in server.js file. To run application in NodeJS type:
```
node server.js
```

##Loading Default User Data
There are default user credentials available at user.json file. To load these objects to database, before Node server is running, type:
```
node initDB.js
```
###On Heroku
After deploying application to Heroku, type:
```
heroku run node initDB.js
```
