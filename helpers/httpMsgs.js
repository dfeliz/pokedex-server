
exports.show500 = function(req, res, err) {
    res.writeHead(500, "Internal Error ocurred (Error 500)", { "Content-Type": "application/json" });
    res.write(JSON.stringify({response: "ERROR occurred: " + err}));
    res.end();
};

exports.show400 = function(req, res, err) {
    res.writeHead(400, "Bad request (Error 400)", {"content-type": "application/json"});
    res.write(JSON.stringify({response: "ERROR occurred: " + err}))
    res.end();
}

exports.success = function(req, res, data) {
    res.writeHead(200, "Success", {"content-type": "application/json"});
    if (data) {
        res.write(JSON.stringify(data));
    }
    res.end();
}