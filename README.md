# Functionalities of the App
##### The chartgenie is an intractive app which has the following functionalities:
- Allow user signup/login
- Upload csv file and the respective charts will be shown
- It also allows to see different types of chart like Line chart, Bar chart and Pie chart
- With the input field, it allows real time intraction with the openai services 
- With the openai intraction user can ask for different kind of data in csv format (currently we are supporting csv format only)
- We can also create another new chat thread without impacting the previous ones with the `New Chat` button option

## To run the app locally, follow the below steps:
- Clone the repo with `git clone https://github.com/ashvini-maurya/chartgenie.git`
- Navigate to the repo with `cd chartgenie`
- Run `npm install` to install the required packages
- Add the openAPI API_KEY in .env file
- Start the backend server with `npm run start:be`
- In another terminal start the frontend server with `npm run start:fe`
- Go to the browser and open local server, generally it's on http://localhost:3000 

## To run the unit tests locally:
- From the terminal run `npm run test`
- This command launches the test runner in the interactive watch mode and will run all tests and show the results something like:
```
Test Suites: 3 passed, 3 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        1.127 s
Ran all test suites.
```

## Limitations:
- Only csv format is supported
- If we provide random input then openai might not respond with the proper data response in csv format
- Reloading the app will loose everything on UI because it's not persistent