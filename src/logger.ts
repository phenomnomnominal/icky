import chalk from 'chalk';

export function mute(): void {
  console['log'] = (): void => {
    /* */
  };
}

export function header(head: string): void {
  console.log(chalk.yellowBright(head));
}

const HEADING = chalk.bgBlack.greenBright(`ICKY -`);

export const success = createLogger(chalk.greenBright('success'));
export const info = createLogger(chalk.whiteBright('info'));
export const warn = createLogger(chalk.yellowBright('warn'));
export const error = createLogger(chalk.redBright('error'));

const SPACER = chalk.bgBlack.greenBright(':');

function createLogger(name: string): (...args: Array<string>) => void {
  return function(...messages: Array<string>): void {
    console.log(
      `\n${HEADING} ${name}${SPACER}`,
      ...messages.map(m => chalk.whiteBright(m))
    );
  };
}
