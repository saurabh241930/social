const { Worker } = require('bullmq');

function paintCar(color){
  console.log("PAINTING CAR with color:",color);
}

const worker = new Worker('Paint', async job => {
  if (job.name === 'cars') {
    await paintCar(job.data.color);
  }
});