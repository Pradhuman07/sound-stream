import app from './src/app.js';             // don't forget to write .js extension while using import instead of require
import connectDB from './src/db/db.js';

connectDB();

app.listen(3000,()=>{                                   // server started
    console.log("server running on port 3000");    
})