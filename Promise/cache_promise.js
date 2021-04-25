function parseJSONAsync(json) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(json));
      } catch (err) {
        reject(err);
      }
    }, 1000);
  })
}

const cache = {};

function parseJSONAsyncWithCache(json) {
  const cached = cache[json];
  if (cached) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(cached.result);
        } catch {
          reject(cached.err)
        }
      })
    })
  }
  parseJSONAsync(json);
  cache[json] = { err, result };
}

parseJSONAsyncWithCache(
  '{"message": "Hello", "to": "World"}',
  (err, result) => {
    console.log("1回目の結果", err, result);
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
// 2回目の呼び出し完了
// 2回目の結果 null { message: 'Hello', to: 'World' }
// 3回目の呼び出し完了
// 3回目の結果 null { message: 'Hello', to: 'World' }
// 4回目の呼び出し完了
// 4回目の結果 null { message: 'Hello', to: 'World' }