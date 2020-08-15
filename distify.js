const rimraf = require('rimraf');
const path = require('path');
const mkdirp = require('mkdirp');
const clint = require('clint')();
const child_process = require('child_process');
const fs = require('fs');
const { exit } = require('process');
const options = {};

clint.command('--help', '-h', 'General usage information');
clint.command('--verbose', '-v', 'Verbose');

clint.on('command', (name, value) => {
    switch(name) {
        case '--help': 
            options.help = true;
        break;
        case '--verbose':
            options.verbose = true;
        break;
    }
});



clint.on('complete', () => {
    if (options.help) {
        console.log(clint.help(2, " : "))
        //console.log('Usage: reshape -p "./test/**/*.js"')
        process.exit(0)
    }
    const debug = options.verbose? console.log.bind(console): () => {};
    
    const distPath = path.join(__dirname, 'dist');
    rimraf(distPath, () => {
        mkdirp(distPath).then(() => {
            debug(distPath, 'now exists and is empty');
            debug(''+ child_process.execSync(
                "yarn rollup --format cjs  ./src/index --file dist/index.js"
            ));
            debug('' +child_process.execSync(
                "yarn rollup --format cjs  ./src/ie --file dist/ie.js"
            ));
            debug('now proceed to test...');
            debug('packing...')
            child_process.execSync(
                "npm pack",
            );
            debug('fixing package.json in test');
            const pjson = require('./package.json');
            const testpjson = require('./test/package.json');
            testpjson.dependencies.hookme = `../hookme-${pjson.version}.tgz`;
            fs.writeFileSync("test/package.json", JSON.stringify(testpjson), 'utf8');
            debug('Deleting test node_modules', path.join(__dirname, 'test', 'node_modules'));
            rimraf.sync(path.join(__dirname, 'test', 'node_modules'), {disableGlob: true});
            child_process.execSync(
                    "(cd test; yarn)",
            )
            debug('cleanup');
            rimraf.sync(path.join(__dirname, testpjson.dependencies.hookme.replace('../', '')));
            
            const result = '' + child_process.execSync("(cd test; node index)");
            if(result != 'Ciao\n') {
                console.log('Something wrong, test exit code.');
                process.exit(-1);
            }

            console.log('All good');
            process.exit(0);
        })
    })
});

clint.parse(process.argv.slice(2));
