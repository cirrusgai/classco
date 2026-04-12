import { test, expect } from '@playwright/test';
import { ChineseLearningPage } from '../pages/chinese-learning.page';

test.describe('Chinese Learning Flow', () => {
  test('lobby shows all 10 scenarios', async ({ page }) => {
    const clPage = new ChineseLearningPage(page);
    await clPage.goToLobby();

    await expect(clPage.lobbyTitle).toBeVisible();
    const count = await clPage.getScenarioCount();
    expect(count).toBe(10);
  });

  test('can navigate to conversation room from lobby', async ({ page }) => {
    const clPage = new ChineseLearningPage(page);
    await clPage.goToLobby();

    await clPage.selectScenario(0);
    await expect(clPage.roomHeader).toBeVisible();
    await expect(clPage.chatInput).toBeVisible();
  });
});
