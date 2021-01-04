const { twoNumPlus, matchAvailableBrackets, minCoverSubStr } = require('../map')

describe('有效的括号', () => {
    // 测试用例1
    it('()->true', () => {
        expect(matchAvailableBrackets('(      )')).toEqual(true);
    });
    it('()[]{}->true', () => {
        expect(matchAvailableBrackets('(     )[]{}')).toEqual(true);
    });
    it('(]->false', () => {
        expect(matchAvailableBrackets('(  ]')).toEqual(false);
    });
    it('([)]->false', () => {
        expect(matchAvailableBrackets('([)]')).toEqual(false);
    });
    it('{[]}->false', () => {
        expect(matchAvailableBrackets('{[]}')).toEqual(true);
    });
});


describe('两数之和', () => {
    // 测试用例1
    it('[2, 7, 11, 15],9->[0,1]', () => {
        const arr = [2, 7, 11, 15]
        expect(twoNumPlus(arr, 9)).toEqual([0, 1]);
    });
    it('[2, 7, 11, 15, 10, 23],34->[2,5]', () => {
        const arr = [2, 7, 11, 15, 10, 23]
        expect(twoNumPlus(arr, 34)).toEqual([2, 5]);
    });
});


describe('最小覆盖子串', () => {
    // 测试用例1
    it('S=ADOBECODEBANC,T=ABC->BANC', () => {
        const S = 'ADOBECODEBANC'
        const T = 'ABC'
        expect(minCoverSubStr(S, T)).toEqual('BANC');
    });
});