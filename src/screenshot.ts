import { Page } from 'puppeteer';

export class Screenshot {
  constructor(private urls: string[], private outdir: string) {}

  async take(): Promise<void> {


  }


  private async getPageTitle(page: Page) {
    return page.evaluate(() => {
      return document.title;
    })
  }
}