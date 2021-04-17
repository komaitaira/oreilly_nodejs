function sleep(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data++);
      // resolve(data);
      reject("error occurred.");
    }, 1000);
  });
}

sleep(0).then((data) => {
  return sleep(data);
}).then((data) => {
  return sleep(data);
}).then((data) => {
  return sleep(data);
}).then((data) => {
  return sleep(data);
}).then((data) => {
  return sleep(data);
}).catch((error) => {
  console.error(error);
}).finally(() => {
  console.log("finally called.");
})