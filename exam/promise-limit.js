/* 对并发做一个最大限制 */

const loadImg = (urlId) => {
  const url = `https://www.image.com/${urlId}`;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = function () {
      reject(urlId);
    };

    img.onload = function () {
      resolve(urlId);
    };
    img.src = url;
  });
};

const urlIds = [1, 2, 3, 4, 5];

const loadByLimit = (urlIds, loadImg, limit) => {
  const urlIdsCopy = [...urlIds];

  if (urlIdsCopy.length <= limit) {
    // 如果数组长度小于最大并发数，直接全部请求
    const promiseArray = urlIds.map((urlId) => loadImg(urlId));
    return Promise.all(promiseArray);
  }

  // 注意 splice 方法会改变 urlIdsCopy 数组
  const promiseArray = urlIdsCopy
    .splice(0, limit)
    .map((urlId) => loadImg(urlId));

  urlIdsCopy
    .reduce(
      (prevPromise, urlId) =>
        prevPromise
          .then(() => Promise.race(promiseArray))
          .catch((error) => {
            console.log(error);
          })
          .then((resolvedId) => {
            // 将 resolvedId 剔除出 promiseArray 数组
            // 这里的删除只是伪代码，具体删除情况要看后端 Api 返回结果
            let resolvedIdPostion = promiseArray.findIndex(
              (id) => resolvedId === id
            );
            promiseArray.splice(resolvedIdPostion, 1);
            promiseArray.push(loadImg(urlId));
          }),
      Promise.resolve()
    )
    .then(() => Promise.all(promiseArray));
};
