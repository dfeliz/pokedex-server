
exports.show500 = function(req, res, err) {
    res.writeHead(500, "Internal Error ocurred (Error 500)", { "Content-Type": "application/json" });
    res.write(JSON.stringify({response: "ERROR occurred: " + err}));
    res.end();
};

exports.show400 = function(req, res, err) {
    res.writeHead(400, "Bad request (Error 400)", {"Content-Type": "application/json"});
    res.write(JSON.stringify({response: "ERROR occurred: " + err}))
    res.end();
}

exports.show409 = function(req, res, err) {
    res.writeHead(409, "Conflict (Error 409)", {"Content-Type": "application/json"})
    res.write(JSON.stringify({response: "ERROR occurred: conflict: " + err}))
    res.end();
}

exports.success = function(req, res, data) {
    res.writeHead(200, "Success", {"Content-Type": "application/json"});
    if (data) {
        res.write(JSON.stringify(data));
    }
    res.end();
}

exports.throwErr = function(res, err) {
    res.writeHead(200, "Error", {"Content-Type": "application.json"})
    res.write(JSON.stringify({response: "ERROR occurred: " + err}));
    res.end();
}