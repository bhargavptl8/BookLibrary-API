var jwt = require('jsonwebtoken');
const Admin = require('../model/admin');

exports.sequre = async (req, res, next) => {

    try {

        let token = req.headers.authorization

        if(!token)
            {
                throw new Error('Please Attach Token')
            }

        let decoded = jwt.verify(token, 'AdminLogin')

        console.log(decoded);

        let adminFind = await Admin.findById(decoded.id)
        
        if(!adminFind)
            {
                throw new Error('Admin Not Found')
            }

        next()

    } catch (error) {

        res.status(404).json({
            status: 'Fail',
            message: error.message
        })
    }
}
