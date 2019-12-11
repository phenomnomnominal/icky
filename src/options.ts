import { IckyError, ErrorCodes } from './errors';

export type UnknownOptions = Record<string, unknown>;

export type Mapper = (t: string) => string;

export type Options = {
  files: string;
  pattern: string;
};

const DEFAULT_FILES = '/src/**/*';
const DEFAULT_PATTERN = 'ICKY';

export function validateFiles(files?: unknown): string {
  if (files == null) {
    return DEFAULT_FILES;
  }
  if (!is.str(files)) {
    throw new IckyError(ErrorCodes.INVALID_FILES, files);
  }
  return files;
}

export function validatePattern(pattern?: unknown): string {
  if (pattern == null) {
    return DEFAULT_PATTERN;
  }
  if (!is.str(pattern)) {
    throw new IckyError(ErrorCodes.INVALID_PATTERN, pattern);
  }
  return pattern;
}

function is<T>(t: T, obj: unknown): obj is T {
  return typeof obj === typeof t;
}

is.str = (obj: unknown): obj is string => is('', obj);
