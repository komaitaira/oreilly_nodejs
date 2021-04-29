const http = require("http");
const todos = [
  { id: 1, title: "ネーム", completed: false },
  { id: 2, title: "下書き", completed: true }
];

// HTTPサーバの初期化
const server = http.createServer((req, res) => {
  if (req.url === '/api/todos') {
    if (req.method === 'GET') {
      res.setHeader('Content-type', 'application/json');
      return res.end(JSON.stringify(todos));
    }
    // GET以外のHTTPメソッドはサポートしないため、405を代入(method not allowed)
    res.statusCode = 405;
  } else {
    // /api/todos以外のURLはないので404を代入(not found)
    res.statusCode = 404;
  }
  res.end();
}).listen(3000); // 3000番ポートでリクエストを待機