
exports.show500 = function(req, res, err) {
    res.writeHead(500, "Internal Error ocurred (Error 500)", { "Content-Type": "application/json" });
    res.write(JSON.stringify({data: "ERROR occurred: " + err}));
    res.end();
};

exports.show400 = function(req, res, err) {
    res.writeHead(400, "Bad request (Error 400)", {"content-type": "application/json"});
    res.write(JSON.stringify({data: "ERROR occurred: " + err}))
}