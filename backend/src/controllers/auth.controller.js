import { createUser, findUser } from "../dao/user.dao.js";
import bcrypt from "bcryptjs"                                           // bcryptjs is a library/package for hashing passwords, it is used to encrypt the password before storing it in the database, so that even if the database is compromised, the passwords are not easily readable
import jwt from "jsonwebtoken";                                         // jsonwebtoken is a library/package for creating and verifying JSON Web Tokens (JWT), it is used to create a token after successful login, which can be used for authentication in subsequent requests
import config from "../config/config.js";

export async function registerUser(req, res) {                            

    const { name, email, password } = req.body;                        

    if (!name || !email || !password) {                                  
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const userExist = await findUser({ email: email });                    // FIXED: Added await to properly check if user exists

    if (userExist) {                                                       // if({}) -> true, if(null) -> false
        return res.status(400).json({ message: "User already exists" });   // 400 -> Bad Request, i.e user already exists
    }

    const hash = await bcrypt.hash(password, 10);                           // salt rounds -> 10 (10 level lock, 2^10 = 1024 processing)

    const user = await createUser({                                         // FIXED: Added await to properly create the user
        name: name,
        email: email,
        password: hash
    })

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY });  // create a JWT token with user id and secret key

    res.cookie("token", token, {
        expires: new Date(Date.now() + config.COOKIE_EXPIRY), // Cookie expiry from config
        httpOnly: true
    });  // set the token in a cookie with expiry

    return res.status(201).json({                       // 201 -> new resource created successfully
        message: "User registered successfully",
        user: {
            name: user.name,
            email: user.email,
            id: user._id
        },
        token
    })
}

export async function loginUser(req, res) {

    const { email, password } = req.body;

    const userExist = await findUser({ email: email });     // userExist = either {} or null

    if (!userExist) {                                          // !null = true , !{} = false 
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);      //password->jo aaya(usko hash krega bcrypt) , userExist->jo database me h(hashed form me)   // returns true/false  // await is must, wrna it will be true always

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ id: userExist._id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY });  // create a JWT token with user id and secret key

    res.cookie("token", token, {
        expires: new Date(Date.now() + config.COOKIE_EXPIRY), // Cookie expiry from config
        httpOnly: true
    });  // set the token in a cookie with expiry

    return res.status(200).json({                   // not 201
        message: "user logged in Successfully",
        user: {
            name: userExist.name,
            email: userExist.email,
            id: userExist.id,
        },
        token
    })
}

export async function logoutUser(req, res) {
    res.clearCookie("token");  // This clears the token cookie
    return res.status(200).json({ message: "Logged out successfully" });
}


/*
Mistakes: not using await in userModel.create and userModel.findOne , always use await when dealing with any database operation, since they are asynchronous operations

NOTE: bcrypt.hash(password, 10)  ==> Yahaan 10 ka matlab hai — kitni baar password ko ghuma-ghuma ke strong banaya jaye.

Soch le:
Tu ek password ko lock kar raha hai.
Jitni baar lock ghumayega, utna mushkil hoga todna.
To yahaan 10 ka matlab hai: Lock 10 baar ghuma diya (andar hi andar 1024 baar processing hoti hai)

Kyun karte hain ye?
Taaki agar hacker tera password chura bhi le,
to usse toadne me zyada time lage.
Agar 1 baar me crack hota to ab 1024 baar lagani padegi — bahut tough ho jaata hai.

| Number (salt rounds) | Meaning              | Effect        |
| -------------------- | -------------------- | ------------- |
| `8`                  | Thoda kam security   | Fast          |
| `10`                 | Normal / Recommended | Balanced 🔥   |
| `12+`                | Zyada secure         | Thoda slow ⚠️ |

*/