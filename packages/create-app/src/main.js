const commander = require('commander');
const VERSION = require('./const');
const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { spawn } = require('child_process');
const ora = require('ora');
const initTemplate = require('./initTemplate');
const path = require('path')

const projectName = process.argv[2] || 'my-react-app'

const program = new commander.Command(`${projectName}`)
    .description('create one app!')
    .action(async () => {
        if (fs.existsSync(projectName)) {
            console.log(chalk.red('project name is exist!'))
            return
        }
        const answersNpm = await inquirer.prompt([
            {
                type: 'list',
                name: 'useNpm',
                message: '选择安装方式:',
                choices: ['use-npm', 'use-yarn']
            }
        ])
        console.log()
        const answersTs = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: '是否使用TypeScript:',
                choices: ['use-TypeScript', 'no-use-TypeScript']
            }
        ])
        console.log()
        initTemplate(answersTs, projectName)
        await install(projectName, answersNpm)
    })

function install(projectName, answersNpm) {
    return new Promise((resolve, reject) => {
        const { useNpm } = answersNpm
        let command = useNpm === 'use-npm' ? 'npm' : 'yarn'
        const args = ['install'];
        const child = spawn(command, args, {
            cwd: path.resolve(process.cwd(), projectName),
            stdio: 'inherit'
        })
        child.on('close', code => {
            if (code !== 0) {
                reject('install faile!');
                return;
            }
            resolve();
            console.log(chalk.green('install success!'))
            console.log(chalk.green(`cd ${projectName}`))
            console.log(chalk.green('npm run dev'), '|', chalk.green('yarn dev'))
        });
    })
}

const actionMap = {
    'create-app': {
        alias: '',
        description: 'create one app!',
        examples: [
            'create-app appName'
        ]
    }
}

Object.keys(actionMap).forEach(key => {
    program.command(key)
        .description(actionMap[key].description)
        .alias(actionMap[key].alias)
        .action(() => {
            console.log(key)
        })
})

function help() {
    console.log()
    console.log('How to use command:')
    Object.keys(actionMap).forEach(key => {
        actionMap[key].examples.forEach(examples => {
            console.log('  ' + examples)
        })
    })
    console.log()
}

program.on('-h', help)
program.on('--help', help)
program.version(VERSION, '-v --version').parse(process.argv);
