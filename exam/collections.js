/* 
- 收集于百词斩:

给定由普通英文字母组成的非空字符串s1，要求将连续出现的字符压缩成字符和该字符连续出现的次数，并返回新的字符串s2。s1字符串的长度不超过100。

输入描述: 
全部由普通英文字符组成的长度不超过100的字符串 。

输出描述: 
由英文字符和数字组成的字符串，其中数字表示它前面的字符在输入字符串中连续出现的次数。

示例

输入：
aabccccaaa 

输出：
a2bc4a3  */


const strCount = (s1) => {
    let s2 = '';
    if (typeof s1 !== 'string') {
        return new TypeError('s1 is not string!');
    }
    /* 

    此处有个正则的坑, test加了g是匹配全部字符串的, 所有 'absdfa___ds123'这些都是能匹配的, 所以必须加上开头和结尾 ^$
    扩展=>仅匹配字母的正则:
    1. /^[^\d\W\_]+$/gi
    2. /^[a-z]+$/gi

    */
    if (!/^[a-z]$/gi.test(s1) || s1.length > 100) {
        return new Error('s1 must composed of letters and length must less than 100!');
    }
    for (let i = 0, len = 1; i < s1.length; i++) {
        const current = s1[i];
        const next = s1[i + 1];

        if (next === current) {
            len++;
        } else {
            const part = `${current}${len > 1 ? len : ''}`
            s2 += part;
            len = 1;
        }
    }
    return s2;
}

