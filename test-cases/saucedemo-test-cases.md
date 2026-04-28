# SauceDemo Test Cases

## Positive Test Cases

| ID | Scenario | Expected Result |
| --- | --- | --- |
| P-01 | Log in with the visible valid username and password | User lands on the inventory page |
| P-02 | Add the first product to the cart | Cart badge shows `1` and the selected product appears in the cart |
| P-03 | Complete checkout with valid customer details | Order completes successfully and confirmation page is shown |

## Negative Test Cases

| ID | Scenario | Expected Result |
| --- | --- | --- |
| N-01 | Log in with invalid credentials | Error message is shown and login is blocked |
| N-02 | Log in with locked out user | Error message indicates the user is locked out |
| N-03 | Continue checkout with empty customer details | Field validation message is shown |

## Smoke Test Cases

| ID | Scenario | Expected Result |
| --- | --- | --- |
| S-01 | Valid login and inventory load | Inventory page loads successfully |
| S-02 | Add first product to cart | Cart badge increments to `1` |

## Regression Test Cases

| ID | Scenario | Expected Result |
| --- | --- | --- |
| R-01 | Full purchase flow from login to finish | Order completes successfully |
| R-02 | Invalid login attempt | Correct error message is shown |
| R-03 | Checkout validation with empty form | Required field validation appears |
