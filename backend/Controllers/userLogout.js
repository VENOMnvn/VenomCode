const jwt = require('jsonwebtoken')

const userLogout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    // res.redirect('/');
    res.send("logout sucessful");
}

module.exports = userLogout;