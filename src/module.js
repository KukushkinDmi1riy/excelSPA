console.log('from module.js');

const d = 1;


console.log(d);

async function start() {
  return await Promise.resolve('async working');
}

start().then(console.log);
