module.exports = (app) => {
    const userLogin = require('../controllers/userlogin.controller');

    app.post('/userlogin', userLogin.loginAkses);

    app.get('/userlogin', userLogin.findAll);
}