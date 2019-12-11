import * as path from 'path';

import { icky } from '../src/index';

const FIXTURE = path.resolve(__dirname, '../fixtures/test-ickiness/**/*.*');

describe('icky', () => {
  it('should count the amount of ickiness in some files', async () => {
    jest.setTimeout(10000);

    const ickiness = await icky({ files: FIXTURE });

    expect(ickiness).toEqual(6);
  });
});
