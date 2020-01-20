const {User} = require('../conn');

module.exports = async r => {
    const {login, password} = r.body;
    if (login && password) {
        const x  = await User.findOne({login, password});
        if (x) return r.res.json('User already exists!');
        const newUser = new User({login, password});

        try {
            r.res.status(201).json(await newUser.save());
        } catch (e) {
            await r.res.status(500).json('Internal Server Error');
        }

    } else {
        await r.res.status(204).json('Login && Password cannot be empty!');
    }

};
// curl -d '{"login":"a", "password":"b"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users
