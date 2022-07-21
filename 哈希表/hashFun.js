// 哈希函数
// 1、将字符串转成较大的数字：hashCode
// 2、通过取余数的操作，将hashCode压缩到数组(大小)范围之内
function hashFunc(str, size) {
    let hashCode = 0

    // 通过霍纳法则提高hashCode的计算效率
    for (let i = 0;  i< str.length; i++) {
        hashCode = 37*hashCode + str.charCodeAt(i)
    }

    // 取余
    let index = hashCode%size

    return index
}
console.log(hashFunc("abc", 7));
console.log(hashFunc("cba", 7));
console.log(hashFunc("nba", 7));
console.log(hashFunc("mba", 7));