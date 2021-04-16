// const { transform, onChange } = require('../exam/alipay.js')
const { transform, onChange } = require('../exam/alibaba.js')

describe('transform算法', () => {
    // 测试用例1
    it('测试用例1', () => {
        const arr = [
            { id: 1, name: 'i1' },
            { id: 2, name: 'i2', parentId: 1 },
            { id: 4, name: 'i4', parentId: 3 },
            { id: 3, name: 'i3', parentId: 2 },
        ];
        const resArr = [
            {
                id: 1,
                name: 'i1',
                children: [
                    {
                        id: 2,
                        name: 'i2',
                        parentId: 1,
                        children: [
                            {
                                id: 3,
                                name: 'i3',
                                parentId: 2,
                                children: [
                                    {
                                        id: 4,
                                        name: 'i4',
                                        parentId: 3,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];
        expect(transform(arr)).toEqual(resArr);
    });
    // 测试用例2
    it('测试用例2', () => {
        const arr = [
            { id: 1, name: 'i1' },
            { id: 2, name: 'i2', parentId: 1 },
            { id: 4, name: 'i4', parentId: 3 },
            { id: 3, name: 'i3', parentId: 2 },
            { id: 11, name: 'i11', parentId: 'UFO' },
        ];
        const sortArr = [
            {
                id: 1,
                name: 'i1',
                children: [
                    {
                        id: 2,
                        name: 'i2',
                        parentId: 1,
                        children: [
                            {
                                id: 3,
                                name: 'i3',
                                parentId: 2,
                                children: [
                                    {
                                        id: 4,
                                        name: 'i4',
                                        parentId: 3,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];
        expect(transform(arr)).toEqual(sortArr);
    })

    it('测试用例3', () => {
        const arr = [
            { id: 1, name: 'i1', parentId: 4 },
            { id: 2, name: 'i2', parentId: 1 },
            { id: 3, name: 'i3', parentId: 2 },
            { id: 4, name: 'i4', parentId: 3 },
        ]
        const res = [];
        expect(transform(arr)).toEqual(res);
    })
});



