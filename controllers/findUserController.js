const {User} = require('../conn');

module.exports = async r => {
    const { login } = r.query;
    const result = await User.findOne({login });
    result ? r.res.send(result) : r.res.send('Do not exist');
};
//localhost:3000/users/?login=name
//curl http://localhost:3000/users/?login=name
