const { verifyToken } = require("./createToken");

function authenticationCookie(cookieName) {
    return (req, res, next) => {
      const tokenCookieValue = req.cookies[cookieName];
      if (!tokenCookieValue) {
        res.locals.user = null; // No user in locals if token is missing
        return next();
      }
  
      try {
        const userPayload = verifyToken(tokenCookieValue);
        req.user = userPayload; // Attach user details to the request object
        res.locals.user = userPayload; // Attach to locals for EJS rendering
      } catch (error) {
        console.error('Token verification failed:', error);
        res.locals.user = null;
      }
      return next();
    };
  }
module.exports={authenticationCookie}