import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function authMiddleware(req, res, next) {          // This middleware will check if the user is authenticated or not and will add the user details to the request object if authenticated

    const token = req.cookies.token;                             // This line is used to get the token from the cookies in the request. It is used for authentication and authorization purposes.

    if (!token) {                                               // If token is not present, return 401 Unauthorized status code with a message.
        return res.status(401).json({
            message: 'Unauthorized: Please login'
        });
    }

    // if token is present, we verify it using jwt.verify() method. This method takes the token and the secret key as arguments and returns the decoded payload if the token is valid.

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);  // Verify the token using the secret key. If the token is valid, it will return the decoded payload. [Decoded Payload Content: The payload typically contains:User information (id, email, etc.), token metadata (expiration time, issued time) etc.]
        req.user = decoded;                                    // If the token is valid, we attach the decoded user information to the request object for further use in the route handlers.
        next();                                                // Call the next middleware or route handler(controller) automatically if the token is valid.
    }
    catch (error) {
        res.clearCookie('token');  // Clear the expired/invalid token cookie
        return res.status(401).json({
            message: 'Session expired. Please login again'
        });                                                     // If the token is invalid or expired, return 401 Unauthorized status code with a message.
    }
}

// Note:- if token is invalid or expired, it will throw an error, that is why it is necessary to use try and catch here.