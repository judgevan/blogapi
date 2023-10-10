const User = require('../models/userModel')
const STATUSCODE = require('http-status-codes')
const schema = require('../validators/blogvalidator')

const usersLogin = async (req, res) => {

    const{username, password}=req.body
    const {error} = schema(req.body)
    const {generatetoken} = require('../middlewares/authentication')

    if(error) { 
        return res.status(STATUSCODE.BAD_REQUEST).json({
            message: error.message
        })
    }

    try {
        const user = await User.findOne({
            username
        })

        if(!user){
            return res.status(STATUSCODE.UNAUTHORIZED).json({
                message: 'invalid username or password'
        })
    }
    const token = await generatetoken(user)
            return res.json({
                token
            })
    } catch (error) {
        return res.status(STATUSCODE.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error'
        
    })}


}


module.exports = usersLogin