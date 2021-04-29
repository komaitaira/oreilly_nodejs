'use strict';
const http = require('http');
const fibonacci = require('./fibonacci');
const pid = process.pid;


// IPC（プロセス間通信）でメッセージを受信して指定されたポート番号でwebサーバを起動
process.on('message', port => {
  console.log(pid, `ポート${port}でwebサーバを起動します`);
  // サーバオブジェクトの生成とリクエストハンドラの設定
  http.createServer((req, res) => {
    // http://localhost:3000/10 へのリクエストではreq.urlは'/10'になるのでそこから1文字目を取り除いてnを取得する
    // substr()は文字列の一部を、引数で指定した位置から後方指定した文字数だけ返す
    const n = Number(req.url.substr(1));
    if (Number.isNaN(n)) {
      // nが数値ではない場合は無視
      return res.end();
    }
    const response = fibonacci(n);
    // 結果をIPCで送信
    process.send({ pid, response });
    // res.end()で計算結果をレスポンスとして返す
    res.end(response.toString());
  }).listen(port);
})

