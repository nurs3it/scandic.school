#!/usr/bin/env node

const net = require('net');

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
}

async function main() {
  const port = 3000;
  const isAvailable = await checkPort(port);
  
  if (!isAvailable) {
    console.error(`❌ Порт ${port} уже занят!`);
    console.error('Пожалуйста, освободите порт 3000 или остановите другие процессы.');
    console.error('\nДля освобождения порта выполните:');
    console.error(`lsof -ti:${port} | xargs kill -9`);
    process.exit(1);
  }
  
  console.log(`✅ Порт ${port} доступен`);
}

main().catch(console.error);
