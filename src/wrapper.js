import interopRequireDefault from '@babel/runtime/helpers/interopRequireDefault';

import {
  PING,
  PONG,
  COMMAND_REQUEST,
  COMMAND_RECEIVE,
  COMMAND_SUCCESS,
  COMMAND_FAILURE
} from './constants';
import { serializeError } from './serializeError';

const worker = interopRequireDefault(require(process.argv[2])).default;

process.on('message', async event => {
  switch (event.type) {
  case PING:
    process.send({
      type: PONG
    });
    break;
  case COMMAND_REQUEST:
    process.send({
      type: COMMAND_RECEIVE,
      id: event.id
    });
    try {
      const result = await worker[event.command](...event.args);
      console.log('result', result);
      process.send({
        type: COMMAND_SUCCESS,
        id: event.id,
        result
      });
    } catch (error) {
      process.send({
        type: COMMAND_FAILURE,
        id: event.id,
        error: serializeError(error)
      });
    }
    break;
  }
});
