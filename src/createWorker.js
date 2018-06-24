import chokidar from 'chokidar';

import { forkProcess } from './forkProcess';
import { onFileChange } from './onFileChange';
import { createProxyHandler } from './createProxyHandler';

export const createWorker = (
  filename,
  { watch = false, debug = false } = {}
) => {
  const context = {
    filename,
    initialized: null,
    init: null,
    process: null,
    api: Object.create(null),
    commands: new Map(),
    watcher: watch ? chokidar.watch(filename) : null,
    watch,
    debug
  };

  forkProcess(context);

  if (context.watch) {
    context.watcher.on('change', onFileChange.bind(null, context));
  }

  return new Proxy(Object.create(null), createProxyHandler(context));
};
