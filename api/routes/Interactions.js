/**
 * Created by arobles on 3/13/15.
 */
/*globals require, module*/

var controllers = require('./../controllers/interactionsController'),
    userController = require('./../controllers/usersController'),
    sprintController = require('./../controllers/sprintsController');
module.exports = function(app) {
    app.get('/interactions', controllers.findAllInteractions);


    app.get('/user/:uId/sprint/:sId/interaction/:iId', [userController.checkUserExistence, sprintController.checkSprintExistence, controllers.findById]);
    app.post('/user/:uId/sprint/:sId/interaction', controllers.addInteraction);
    app.put('/user/:uId/sprint/:sId/interaction/:iId', [userController.checkUserExistence, sprintController.checkSprintExistence, controllers.updateInteraction]);
    app.delete('/user/:uId/sprint/:sId/interaction/:iId', [userController.checkUserExistence, sprintController.checkSprintExistence, controllers.deleteInteraction]);
};