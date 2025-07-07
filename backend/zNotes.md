• NOTE :- If you are using import/export instead of require/module.exports , make sure:-
    i)  to write full extension, eg: import app from ".src/app.js"
    ii) make sure to add "type": "module" after license in package.json  file

• MISTAKES :- 
    i) Not using await in userModel.create and userModel.findOne , always use await when dealing with any database operation.   [Results in empty user creation and user already exists]
    ii) Writing 'register' instead of '/register' [resulting Cannot POST /register error]