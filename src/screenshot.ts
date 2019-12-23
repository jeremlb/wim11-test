import { Page } from 'puppeteer';

export class Screenshot {
  constructor(private page: Page, private outdir: string) {}

  async take(): Promise<void> {
    const title = await this.getPageTitle();
    await this.page.screenshot({ path: `${this.outdir}/${title}.png` });
  }

  private async getPageTitle(): Promise<string> {
    return this.page.evaluate(() => {
      return (document.title || '').toLowerCase().split(' ').join('-');
    });
  }
}
