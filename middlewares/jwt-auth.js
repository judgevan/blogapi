const jwt = require("jsonwebtoken");
const secretkey = "";

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    

        if (!token) {
            res.status(403).json({
                message: "No token provided",
            });
        } else {
             jwt.verify(token, secretkey, (error, token) => {
                if (error) {
                    res.status(500).json({
                        message: error.message,
                    })
                }   else {
                    res.user = token;
                    next();
                }
            });
            
        }
        
    
    }
    
const generateToken = async (user) => {
    return (
    jwt.sign(user, secretkey, (err, token) => {
        if (err) {
            res.status(500).json({
                error: "failed to generate JWT"
            });
        } else {
            res.status( {
                token
            })
        }
    })
    )
};


module.exports = {
    verifyToken,
    generateToken
}