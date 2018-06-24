import { getCommandHandler } from './getCommandHandler';
import { getKillHandler } from './getKillHandler';

export const createProxyHandler = context => ({
  get(_, command) {
    switch (command) {
    case 'kill':
      return getKillHandler(context, command);
    default:
      return getCommandHandler(context, command);
    }
  }
});
