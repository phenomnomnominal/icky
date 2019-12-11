import fs from 'graceful-fs';
import glob from 'glob';
import { promisify } from 'util';

import {
  UnknownOptions,
  validateFiles,
  Options,
  validatePattern
} from './options';
import { logError, IckyError, ErrorCodes } from './errors';

export function icky(options: UnknownOptions): Promise<number> {
  try {
    return tryStartIcky(options);
  } catch (e) {
    logError(e);
    throw e;
  }
}

async function tryStartIcky(options: UnknownOptions): Promise<number> {
  const finalOptions = {
    files: validateFiles(options?.files),
    pattern: validatePattern(options?.pattern)
  };

  const globAsync = promisify(glob);

  let files;
  try {
    files = await globAsync(finalOptions.files);
  } catch {
    throw new IckyError(ErrorCodes.COULDNT_GLOB_FILES, finalOptions.files);
  }

  const searching = files.map(file => findIckiness(finalOptions, file));
  const results = await Promise.all(searching);
  return results.reduce((p, n) => p + n, 0);
}

async function findIckiness(
  options: Options,
  filePath: string
): Promise<number> {
  let text;
  let stat;

  try {
    const statAsync = promisify(fs.stat);
    stat = await statAsync(filePath);
  } catch {
    // Doesn't matter if this throws!
  }

  if (!stat || stat.isDirectory()) {
    return 0;
  }

  try {
    const readAsync = promisify(fs.readFile);
    text = await readAsync(filePath, 'utf8');
  } catch {
    throw new IckyError(ErrorCodes.COULDNT_READ_FILE, filePath);
  }

  const pattern = new RegExp(`${options.pattern}(!*)`, 'g');
  const matches = [];
  let match;

  do {
    match = pattern.exec(text);
    if (match) {
      matches.push(match);
    }
  } while (match);

  let total = 0;
  matches.forEach(match => {
    const [, ickiness] = match;
    total += ickiness.length + 1;
  });

  return total;
}
