const objecTest = {
    a : 7,
    b : 8,
    sum : function () {
        return this.a = this.b
    },
}

const jsonSum = objecTest.sum();

console.log(`jsonSum: ${jsonSum}`)