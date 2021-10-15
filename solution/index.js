module.exports = function (Homework) {
  function promisify(f) {
    return function (...args) {
      return new Promise((resolve) => {
        function callback(result) {
          resolve(result);
        }

        args.push(callback)

        f.apply(f, args);
      });
    }
  }

  return async (array, fn, initialValue, cb) => {
    let result = initialValue;
    const getLength = promisify(array.length);
    const promiseLess = promisify(Homework.less);
    const promiseAdd = promisify(Homework.add);
    const promiseFn = promisify(fn);
    const promiseGetElem = promisify(array.get);
    for (let i = 0; await promiseLess(i, await getLength()); i = await promiseAdd(i, 1)) {
      result = await promiseFn(result, await promiseGetElem(i), i, array);
    }
    cb(result);
  }
}
