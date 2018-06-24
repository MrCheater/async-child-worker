import path from 'path';
import createWorker from '../async-child-worker';

test('calculator', async () => {
  const worker = createWorker(path.resolve(__dirname, 'worker.js'), {
    debug: true
  });

  await worker.set(10); // 10
  await worker.add(20); // 30
  await worker.div(2); // 15
  await worker.sub(7); // 8
  await worker.mul(5); // 40

  expect(((10 + 20) / 2 - 7) * 5).toEqual(await worker.get());

  await worker.clear(); // 0

  expect(0).toEqual(await worker.get());

  worker.kill();
});
