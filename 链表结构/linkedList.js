// 单向链表
function LinkedList() {
    // 内部类：节点类
    function Node(data) {
        this.data = data
        this.next = null
    }

    // 链表类的属性
    this.head = null
    this.length = 0

    // 在链表尾部新增一项
    LinkedList.prototype.append = function (data) {
        let newNode = new Node(data)

        // 判断是否是第一个节点
        if (this.length === 0) {
            this.head = newNode
        } else {
            //遍历链表寻找最后一个节点
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }
        this.length += 1
    }

    // 在链表的特定位置插入一项
    LinkedList.prototype.insert = function (data, position) {
        // 对position进行越界判断，即：不能是负数、不能大于链表长度
        if (position < 0 || position > this.length) return false

        let newNode = new Node(data)

        // 判断插入的位置是否是第一个
        if (position === 0) {
            newNode.next = this.head
            this.head = newNode
        } else {
            let index = 0
            let previous = null // 插入位置前一个节点
            let current = this.head
            while (index++ < position) {
                previous = current
                current = current.next
            }
            newNode.next = current
            previous.next = newNode
        }
        this.length += 1
        return true
    }

    // 获取链表对应位置的元素
    LinkedList.prototype.get = function (position) {
        // 越界判断
        if (position < 0 || position >= this.length) return null

        // 获取对应节点的data
        let current = this.head
        let index = 0
        while (index++ < position) {
            current = current.next
        }
        return current.data
    }

    // 返回元素在链表中的索引
    LinkedList.prototype.indexOf = function (data) {
        let current = this.head
        let index = 0
        while (current) {
            if (current.data === data) return index
            current = current.next
            index += 1
        }
        // 未找到，返回-1
        return -1
    }

    // 修改链表中某个位置的的元素
    LinkedList.prototype.update = function (newData, position) {
        if (position < 0 || position >= this.length) return false

        let current = this.head
        let index = 0
        while (index++ < position) {
            current = current.next
        }
        current.data = newData
        return true
    }

    // 移除链表中特定位置的元素
    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) return null

        let current = this.head
        // 判断删除的是否是第一个节点
        if (position === 0) {
            this.head = current.next
        } else {
            let previous = null
            let index = 0
            while (index++<position) {
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        this.length -= 1
        return current.data

    }

    // 从链表中移除一项
    LinkedList.prototype.remove = function (data) {
        let position = this.indexOf(data)
        return this.removeAt(position)

    }

    LinkedList.prototype.isEmpty = function () {
        return this.length === 0
    }

    LinkedList.prototype.size = function () {
        return this.length
    }

    LinkedList.prototype.toString = function () {
        let current = this.head
        let linkedListString = ""

        while (current) {
            linkedListString += current.data + " "
            current = current.next
        }
        return linkedListString
    }
}
