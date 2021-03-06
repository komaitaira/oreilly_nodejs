function parseJSONAsync(json, callback) {
  setTimeout(() => {
    try {
      callback(null, JSON.parse(json));
    } catch (err) {
      callback(err);
    }
  }, 1000);
}

const cache = {};

function parseJSONAsyncWithCache(json, callback) {
  const cached = cache[json];
  console.log(cached)
  if (cached) {
    // キャッシュに値が存在する場合でも、非同期的にコールバックを実行する
    setTimeout(() => callback(cached.err, cached.result), 0);
    return;
  }
  parseJSONAsync(json, (err, result) => {
    cache[json] = { err, result };
    callback(err, result);
  });
}

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

// 実行結果は以下のようになる。コールバックをパラメータとする関数は、それを常に同期的に実行するか、常に非同期的に実行するかのどちらかでなければならない

// undefined
// 1回目の呼び出し完了
// 1回目の結果 null { message: 'Hello', to: 'World' }
// { err: null, result: { message: 'Hello', to: 'World' } }
// 2回目の呼び出し完了
// 2回目の結果 null { message: 'Hello', to: 'World' }