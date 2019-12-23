import { launch } from "puppeteer";
import { mkdirSync } from "fs";

import { Screenshot } from "./screenshot";
import { rimraf } from './utils';
import { SCREENSHOTS_DIR, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "./constants";
import { Compare } from "./compare";

async function main() {
  await rimraf(SCREENSHOTS_DIR);
  mkdirSync(SCREENSHOTS_DIR);

  const browser = await launch({ defaultViewport: null });
  const page = await browser.newPage();

  await page.setViewport({
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    deviceScaleFactor: 1,
  });

  await page.goto('https://google.com');
  await new Screenshot(page, SCREENSHOTS_DIR).take();
  await page.goto('https://facebook.com');
  await new Screenshot(page, SCREENSHOTS_DIR).take();

  await new Compare(`${SCREENSHOTS_DIR}/google.png`).compareWith(`${SCREENSHOTS_DIR}/google.png`);
  await new Compare(`${SCREENSHOTS_DIR}/google.png`).compareWith(`${SCREENSHOTS_DIR}/facebook---connexion-ou-inscription.png`);

  await browser.close();
}

main();
