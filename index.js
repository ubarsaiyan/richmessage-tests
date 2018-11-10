exports.runTests = function() {
    console.log("Running tests...");
    
    const exec = require('child_process').exec

    const child = exec('npm start',
    function(err, stdout, stderr) {
        if (err) throw err;
        else console.log(stdout);
    });
}