export const getKillHandler = (context, command) => () => {
  for (const { reject, receive } of context.commands) {
    reject(command);
    receive(command);
  }
  if (context.watch) {
    context.watcher.close();
  }
  context.process.kill();
};
