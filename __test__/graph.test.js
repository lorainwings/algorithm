const { cloneGraph, cloneGraphBFS } = require('../graph/leetcode')

describe('克隆graph', () => {
    // 测试用例1
    it('深度优先遍历:[[2,4],[1,3],[2,4],[1,3]]', () => {
        expect(cloneGraph([[2, 4], [1, 3], [2, 4], [1, 3]])).toEqual([[2, 4], [1, 3], [2, 4], [1, 3]])
    });
    it('深度优先遍历:[]', () => {
        expect(cloneGraph([])).toEqual([])
    });
    it('深度优先遍历:[[]]', () => {
        expect(cloneGraph([[]])).toEqual([[]])
    });


    it('广度优先遍历:[[2,4],[1,3],[2,4],[1,3]]', () => {
        expect(cloneGraphBFS([[2, 4], [1, 3], [2, 4], [1, 3]])).toEqual([[2, 4], [1, 3], [2, 4], [1, 3]])
    });
    it('广度优先遍历:[]', () => {
        expect(cloneGraphBFS([])).toEqual([])
    });
    it('广度优先遍历:[[]]', () => {
        expect(cloneGraphBFS([[]])).toEqual([[]])
    });
});

