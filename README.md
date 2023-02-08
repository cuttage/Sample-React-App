# Job Search App -- Custom request example ADVANCED

A fully functional Job Search one-page web app in ReactJS. I display a list of jobs where you can filter the results by title. While a large amount of data is loaded in the background, you can view single job details. Once the data is loaded, you can navigate the listings at the bottom of the page and filter the listings at the top. You can't apply for jobs on purpose.
This is a custom request example of an advanced web app.

## Technical info

I use a public jobs API to fetch data about the jobs.

- This app is for showcasing purposes only. Some data should be moved to an .env file in production.
- For showcasing, I added one translation only.
- I decided to implement the Job Detail page as a modal to increase performance.
- The data is fetched only once recursively and not every time the data is filtered for performance purposes. Data results are paginated and you can see the first page while data is loaded in the background. Filtering and pagination navigation are available once all data is fetched.
- The project is guaranteed to be bug-free in Chrome Version 107.0.5304.110 (Official Build) (x86_64) only.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
