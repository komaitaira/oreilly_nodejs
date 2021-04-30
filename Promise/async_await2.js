function add(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data++);
      resolve(data);
    }, 1000);
  });
}

async function callAdd() {
  let result = await add(0);
  result = await add(result);
  result = await add(result);
  result = await add(result);
  // throw new Error();
  return result;
}

callAdd().then(function (result) {
  console.log(`実行回数${result}回`);
}).catch(function (err) {
  console.error(err);
}).finally(function () {
  console.log("finally called.");
})

/* 出力結果 */
// 0
// 1
// 2
// 3
// 実行回数4回
// finally called.