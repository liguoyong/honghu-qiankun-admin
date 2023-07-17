const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 读取配置文件
const configFile = path.join(__dirname, './apps.json');
const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));

// 生成启动命令
const startCommands = config.apps.map(subApp => {
  const subAppPath = path.resolve(__dirname, subApp.path);
  return `cd ${subAppPath} && npm start`;
});

// 启动子应用
startCommands.forEach(command => {
  const childProcess = spawn(command, { stdio: 'inherit', shell: true });
  childProcess.on('error', error => {
    console.error('Command execution failed:', error);
  });
});
