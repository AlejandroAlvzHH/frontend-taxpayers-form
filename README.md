# KEA Front End Engineering Interview

## Overview

This is a takehome test for candidates applying for a frontend developer position at KEA.

Feel free to structure the code however you prefer and use third-party libraries at your discretion.


## Interview Task

Build the Taxpayer Register Form using this [design spec](https://www.figma.com/file/aSqkE2Vg86elFv4wFO7w6P/Taxpayer-registration-form?type=design&node-id=0-1&mode=design&t=scbBWT7iKEES2078-0).

Using the Taxpayer Register Form add the following 2 functionalities:

1. Fetch and display the list of taxpayers registered on Fixat (see endpoint below).
2. Register a new taxpayer via the form (see endpoint below).

### API Information

- **Taxpayers list:** `GET https://ynhumjrgo3.execute-api.us-east-1.amazonaws.com/v1/taxpayers` 

Example API response:
```
{
  "object": "list",
  "data": [
    { 
      "object": "taxpayer",
      "id": "tax_83e846ef-b8fd-4897-97ff-4e838431df03",
      "name": "Jonh Doe",
      "phone_number": "5555555555",
      "address": "742 Evergreen Terrace",
      "created_at":1709278183
    },
    { 
      "object": "taxpayer",
      "id": "tax_54de1f51-3093-4515-b5d7-62d3a7eed743",
      "name": "Jane Doe",
      "phone_number": "5555555555",
      "address": "742 Evergreen Terrace",
      "created_at":1709278183
    }
}
```
- **Taxpayer register:** `POST https://ynhumjrgo3.execute-api.us-east-1.amazonaws.com/v1/taxpayers` 

Example API request (with data requirements):
```
{
  "name": "Jonh Doe", // Required -> Type: String
  "email": "jonh@doe.com", // Required -> Type: Valid Email
  "phone_number": "5555555555", // Required -> Type: 10 digits
  "address": "742 Evergreen Terrace" // Required -> Type: String
}
```

## Duration

Up to 72 hours. We do not expect you to complete the assessment in this time.

## Submission
1.  Fork this repo
2.  Build Taxpayer Register Form and their funcionalities. Requirements:
    -  React - [https://react.dev](https://react.dev)
    -  Tailwind - [https://tailwindui.com](https://tailwindui.com)
4.  Once you've completed the test, submit a Pull Request (PR)
5.  In the PR, include a README that includes the following:
    -  If you made any assumptions, what are they

**Notes:**
1.  Feel free to contact me if you have any questions about the test.
2.  **Do not include node_modules in your submission**

To start the test, simply clone this repo and make your edits locally.

Thanks!

