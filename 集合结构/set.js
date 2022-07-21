// 集合类
function Set() {
    this.items = {}

    Set.prototype.add = function (value) {
        if(this.has(value)) return false
        this.items[value] = value
        return true
    }

    Set.prototype.has = function (value) {
        // 判断集合是否包含该元素
        return this.items.hasOwnProperty(value)
    }

    Set.prototype.remove = function (value) {
        if (!this.has(value)) return false
        delete this.items[value]
        return true
    }

    Set.prototype.clear = function () {
        this.items = {}
    }

    Set.prototype.size = function () {
        return Object.keys(this.items).length
    }

    Set.prototype.values = function () {
        return Object.keys(this.items)
    }

    // 求并集
    Set.prototype.union = function (otherSet) {
        let unionSet = new Set()

        // 方法一
        let values = [...this.values(), ...otherSet.values()]
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]) // 集合添加时，会过滤重复的元素
        }

        // 方法二
        // let values = this.values()
        // for (let i = 0; i < values.length; i++) {
        //     unionSet.add(values[i])
        // }
        // values = otherSet.values()
        // for (let i = 0; i < values.length; i++) {
        //     unionSet.add(values[i])
        // }
        return unionSet
    }
    // 交集
    Set.prototype.intersetion = function (otherSet) {
        let intersetionSet = new Set()
        let values =  this.values()
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersetionSet.add(values[i])
            }
        }
        return intersetionSet
    }

    // 差集
    Set.prototype.different = function (otherSet) {
        let differentSet = new Set()
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                differentSet.add(values[i])
            }
        }
        return differentSet
    }

    // 子集，判断其他集合是否是该集合的子集
    Set.prototype.subset = function (otherSet) {
        let values = otherSet.values()
        for (let i = 0; i < values.length; i++) {
            if (!this.has(values[i])) return false
        }
        return true
    }
}

let setA = new Set()
setA.add("aaa")
setA.add("bbb")
setA.add("ccc")
console.log(setA.values())
let setB = new Set()
// setB.add("ggg")
setB.add("bbb")
setB.add("aaa")
// console.log(setA.union(setB).values());
// console.log(setA.intersetion(setB).values());
console.log(setA.subset(setB));
console.log(JSON.stringify(setA));
