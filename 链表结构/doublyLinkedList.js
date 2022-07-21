function DoublyLinkedList() {
    // 内部类
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }

    this.head = null
    this.tail = null
    this.length = 0

    // 在链表尾部新增一项
    DoublyLinkedList.prototype.append = function (data) {
        let newNode = new Node(data)

        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.prev = this.tail // newNode.prev指向前一个节点
            this.tail.next = newNode // 前一个节点的next指向newNode
            this.tail = newNode // this.tail指向改变，由指向前一节点变为指向newNode
        }
        this.length += 1
    }

    // 在链表的特定位置插入一项
    DoublyLinkedList.prototype.insert = function (data, position) {
        if (position < 0 || position > this.length) return false
        let newNode = new Node(data)

        // 判断链表是否为空
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            if (position === 0) {
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            } else if (position === this.length) {
                newNode.prev = this.tail
                this.tail.next = newNode
                this.tail = newNode
            } else {
                let current = this.head
                let index = 0
                while (index++ < position) {
                    current = current.next
                }
                newNode.prev = current.prev // newNode.prev指向current.prev
                newNode.next = current // newNode.next指向current
                current.prev.next = newNode // 原本current前一节点的next指向newNode
                current.prev = newNode // current.prev指向newNode
            }
        }
        this.length += 1
    }

    // 获取链表对应位置的元素
    DoublyLinkedList.prototype.get = function (position) {
        if (position < 0 || position > this.length) return null
        let current = null
        if (this.length / 2 >= position) {
            current = this.head
            let index = 0
            while (index++ < position) {
                current = current.next
            }
        } else {
            current = this.tail
            let index = this.length - 1
            while (index-- > position) {
                current = current.prev
            }
        }
        return current.data
    }

    // 返回元素在链表中的索引
    DoublyLinkedList.prototype.indexOf = function (data) {
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
    DoublyLinkedList.prototype.update = function (newData, position) {
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
    DoublyLinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) return null

        let current = this.head
        // 判断是否只有一个节点
        if (this.length === 1) {
            this.head = null
            this.tail = null
        }else {
            if (position === 0) { // 删除第一个节点
                this.head.next.prev = null
                this.head = this.head.next
            } else if (position === this.length -1) { // 删除最后一个节点
                current = this.tail
                this.tail.prev.next = null
                this.tail = this.tail.prev
            } else { // 删除其它节点
                let index= 0
                while (index++<position) {
                    current = current.next
                }
                current.prev.next = current.next
                current.next.prev = current.prev
            }
        }
        this.length -= 1
        return current.data
    }

    // 从链表中移除一项
    DoublyLinkedList.prototype.remove = function (data) {
        let position = this.indexOf(data)
        return this.removeAt(position)

    }

    DoublyLinkedList.prototype.isEmpty = function () {
        return this.length === 0
    }

    DoublyLinkedList.prototype.size = function () {
        return this.length
    }

    DoublyLinkedList.prototype.toString = function () {
        return this.forwardString()
    }

    // 从前往后遍历链表
    DoublyLinkedList.prototype.forwardString = function () {
        let current = this.head
        let forwardString = ""
        while (current) {
            forwardString += current.data + " "
            current = current.next
        }
        return forwardString
    }

    // 从后往前遍历链表
    DoublyLinkedList.prototype.backwardString = function () {
        let current = this.tail
        let backwardString = ""
        while (current) {
            backwardString += current.data + " "
            current = current.prev
        }
        return backwardString
    }
}

let doublyLinkedList = new DoublyLinkedList()
doublyLinkedList.append("aaa")
doublyLinkedList.append("bbb")
doublyLinkedList.append("ccc")
doublyLinkedList.insert("ggg", 1)
doublyLinkedList.insert("rrr", 3)

console.log(doublyLinkedList.forwardString());
// console.log(doublyLinkedList.toString());
// console.log(doublyLinkedList.backwardString());
// console.log(doublyLinkedList.get(4));
console.log(doublyLinkedList.removeAt(4));
console.log(doublyLinkedList.toString());