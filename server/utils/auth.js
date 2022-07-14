const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.admin = data;
        } catch {
            console.log(`Invalid Token`)
        }
        return req; 
    },

    signToken: function({email, _id}) {
        const payload = {email, _id}; 

        return jwt.sign({ data: payload }, secret, {expiresIn: expiration})
    }
}