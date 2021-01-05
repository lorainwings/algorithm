const bubbleSort = (arr) => {
    for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                arr[j] = arr[j] + arr[j + 1];
                arr[j + 1] = arr[j] - arr[j + 1];
                arr[j] = arr[j] - arr[j + 1];
            }
        }
    }
    return arr;
}

const selectSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min === i) continue; // 只有一轮下来最小的值已经变化才需要交换位置
        [arr[min], arr[i]] = [arr[i], arr[min]];
    }
    return arr;
}

const maxSpaceSort = (arr) => {
    if (arr.length < 2) return 0;
    let max = 0;
    for (let i = arr.length, last = arr.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        if (i === last) continue;
        if (max < arr[i + 1] - arr[i]) {
            max = arr[i + 1] - arr[i];
        }

    }
    return max;
}

const parityIndexSort = (arr) => {
    let o = 0, e = 1, nrr = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] % 2 === 0) {
            nrr[o] = arr[i];
            o += 2;
        } else {
            nrr[e] = arr[i];
            e += 2;
        }
    };
    return nrr;
}

const maxAtIndex = (arr, k) => {
    const len = arr.length - 1;
    for (let i = len; i > len - k; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        };
    }
    return arr[len - k + 1];
}

// 欠缺的第一个正整数
const minPositiveInt = arr => {
    let pInt = 1;
    const nrr = arr.filter(item => item > 0).sort((a, b) => a - b);
    const len = nrr.length;
    if (len) {
        for (let i = 0; i < len; i++) {
            if (nrr[i] === pInt) {
                pInt++;
            } else {
                return pInt;
            }
        }
        return nrr[len - 1] + 1
    } else {
        return 1;
    }
}

// 欠缺的第一个正整数(最优解)
const minPositiveIntBest = arr => {
    const nrr = arr.filter(item => item > 0);
    const len = nrr.length;
    if (len) {
        for (let i = 0, pInt = 1; i < len; i++) {
            let min = i;
            for (let j = i + 1; j < len; j++) {
                if (nrr[j] < nrr[i]) {
                    min = j;
                }
            }
            if (i !== min) {
                [nrr[i], nrr[min]] = [nrr[min], nrr[i]]
            }
            if (nrr[i] === pInt) {
                pInt++;
            } else {
                return pInt;
            }
        }
        return nrr[len - 1] + 1
    } else {
        return 1;
    }
}

module.exports = {
    bubbleSort,
    selectSort,
    maxSpaceSort,
    parityIndexSort,
    maxAtIndex,
    minPositiveInt,
    minPositiveIntBest
}