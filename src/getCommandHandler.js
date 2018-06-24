import uuid from 'uuid/v4';

import { COMMAND_REQUEST, RECEIVE_TIMEOUT } from './constants';

export const getCommandHandler = (context, command) => async (...args) => {
  await context.initialized;

  const id = uuid();

  const promise = new Promise((resolve, reject) => {
    new Promise((receive, timeout) => {
      context.commands.set(id, {
        resolve,
        reject,
        receive
      });
      setTimeout(timeout, RECEIVE_TIMEOUT);
    }).catch(error => {
      reject(error);
    });
  });

  const event = {
    type: COMMAND_REQUEST,
    id,
    command,
    args
  };

  if (context.debug) {
    console.log(event);
  }

  context.process.send(event);

  return promise;
};
