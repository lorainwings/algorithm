const { bubbleSort, selectSort, maxSpaceSort, parityIndexSort, maxAtIndex, minPositiveInt, minPositiveIntBest } = require('../sort')

describe('排序算法', () => {
    // 测试用例1
    it('冒泡排序', () => {
        const arr = [1, 32, 12, 22, 3, 14, 22, 45, 122];
        const sortArr = [1, 3, 12, 14, 22, 22, 32, 45, 122];
        expect(bubbleSort(arr)).toEqual(sortArr);
    });
    // 测试用例2
    it('选择排序', () => {
        const arr = [1, 32, 12, 22, 3, 14, 22, 45, 122];
        const sortArr = [1, 3, 12, 14, 22, 22, 32, 45, 122];
        expect(selectSort(arr)).toEqual(sortArr);
    })
});

describe('最大间距', () => {
    // 测试用例
    it('只有1位数,结果应该是0', () => {
        expect(maxSpaceSort([10])).toBe(0);
    });
    it('返回相邻的最大值', () => {
        expect(maxSpaceSort([1, 12, 6, 3, 9, 18, 20])).toBe(6);
    });
    it('返回相邻的最大值', () => {
        expect(maxSpaceSort([1, 13, 16, 19])).toBe(12);
    });
});

describe('按奇偶排序数组', () => {
    it('A[i]为奇数,i为奇数;A[i]为偶数,i为偶数', () => {
        expect(parityIndexSort([4, 2, 5, 7])).toEqual([4, 5, 2, 7]);
    });
    it('A[i]为奇数,i为奇数;A[i]为偶数,i为偶数', () => {
        expect(parityIndexSort([5, 2, 4, 7])).toEqual([2, 5, 4, 7]);
    });
    it('A[i]为奇数,i为奇数;A[i]为偶数,i为偶数', () => {
        expect(parityIndexSort([5, 7, 2, 4])).toEqual([2, 5, 4, 7]);
    });
});

describe('数组中的第K个最大元素', () => {
    it('[3,2,1,5,6,4], k=2 -> 5', () => {
        expect(maxAtIndex([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
    });
    it('[3,2,3,1,2,4,5,5,6], k=4 -> 4', () => {
        expect(maxAtIndex([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toEqual(4);
    });
});

describe('欠缺的第一个正整数', () => {
    it('[1,2,0] -> 3', () => {
        expect(minPositiveInt([1, 2, 0])).toEqual(3);
    });
    it('[3,4,-1,1] -> 2', () => {
        expect(minPositiveInt([3, 4, -1, 1])).toEqual(2);
    });
    it('[7,8,9,11,12] -> 1', () => {
        expect(minPositiveInt([7, 8, 9, 11, 12])).toEqual(1);
    });
});

describe('欠缺的第一个正整数[最优解]', () => {
    it('[1,2,0] -> 3', () => {
        expect(minPositiveIntBest([1, 2, 0])).toEqual(3);
    });
    it('[3,4,-1,1] -> 2', () => {
        expect(minPositiveIntBest([3, 4, -1, 1])).toEqual(2);
    });
    it('[7,8,9,11,12] -> 1', () => {
        expect(minPositiveIntBest([7, 8, 9, 11, 12])).toEqual(1);
    });
});