import app from './src/app.js';                                         // don't forget to write .js extension while using import instead of require
import config from './src/config/config.js';
import connectDB from './src/db/db.js';

connectDB();

app.listen(config.PORT || 3000,()=>{                                    // server started
    console.log(`server running on port ${config.PORT || 3000}`);    
})