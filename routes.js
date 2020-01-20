const express = require('express');
const cors = require('cors');
const router = express.Router();
const createUserController = require('./controllers/createUserController');
const findUserController = require('./controllers/findUserController');
const changeUserController = require('./controllers/changeUserController');
const deleteUserController = require('./controllers/deleteUserController');
const findAllController = require('./controllers/findUserController');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router
    .route('/users')
    .post(createUserController)
    .get(findUserController)
    .put(changeUserController)
    .delete(deleteUserController);

router
    .get('/users/list', findAllController)
    .get('/', (req,res) => {
        res.sendFile('views/index.html', {root: __dirname })
    });

module.exports = router;
