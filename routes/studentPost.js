module.exports = function (app, studentData) {
    /* POST WITH STUDENT DATA */
    app.post('/studentPost/', function (req, res, next) {
        writeActionToDB(studentData, req, res, next)
    });
    /* GET FOR HOME PAGE */
    app.get('/', function (req, res, next) {
        console.log("Rendering home! ");
        res.status(200);
        res.end();
    })
};

function writeActionToDB(studentData, req, res, next) {
    console.log("");
    console.log("--------------- Writing to DB ---------------");
    console.log("action = " + req.body.action);
    console.log("code   = " + req.body.code);
    var actionData = {action : req.body.action, code : req.body.code};
    console.log("Writing action data: " + actionData);
    studentData.insert(actionData, function(err, data) {
        if (!err) {
            res.status(200);
            res.send();
            console.log("Writing action data successful");
        } else {
            res.status(500);
            res.send();
            console.error(err);
        }
    });
}
