// 哈希表(基于数组实现)
function HashTable() {
    this.storage = [] // 存储bucket
    this.count = 0 // 哈希表中存储的tuple个数
    this.limit = 7 // this.storage的默认长度

    // 哈希函数
    // 1、将字符串转成较大的数字：hashCode
    // 2、通过取余数的操作，将hashCode压缩到数组(大小)范围之内
    HashTable.prototype.hashFunc = function (str, size) {
        let hashCode = 0

        // 通过霍纳法则提高hashCode的计算效率
        for (let i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }

        // 取余
        let index = hashCode % size

        return index
    }

    // 哈希表扩容/缩容
    HashTable.prototype.resize = function (newLimit) {
        let oldStorage = this.storage
        console.log(oldStorage);

        this.storage = []
        this.count = 0
        this.limit = newLimit

        for (let i = 0; i < oldStorage.length; i++) {
            let bucket = oldStorage[i]

            if (bucket === null) continue

            for (let j = 0; j < bucket.length; j++) {
                let tuple = bucket[j]
                this.put(tuple[0], tuple[1])

            }

        }
    }

    // 插入与修改
    HashTable.prototype.put = function (key, value) {
        // 1、根据key获取对应的index
        let index = this.hashFunc(key, this.limit)
        // 2根据index取出对应的bucket
        let bucket = this.storage[index]

        // 3、判断该bucket是否为null
        if (bucket === undefined) {
            bucket = []
            this.storage[index] = bucket
        }

        // 4、判断是否修改数据
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] === key) {
                tuple[1] = value
                return
            }
        }

        // 5、进行添加操作
        bucket.push([key, value])
        this.count += 1

        // 6、判断是否需要扩容操作
        if (this.count > this.limit * 0.75) {
            // 设置容量恒为质数
            // 例如：14 --> 17
            let newSize = this.limit*2
            let newPrime = this.getPrime(newSize)
            this.resize(newPrime)
        }
    }

    // 获取操作
    HashTable.prototype.get = function (key) {
        // 1、根据key获取对应的index
        let index = this.hashFunc(key, this.limit)

        // 2根据index取出对应的bucket
        let bucket = this.storage[index]

        // 3、判断该bucket是否为null，当bucket为null时，key对应的value一定为null
        if (bucket === undefined) return null

        // 4、线性查找bucket中每一个key是否等于传入的key
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] === key) return tuple[1]
        }

        // 5、遍历完bucket中的元组仍未找到对应的key，直接return null
        return null
    }

    // 删除操作
    HashTable.prototype.remove = function (key) {
        // 1、根据key获取对应的index
        let index = this.hashFunc(key, this.limit)

        // 2根据index取出对应的bucket
        let bucket = this.storage[index]

        // 3、判断该bucket是否为null，当bucket为null时，key对应的value一定为null
        if (bucket === undefined) return null

        // 4、线性查找bucket中每一个key是否等于传入的key，删除对应的tuple，并返回value
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count--
                // 5、判断是否需要缩容
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    // 设置容量恒为质数
                    let newSize = Math.floor(this.limit / 2)
                    let newPrime = this.getPrime(newSize)
                    this.resize(newPrime)
                }
                return tuple[1]
            }
        }

        // 6、遍历完bucket中的元组仍未找到对应的key，直接return null
        return null
    }

    // 判断哈希表是否为null
    HashTable.prototype.isEmpty = function () {
        return this.count === 0
    }

    // 判断哈希表中的元素个数
    HashTable.prototype.size = function () {
        return this.count
    }

    // 判断摸某个数是否是质数
    HashTable.prototype.isPrime = function (num) {
        // 获取num的平方根
        let temp = parseInt(Math.sqrt(num))

        // 循环判断
        for (let i = 2; i <= temp; i++) {
            if (num % i === 0) {
                return false
            }
        }

        return true
    }

    // 获取质数
    HashTable.prototype.getPrime = function () {
        while (!this.isPrime(num)) {
            num++
        }
        return num
    }
}

let ht = new HashTable()
ht.put("abc", 123)
ht.put("cba", 222)
ht.put("nba", 111)
ht.put("mba", 777)

console.log(ht.get("nba"));
console.log(JSON.stringify(ht));

ht.put("nba", "hhhhhh")

console.log(ht.get("nba"));

ht.remove("nba")

console.log(ht.get("nba"));