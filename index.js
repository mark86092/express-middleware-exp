const express = require('express');
const app = express();

app.use('/stack', function(req, res, next) {
    req.stack = [];
    next();
});

function middleA(req, res, next) {
    console.log("pass through A");
    req.stack.push('A');
    req.stack.push(req.params.A);
    next();
}

function middleB(req, res, next) {
    console.log("pass through B");
    req.stack.push('B');
    req.stack.push(req.params.B);
    next();
}

app.use('/stack/A/:A', middleA);
app.use('/stack/A/:A/B/:B', middleB);
app.use('/stack/B/:B', middleB);
app.use('/stack/B/:B/A/:A', middleA);

app.get('/stack/A/:A', function(req, res) {
    res.send(req.stack);
});

app.get('/stack/A/:A/B/:B', function(req, res) {
    res.send(req.stack);
});

app.get('/stack/B/:B', function(req, res) {
    res.send(req.stack);
});

app.get('/stack/B/:B/A/:A', function(req, res) {
    res.send(req.stack);
});

app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});
