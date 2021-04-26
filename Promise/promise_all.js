function asyncFunc() {
  return new Promise(resolve => setTimeout(resolve, 1000))
}

const start = Date.now()

asyncFunc()
 .then(asyncFunc)
 .then(asyncFunc)
 .then(asyncFunc)
 .then(() => 
  console.log("逐次実行所要時間", Date.now() - start)
 )
 
 Promise
  .all([
   asyncFunc(),
   asyncFunc(),
   asyncFunc(),
  ])
  .then(() => 
   console.log("並行実行所要時間", Date.now() - start)
  )