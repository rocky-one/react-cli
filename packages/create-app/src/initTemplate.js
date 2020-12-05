const ora =  require('ora')
const fs =  require('fs-extra')
const path =  require('path')
const os =  require('os')

function initTemplate(answers, projectName) {
    const { template } = answers
    let spinner = ora('Initialization start...')
    spinner.start()
    if (template === 'use-TypeScript') {
        fs.copySync(path.join(__dirname, '../../ts-react-template'), `${process.cwd()}/${projectName}/`)
    } else {
        fs.copySync(path.join(__dirname, '../../react-template'), `${process.cwd()}/${projectName}/`)
    }
    updatePackage(projectName)
    console.log('Initialization complete！')
    spinner.stop()
}

function updatePackage(projectName) {
    const packagePath = path.join(process.cwd(), `${projectName}/package.json`);
    const packageJson = JSON.parse(fs.readFileSync(packagePath));
    packageJson.name = projectName
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL);
}

module.exports = initTemplate