const { QueueEvents } = require('bullmq');

const queueEvents = new QueueEvents('Paint');

queueEvents.on('completed', ({ jobId }) => {
  console.log('done painting');
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error('error painting', failedReason);
});