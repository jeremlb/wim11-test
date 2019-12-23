import { createReadStream, readFileSync, writeFileSync } from "fs";
import { PNG } from "pngjs";
import pixelmatch from 'pixelmatch';
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "./constants";

export class Compare {
  constructor(private sourcePath: string) {}

  async compareWith(path: string): Promise<number> {
    return new Promise(async (resolve) => {
      const source = PNG.sync.read(readFileSync(this.sourcePath));
      const compare = PNG.sync.read(readFileSync(path));
      const diff = new PNG({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });

      console.log(source.data.byteLength, compare.data.byteLength);

      const numDiffPixels = pixelmatch(
        source.data, compare.data, diff.data, VIEWPORT_WIDTH, VIEWPORT_HEIGHT,
        {threshold: 0.1});

      console.log(Math.round(numDiffPixels / source.data.byteLength * 10000) / 100);

      writeFileSync('diff.png', PNG.sync.write(diff));
      resolve(numDiffPixels);

    });
  }
}