const JWT = require('jsonwebtoken')
const secretkey = "keys"

const generatetoken = async (user) =>{
    return(
        JWT.sign(user, secretkey, (err, token) =>{
            if(err){
                res.status(500).json({
                    message: err.message
                })

            }else{
                res.status(200).json({
                    token
                })
            }
        })
    )
    
}


module.exports = generatetoken