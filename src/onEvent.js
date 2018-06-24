import {
  PONG,
  COMMAND_RECEIVE,
  COMMAND_SUCCESS,
  COMMAND_FAILURE
} from './constants';

export const onEvent = (context, event) => {
  if (event.type === PONG) {
    context.init();
    return;
  }
  if (context.debug) {
    console.log(event);
  }

  const command = context.commands.get(event.id);
  if (!command) {
    return;
  }

  switch (event.type) {
  case COMMAND_RECEIVE:
    {
      command.receive();
    }
    break;
  case COMMAND_SUCCESS:
    {
      command.receive();
      command.resolve(event.result);
      context.commands.delete(event.id);
    }
    break;
  case COMMAND_FAILURE:
    {
      command.receive();
      command.reject(event.error);
      context.commands.delete(event.id);
    }
    break;
  }
};
