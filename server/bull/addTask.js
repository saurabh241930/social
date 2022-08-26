const { Queue } =  require('bullmq');


const queue = new Queue('Paint');

queue.add('cars', { color: 'blue' }).then(res => console.log("SUCCESS :",res)).catch(err => console.log("ERROR :",err))

console.log("QUE",queue);