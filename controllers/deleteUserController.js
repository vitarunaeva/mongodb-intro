const {User} = require('../conn');

module.exports = async r => {
    const {login, password} = r.body;
    if (login && password) {
        try {
            const x = await User.deleteOne({login, password});
            if (x.n === 0) {
                await r.res.json('No such user!')
            }
            await r.res.json(`User login:${login} successfully delete`);
        } catch (e) {
            await r.res.status(500).json('Internal Server Error');
        }

    } else {
        await r.res.json('Login && Password cannot be empty!');
    }
};
// curl -d '{"login":"a", "password":"a"}' -H "Content-Type: application/json" -X DELETE http://localhost:3000/users
