import { type Page, type Locator } from '@playwright/test';

export class ChineseLearningPage {
  readonly page: Page;
  readonly lobbyTitle: Locator;
  readonly scenarioCards: Locator;
  readonly roomHeader: Locator;
  readonly chatInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lobbyTitle = page.locator('h1');
    this.scenarioCards = page.locator('[data-slot="card"]');
    this.roomHeader = page.locator('header');
    this.chatInput = page.locator('input[placeholder]');
  }

  async goToLobby() {
    await this.page.goto('/lobby');
    await this.page.waitForLoadState('networkidle');
  }

  async selectScenario(index: number) {
    await this.scenarioCards.nth(index).click();
    await this.page.waitForURL(/\/room\//);
  }

  async getScenarioCount() {
    return this.scenarioCards.count();
  }
}
