import { forkProcess } from './forkProcess';

export const onFileChange = context => {
  context.watcher.unwatch(context.filename);
  context.watcher.add(context.filename);

  if (context.process) {
    context.process.kill();
  }

  forkProcess(context);
};
