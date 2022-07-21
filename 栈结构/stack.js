function Stack() {
    this.items = []
    
    // 入栈
    Stack.prototype.push = function(element) {
        this.items.push(element)
    }

    // 出栈
    Stack.prototype.pop = function () {
        return this.items.pop()
    }

    // 查看栈顶元素
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1]
    }
    
    // 判断栈是否为空
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0
    }
    
    // 获取栈中的元素个数
    Stack.prototype.size = function () {
        return this.items.length - 1
    }
    
    // toString方法
    Stack.prototype.toString = function () {
        return this.items.join(" ")
    }
}

// 函数：十进制转二进制
function dec2bin(decNumber) {
    let stack = new Stack()
    while (decNumber > 0) {
        // %取余数加入栈
        stack.push(decNumber % 2)
        decNumber =Math.floor(decNumber / 2)
    }
    // 返回二进制编码
    let binString = ""
    // 方法一
    while (!stack.isEmpty()) {
        binString += stack.pop()
    }
    // 方法二
    // binString = stack.items.reverse().join()
    return binString
}

console.log(dec2bin(100));