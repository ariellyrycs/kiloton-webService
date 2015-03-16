/**
 * Created by arobles on 3/13/15.
 */

/*globals module, require*/


var controllers = require('./../controllers/usersController');
module.exports = function(app) {
    app.get('/users', controllers.findAllUsers);
    app.get('/user/:id', controllers.findById);
    app.post('/user', controllers.addUser);
    app.put('/user/:id', controllers.updateUser);
    app.delete('/user/:id', controllers.deleteUser);


    app.get('/user/:userId/sprint/', controllers.findAllSprintsByUser);
    app.get('/user/:userId/sprint/:sprintId/interaction', controllers.findAllInteractionBySprint);
};