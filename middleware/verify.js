const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    //const Authorization = req.headers.Authorization || req.headers.authorization;

    if (!token) return res.status(401).json({ error: 'Not authorized' })
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Not Valid' });
        req.user = decoded
        req.session.email = decoded.id;
        req.session.user = decoded.userId
        req.session.usertype = decoded.type
        next();
    })

    // if (Authorization && Authorization.startsWith("Bearer")) {
    //     const token = Authorization.split(' ')[1];
    //     console.log(token)
    //     jwt.verify(token, 'your-secret-key', (err, decoded) => {
    //         if (err) return res.status(401).json({ error: 'Not Valid' });
    //         req.user = decoded
    //         req.session.email = decoded.id;
    //         req.session.user = decoded.userId

    //         next();

    //     })
    // }
    // else {
    //     return res.status(403).json({ status: 'Erorr on token or failed Token verification' })

    // }


}


module.exports = requireAuth