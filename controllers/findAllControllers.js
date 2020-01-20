
const {User} = require('../conn');

module.exports = async r => {
    const result = await User.find();
    result ? r.res.send(result) : r.res.send('No such user');
};

//localhost:3000/users/list
