const commander = require('commander');
const VERSION = require('./utils/const');
const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { spawn } = require('child_process')
const ora = require('ora')
const initTemplate = require('./initTemplate');

const actionMap = {
    install: {
        alias: 'i',
        description: 'install template',
        examples: [
            'cli i',
            'cli install'
        ]
    },
    config: {
        alias: 'c',
        description: 'config .clirc',
        examples: [
            'cli config set <k> <v>',
            'cli config remove <k>'
        ]
    },
    '*': {
        alias: '',
        description: 'not found',
        examples: []
    }
}
const projectName = process.argv[2] || 'my-react-app'

const program = new commander.Command(`${projectName}`)
    .description('create one app!')
    .action(async () => {
        if (fs.existsSync(projectName)) {
            console.log(chalk.red('project name is exist!'))
            return
        }
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: '是否使用TypeScript:',
                choices: ['use-TypeScript', 'no-use-TypeScript']
            }
        ])
        initTemplate(answers, projectName)
        await install()
    })

function install() {
    return new Promise((resolve, reject) => {
        const spinner = ora('start start...')
        spinner.start()
        const child = spawn('npm', [
            'install',
            '--save',
            '--save-exact',
            '--loglevel',
            'error',
        ], {
            cwd: `${process.cwd()}/${projectName}/`
        })

        child.on('close', code => {
            if (code !== 0) {
                reject('install faile!');
                return;
            }
            resolve();
            spinner.stop()
            console.log(chalk.green('install success!'))
            console.log(chalk.green(`cd ${projectName}`))
            console.log(chalk.green('npm run dev'))
        });
    })
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
    console.log('\r\n   ' + 'how to use command')
    Object.keys(actionMap).forEach(key => {
        actionMap[key].examples.forEach(examples => {
            console.log('    ' + examples)
        })
    })
}

program.on('-h', help)
program.on('--help', help)
program.version(VERSION, '-v --version').parse(process.argv);

