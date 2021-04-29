'use strict';
const http = require('http');
const fibonacci = require('./fibonacci');

// サーバオブジェクトの生成とリクエストハンドラの設定
http.createServer((req, res) => {
  // http://localhost:3000/10 へのリクエストではreq.urlは'/10'になるのでそこから1文字目を取り除いてnを取得する
  // substr()は文字列の一部を、引数で指定した位置から後方指定した文字数だけ返す
  const n = Number(req.url.substr(1));
  if (Number.isNaN(n)) {
    // nが数値ではない場合は無視
    return res.end();
  }
  const result = fibonacci(n);
  // res.end()で計算結果をレスポンスとして返す
  res.end(result.toString());
}).listen(3000); // 3000ポートでリクエストを待機