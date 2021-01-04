const { matchAvailableBrackets } = require('../stack')

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

