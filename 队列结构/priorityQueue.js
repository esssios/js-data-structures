// 优先级队列
function PriorityQueue() {
    // 创建一个队列元素类：可以理解是java中的内部类
    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }

    this.items = []

    // 优先级数列的插入方法
    PriorityQueue.prototype.enqueue = function (element, priority) {
        let queueElement = new QueueElement(element, priority)

        if (this.items.length === 0) {
            this.items.push(queueElement)
        } else {
            let isAdd = false
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement)
                    isAdd = true
                    break
                }
            }
            if (!isAdd) {
                this.items.push(queueElement)
            }
        }
    }

    // 删除队列第一个元素
    PriorityQueue.prototype.dequeue = function () {
        return this.items.shift()
    }

    // 查看队列第一个元素
    PriorityQueue.prototype.front = function () {
        return this.items[0]
    }

    // 判断队列是否为空
    PriorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0
    }

    // 获取队列的元素个数
    PriorityQueue.prototype.size = function () {
        return this.items.length - 1
    }

    // toString方法
    PriorityQueue.prototype.toString = function () {
        return this.items.join(" ")
    }
}

let pq = new PriorityQueue()
pq.enqueue("vvv", 300)
pq.enqueue("aaa", 200)
pq.enqueue("xxx", 1)
pq.enqueue("ttt", 10)
console.log(pq)