/**
 * Created by arobles on 3/13/15.
 */

/*globals module, require*/


var controllers = require('./../controllers/usersController.js');
module.exports = function(app) {
    app.get('/pets', controllers.findAllUsers);
    app.get('/pet/:id', controllers.findById);
    app.post('/pet', controllers.addUser);
    app.put('/pet/:id', controllers.updateUser);
    app.delete('/pet/:id', controllers.deleteUser);
};