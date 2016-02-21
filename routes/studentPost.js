module.exports = function (app, studentData) {
    /* GET */
    app.post('/studentPost/', function (req, res, next) {
        console.log("Calling to write action to DB!");
        var actionData = req.body.action;
        //studentData.insert(actionData, function () {
        //    res.status(200);
        //    res.end();
        //});
        writeActionToDB(studentData, req, res, next)
    });

    app.get('/', function (req, res, next) {
        console.log("Rendering home! ");
        res.status(200);
        res.end();
    })
};

function writeActionToDB(studentData, req, res, next) {
    console.log("--------------- Writing to DB ---------------");
    var actionData = {action : req.body.action, time : $currentDate};
    console.log("[ACTIONDATA] : " + actionData);
    // Writes to collection actionData
    studentData.insert(actionData, function(err, data) {
        if (!err) {
            res.status(200);
            res.send();
            console.log("No errors in writing to DB");
        } else {
            console.error(err);
        }
    });
}
