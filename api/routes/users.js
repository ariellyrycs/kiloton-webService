/**
 * Created by arobles on 3/13/15.
 */

/*globals module, require*/


var controllers = require('./../controllers/usersController');
module.exports = function(app) {
    app.get('/users', controllers.findAllUsers);
    app.get('/user/:id', controllers.findByIdProfile);
    app.post('/user', controllers.addUser);
    app.put('/user/:id', controllers.updateUser);
    app.put('/user', controllers.updateUser);
    app.delete('/user/:id', controllers.deleteUser);

    //getting several elements
    app.get('/user/:uId/sprints', controllers.findAllSprintsByUser);
    app.get('/user/:uId/exists', controllers.statusUserExistence);
    app.get('/user/:uId/sprint/:sId/interactions', controllers.findAllInteractionBySprint);
};