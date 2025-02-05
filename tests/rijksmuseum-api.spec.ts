import { test, expect, request } from '@playwright/test';

const API_URL = 'https://www.rijksmuseum.nl/api/en/collection';
const API_KEY = '0fiuZFh4';

// Setup request context
let context;
test.beforeAll(async ({ playwright }) => {
    context = await playwright.request.newContext();
});

test('Retrieve collection successfully', async () => {
    const response = await context.get(`${API_URL}?key=${API_KEY}&ps=10`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    // Log the response data for inspection
    console.log('Response data:', data);
    expect(data.artObjects).toBeInstanceOf(Array);
    expect(data.artObjects.length).toBeGreaterThan(0);
});


test('Retrieve details of a specific object', async () => {
    const objectNumber = 'SK-C-5'; // Example object number
    const response = await context.get(`${API_URL}/${objectNumber}?key=${API_KEY}`);
    expect(response.status()).toBe(200);
    const data = await response.json(); 
    // Log the response data for inspection
    console.log('Object details:', data);
    expect(data.artObject).toHaveProperty('objectNumber', objectNumber);
});


test('Handle invalid object number', async () => {
    const invalidObjectNumber = 'INVALID123';
    const response = await context.get(`${API_URL}/${invalidObjectNumber}?key=${API_KEY}`);
    // Log the response for debugging
    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());
    // Ensure the status is still 200, but check the artObject is null
    expect(response.status()).toBe(200);  // Status is 200 even if the object is invalid
    const data = await response.json();
    expect(data.artObject).toBeNull();  // Expect 'artObject' to be null for invalid object number
});


test('Handle missing API key', async () => {
    const response = await context.get(`${API_URL}`);
    expect(response.status()).toBeGreaterThanOrEqual(400); // Expect an error response
});

test.afterAll(async () => {
    await context.dispose();
});
