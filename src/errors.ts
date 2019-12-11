import chalk from 'chalk';
import { error } from './logger';

export class IckyError extends Error {
  public details: Array<unknown>;

  constructor(public code: ErrorCodes, ...details: Array<unknown>) {
    super();

    this.details = details;
  }
}

export function logError(err: IckyError): void {
  error(ERROR_MESSAGES[err.code](...err.details));
}

type ErrorMessageFactory = (...details: Array<unknown>) => string;
const ERROR_MESSAGES: Record<ErrorCodes, ErrorMessageFactory> = {
  [ErrorCodes.INVALID_FILES]: (files: unknown) => `

  ${errorValue(files)} is not a valid value for ${optionName('files')}!
  ${optionName('files')} must be a glob pattern for the files you want to check!
  `,
  [ErrorCodes.INVALID_PATTERN]: (pattern: unknown) => `

  ${errorValue(pattern)} is not a valid value for ${optionName('pattern')}!
  ${optionName('pattern')} must be a string that you use to indicate ickiness!
`,
  [ErrorCodes.COULDNT_GLOB_FILES]: (files: unknown) => `

  Couldn't find files matching ${errorValue(files)}!
`,
  [ErrorCodes.COULDNT_READ_FILE]: (filePath: unknown) => `

  Couldn't read file at ${errorValue(filePath)}!
`
};

function errorValue(value: unknown): string {
  return chalk.redBright(`"${value}"`);
}
function optionName(option: string): string {
  return chalk.blueBright(`\`${option}\``);
}

export const enum ErrorCodes {
  INVALID_FILES,
  INVALID_PATTERN,

  COULDNT_GLOB_FILES,
  COULDNT_READ_FILE
}
