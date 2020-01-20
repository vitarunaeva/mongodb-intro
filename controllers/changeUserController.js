const {User} = require('../conn');

module.exports = async r => {
    const {login, password, newpassword} = r.body;
    console.log(login, password, newpassword);
    if (login && password && newpassword) {
        try {
            const x = await User.updateOne({login, password }, {password: newpassword});
            if (x.nModified < 1) return await r.res.json('No such user');
            await r.res.status(200).json('Password changed successfully!');
        } catch (e) {
            await r.res.status(500).json('Internal Server Error');
        }
    } else {
        await r.res.json('Login && Password && New password cannot be empty!');
    }

};
// curl -X PUT -H "Content-Type: application/json" -d '{"login":"a","password":"bc","newpassword":"abc"}' http://localhost:3000/users
