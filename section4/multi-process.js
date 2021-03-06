'use strict';
const { fork, setupMaster } = require('cluster');

console.log('メインプロセス', process.pid);

// サブプロセスが実行するファイルの指定
setupMaster({ exec: `${__dirname}/web-app` });
// CPUコアの数だけプロセスをフォーク
const cpuCount = require('os').cpus().length;
for (let i = 0; i < cpuCount; i++ ){
  const sub = fork();
  console.log('サブプロセス', sub.process.pid);
  // IPCでサブプロセスにポート番号を送信
  sub.send(3000);
  // IPCで受信したメッセージをハンドリング
  sub.on('message', ({ pid, response }) => {
    console.log(process.pid, `${pid}が${response}を返します`);
  })
}