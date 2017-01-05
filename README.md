# express-handlebars-rest-mongo

The first thing you need to do, assuming you have mongo db running its create a new database.
For this project mongoose try to connect to a db called "products" so you need to write 'use products' to create the db.

Once you have this step done you can 'npm install' the packages declared on package.json.
I created a Grunt task to start the application: 'grunt server'
now you can open http://localhost:3000/ on your browser.

I decided to use Handlebars as template engine to create the views and express as router.

So the tools included on this boilerplate are:

- Express JS (as router and node server)
- Handlebars (as html template engine)
- Moongose (to create the db connection)
- MongoDB (to interact with the entries requests)
- Bootstrap (to some very basic for UI elements and layout)
