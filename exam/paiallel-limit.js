/**
 * 并发限制控制
 * 写一个构造函数, 完成下面的任务执行
 */

/* 
class SuperTask {
  // 完成内部代码
}

const superTask = new SuperTask();
// 测试代码如下
function addTask(time, name) {
  const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));
  superTask.add(() => timeout(time)).then(() => console.log(`任务${name}完成`));
}
// 需要满足一下测试示例
addTask(10000, 1); // 10s后输出,任务1完成
addTask(5000, 2); // 5s后输出,任务2完成
addTask(3000, 3); // 8s后输出,任务一完成
addTask(4000, 4); // 12s后输出,任务一完成
addTask(5000, 5); // 15s后输出,任务一完成 
*/

class SuperTask {
  #runningNum = 0;
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount;
    this.tasks = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      });
      this.run();
    });
  }

  run() {
    while (this.#runningNum < this.parallelCount && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift();
      task()
        .then(resolve, reject)
        .finally(() => {
          this.#runningNum--;``
          this.run();
        });
      this.#runningNum++;
    }
  }
}

const superTask = new SuperTask();
function addTask(time, name) {
  const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));
  superTask.add(() => timeout(time)).then(() => console.log(`任务${name}完成`));
}
addTask(10000, 1); // 10s后输出,任务1完成
addTask(5000, 2); // 5s后输出,任务2完成
addTask(3000, 3); // 8s后输出,任务一完成
addTask(4000, 4); // 12s后输出,任务一完成
addTask(5000, 5); // 15s后输出,任务一完成
