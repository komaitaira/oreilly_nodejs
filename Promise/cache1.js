// JSONをパースする関数
function parseJSONAsync(json, callback) {
  // 非同期処理
  setTimeout(() => {
    try {
      callback(null, JSON.parse(json));
    } catch (err) {
      callback(err);
    }
  }, 1000);
}

// 空のオブジェクトを定義
const cache = {};

// キャッシュを利用してparseJSONAsyncを呼び出す関数
function parseJSONAsyncWithCache(json, callback) {
  // cacheオブジェクトのjsonというキーの値をcachedと定義。
  const cached = cache[json];
  // 1回目の呼び出し時点では値が空なので処理は走らない。
  if (cached) {
    callback(cached.err, cached.result);
    return;
  }
  parseJSONAsync(json, (err, result) => {
    // ここでjsonキーに「エラーの中身」と「JSONをパースした結果」が入ったオブジェクトを代入。
    cache[json] = { err, result };
    callback(err, result);
  });
}

// 1回目の実行
parseJSONAsyncWithCache(
  '{"message": "Hello", "to": "World"}',
  (err, result) => {
    console.log("1回目の結果", err, result);
    // コールバック関数の中で2回目の実行
    parseJSONAsyncWithCache(
      '{"message": "Hello", "to": "World"}',
      (err, result) => {
        console.log("2回目の結果", err, result);
      }
    )
    console.log("2回目の呼び出し完了");
  }
)
console.log("1回目の呼び出し完了");

/* 出力結果 */
// 1回目の呼び出し完了
// 1回目の結果 null { message: 'Hello', to: 'World' }
// 2回目の結果 null { message: 'Hello', to: 'World' }
// 2回目の呼び出し完了