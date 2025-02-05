# PlaywrightApiTest

Setup
Clone the repository.

Install dependencies:
npm install

Run the tests using Playwright:
npx playwright test

________________________________________

# Rijksmuseum API Test Suite

This repository contains a set of automated tests for the Rijksmuseum API, using Playwright. The tests ensure that the API returns the expected responses for different scenarios, including retrieving collections, fetching details of specific objects, handling invalid object numbers, and missing API keys.

## Test Scenarios

### 1. **Retrieve Collection Successfully**

- **Test:** `Retrieve collection successfully`
- **Description:** Tests if the API returns a valid collection of art objects.
- **Expected Outcome:** The status code should be `200`, and the `artObjects` field should be a non-empty array.

### 2. **Retrieve Details of a Specific Object**

- **Test:** `Retrieve details of a specific object`
- **Description:** Tests if the API returns the correct details for a specific art object, based on the object number provided.
- **Expected Outcome:** The status code should be `200`, and the `artObject` should contain the `objectNumber` as a property.

### 3. **Handle Invalid Object Number**

- **Test:** `Handle invalid object number`
- **Description:** Tests how the API responds when an invalid object number is provided.
  
  **API Behavior:**
  - **Expected Outcome:** When a non-existent object number is provided (e.g., `INVALID123`), the API returns a `200` status code, but the response body contains `artObject: null`. This behavior is because the API does not throw a `404` error when an object is not found. Instead, it returns a successful response (status `200`) with `null` values for the object data fields.
  
  - **Test Verification:** The test verifies that the response status is `200` and checks that `artObject` is `null` when the object number does not exist.

  Example response:
  ```json
  {
    "elapsedMilliseconds": 27,
    "artObject": null,
    "artObjectPage": null
  }
This is the expected behavior, and the test verifies that the artObject is null when an invalid object number is requested.

### 4. Handle Missing API Key
Test: Handle missing API key
Description: Tests how the API handles a request with a missing or invalid API key.
Expected Outcome: The status code should be greater than or equal to 400, indicating an error due to the missing API key.
