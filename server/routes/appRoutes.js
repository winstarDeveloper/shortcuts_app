const express = require('express');
const appController = require('./../controllers/appController');
const authController = require('./../controllers/authController');

const appRouter = express.Router();

// appRouter.param('id', appController.checkId);

// can check if all field values are present and correct before send response
// const middleware = (req, res, next) => {
    // console.log('Called before main handler');
//     next();
// };

// Alias
appRouter.route("/top-apps-list").get(appController.getTopAppsList, appController.getPopularApps);

appRouter.route("/").get(appController.getPopularApps).post(authController.protect, appController.addApp);
appRouter.route("/:id").get(appController.getParticularApp).patch(appController.updateApp).delete(authController.protect, authController.restrictTo('admin'), appController.deleteApp);

module.exports = appRouter;



// app.get("/api/v1/app", getPopularApps);
// app.post("/api/v1/app", addApp);
// app.get("/api/v1/app/:id", getParticularApp);
// app.patch("/api/v1/app/:id", updateApp);
// app.delete("/api/v1/app/:id", deleteApp);

// app.route("/api/v1/app").get(getPopularApps).post(addApp);
// app.route("/api/v1/app/:id").get(getParticularApp).patch(updateApp).delete(deleteApp);
