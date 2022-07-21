// 基于数组实现的队列，效率不高
function Queue(elements) {
    this.items = elements.length != 0 ? [...elements]:[]

    // 元素加入队列
    Queue.prototype.enqueue = function (element) {
        this.items.push(element)
    }

    // 删除队列第一个元素
    Queue.prototype.dequeue = function () {
        return this.items.shift()
    }

    // 查看队列第一个元素
    Queue.prototype.front = function () {
        return this.items[0]
    }

    // 判断队列是否为空
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0
    }

    // 获取队列的元素个数
    Queue.prototype.size = function () {
        return this.items.length - 1
    }

    // toString方法
    Queue.prototype.toString = function () {
        return this.items.join(" ")
    }
}

// 击鼓传花
function passGame(nameList, num) {
    // 1、名字加入队列
        let queue = new Queue(nameList)
    // for (let i = 0; i < nameList.length; i++) {
    //     queue.enqueue(nameList[i])
    // }
    // 2、开始计数
    while (queue.size() > 0) {
        // 2.1、不是num时，重新加入队列尾部
        for (let i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue())
        }
        // 2.2、是num时，将使其从队列中删除
        queue.dequeue()
    }

    let winner = queue.front()
    console.log(`获胜者是：${winner}----胜者所在原数组的下标是：${nameList.indexOf(winner)}`);
}
passGame(['dd', 'kk', 'gg', 'tt', 'qq'], 10)