import { test, expect } from '@playwright/test';
import exp from 'constants';
test.setTimeout(120000);
test.beforeEach(async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/', { timeout: 60000 });
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByText('Please login to make')).toBeVisible();
});

test('test without a complete login credential', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Login failed! Please ensure')).toBeVisible();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Login failed! Please ensure')).toBeVisible();
});

test('Successful Login and Booking a backdated Appointment test', async ({ page }) => {
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
  await page.getByLabel('Apply for hospital readmission').check();
  await page.getByLabel('None').check();
  await page.locator('span').click();
  await page.getByRole('cell', { name: 'September' }).click();
  await page.getByRole('cell', { name: '2024' }).click();
  await page.getByText('2019').click();
  await page.getByText('Jul').click();
  await page.getByRole('cell', { name: '17' }).click();
  await page.getByPlaceholder('Comment').click();
  await page.getByPlaceholder('Comment').fill('hi');
  await page.getByRole('button', { name: 'Book Appointment' }).click();
  await expect(page.getByText('Cannot Book appointment, Enter a valid date')).toBeVisible();
});

  test('Successful Login and Booking coupled with Back to Homepage and appointment History test ', async ({ page }) => {
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('John Doe');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
    await page.getByLabel('Apply for hospital readmission').check();
    await page.getByLabel('None').check();
    await page.locator('span').click();
    await page.getByRole('cell', { name: 'September' }).click();
    await page.getByText('Jul').click();
    await page.getByRole('cell', { name: '17' }).click();
    await page.getByPlaceholder('Comment').click();
    await page.getByPlaceholder('Comment').fill('hi');
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    await expect(page.getByText('Appointment Confirmation')).toBeVisible();
    await page.getByRole('link', { name: 'Go to Homepage' }).click();
    await expect(page.locator('h1')).toContainText('CURA Healthcare Service');

    //View Appointment Booking History
    await page.locator('#menu-toggle').click();
    await page.getByRole('link', { name: 'History' }).click();
    await expect(page.locator('h2')).toContainText('History');
    await expect(page.getByText('No appointment.')).not.toBeVisible();
  
  });






