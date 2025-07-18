**packages used :-**
    1. express
    2. mongoose
    3. bcryptjs (for hashing the password)
    4. dotenv   (for accessing variables(imagekit credentials and jwt secret key) from .env file)
_________________________________________________________________________________________________

# Sound Stream Backend Documentation    

• Flow (step by step process to create the application) :- 

I] Three Basic Files
    i) db.js - for database connection
    ii) app.js - for express app initialization   [and middlewares]
    iii) server.js - for starting the server

II] Authentication :-

    1. User Registration
        i)  Create auth.routes.js file, create register route 
        ii) For controller, create auth.controller.js file (and write registerUser function there)
        ii) But for controller, first you need user model, so create user.model.js file
        iv) In user.model.js, first create user schema and then create user model and export it

        - At last, write app.use('/', auth.routes) [middleware] in app.js to use the auth routes (or to let know the express app about the auth route)

    2. User Login

        i)  Create login route in auth.routes.js
        ii) For controller, create loginUser function in auth.controller.js
        iii) In loginUser function, first find the user by username, then compare the password using bcryptjs, and then send the response

        - middleware for auth routes is already written in app.js (app.use('/', auth.routes))

III] Songs API:-

    