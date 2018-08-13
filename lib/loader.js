const CLI = require('clui');
const Spinner = CLI.Spinner;

function runLoader(title, fn) {
    const status = new Spinner(title);
    status.start();
    fn();
    status.stop();
}

function runLoaderAsync(title, fn) {
    const status = new Spinner(title);
    status.start();
    const done = () => {
        status.stop();
    };
    if (fn) {
        try {
            fn(done);   
        } catch (error) {
            console.log('Error during loader = ', error);
            done();
        }
    } else {
        done();
    }
}

module.exports = {
    runLoader,
    runLoaderAsync
}