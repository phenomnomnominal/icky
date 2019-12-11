import { icky } from '../index';
import { UnknownOptions } from '../options';
import { success } from '../logger';

export async function start(options: UnknownOptions): Promise<void> {
  const result = await icky(options);

  success(`\nTotal ickiness: ${result.toString()}`);
}
