#! /usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const loader = require('./lib/loader');
const files = require('./lib/files');
const fs = require('fs');
const _ = require('lodash');

clear();
console.log(
    chalk.blue(
        figlet.textSync('TSA-cli', { horizontalLayout: 'full' })
    )
);

const run = async () => {
    const details = await inquirer.askProjectDetails();
    const { projectName, description } = details;
    let basePath = '';
    let projectPath = '';
    let srcpath = '';
    let testpath = '';

    loader.runLoader('Get current path and create directory', () => {
        basePath = process.cwd();
        projectPath = basePath + '/' + projectName;
        srcpath = projectPath + '/src';
        testpath = projectPath + '/__tests__';
        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath);
            fs.mkdirSync(srcpath);
            fs.mkdirSync(testpath);
        }
    });

    loader.runLoader('Create package.json', () => {
        const baseFile = require('./base/base.package');
        baseFile.name = projectName;
        baseFile.description = description;
        fs.writeFileSync(projectPath + '/package.json', JSON.stringify(baseFile, null, "\t"));
    });

    loader.runLoader('Create jest.config.js', () => {
        const baseFile = require('./base/base.jest');
        const result = 'module.exports = ' + JSON.stringify(baseFile, null, "\t");
        fs.writeFileSync(projectPath + '/jest.config.js', result);
    });

    loader.runLoader('Create tsconfig.json', () => {
        const baseFile = require('./base/base.tsconfig');
        const result = JSON.stringify(baseFile, null, "\t");
        fs.writeFileSync(projectPath + '/tsconfig.json', result);
    });

    loader.runLoader('Create sources', () => {
        const appFilePath = projectName.toLowerCase();
        const appName = (_.startCase(_.toLower(projectName))).replace(/\s/g, '');

        const result = `// app class for ${projectName}
        export class ${appName} {
        }`;
        fs.writeFileSync(srcpath + `/${appFilePath}.ts`, result);

        const tests = `// app tests for ${projectName}
        import { ${appName} } from '../src/${appFilePath}';
        describe('Testing Async Proc', () => {
            it('should create ${appName}', () => {
                const obj = new ${appName};
                expect(obj).toBeTruthy();
            });
        })`;
        fs.writeFileSync(testpath + `/${appFilePath}.test.ts`, tests);
    });

    loader.runLoader('Create indexes', () => {
        const appFilePath = projectName.toLowerCase();
        const js = `module.exports = require('./bin/${appFilePath}');`;
        fs.writeFileSync(projectPath + '/index.js', js);
        const ts = `export * from './bin/${appFilePath}';`;
        fs.writeFileSync(projectPath + '/index.d.ts', ts);
    });
}

run();