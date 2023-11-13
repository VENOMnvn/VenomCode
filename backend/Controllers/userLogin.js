const User = require('../MongoDB/UserSchema');
const ProffesionalModal = require('../MongoDB/professionSchema');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);

        if (email && password) {
            const user = await User.findOne({ email: email })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (user.email === email && isMatch) {
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    const proData = await ProffesionalModal.findById(user.professionDetails);
                    // res.redirect('/');
                    res.send({isLogin:true,user,proffesional:proData});
                }
                else {
                    res.send({ "status": "failed", "message": "Invalid email or password" })
                }
            }
            else {
                res.send({ "status": "failed", "message": "You are not registered user" });
            }
        } else {
            res.send({ "status": "failed", "message": "Please fill all the fields" });
        }

    } catch (err) {
        console.log(err)
        res.status(400).send({ "status": "failed", "message": `${err}` })
    }
}

module.exports = userLogin;