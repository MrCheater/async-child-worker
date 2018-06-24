import path from 'path';
import { fork } from 'child_process';

import { PING, PING_PONG_TIMEOUT, PING_INTERVAL } from './constants';
import { onEvent } from './onEvent';

export const forkProcess = context => {
  context.process = fork(path.resolve(__dirname, 'wrapper.js'), [
    context.filename
  ]);

  context.process.on('message', onEvent.bind(null, context));

  context.initialized = new Promise(async (resolve, reject) => {
    context.init = () => {
      clearInterval(ping);
      resolve();
    };

    const ping = setInterval(() => {
      context.process.send({
        type: PING
      });
    }, PING_INTERVAL);
    context.process.send({
      type: PING
    });

    setTimeout(() => {
      clearInterval(ping);
      reject();
    }, PING_PONG_TIMEOUT);
  });
};
