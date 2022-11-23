# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Welcome to my Simple React App

A simple fully functional jobs listing app mini project. We display a list of jobs where users can filter the results by title. We will be using a public jobs API to fetch data about the jobs.

It took me two days to create from scratch and release this project.

- This app is for showcasing purposes only. Some data should be moved to an .env file in production.
- For showcasing, we added one translation only.
- We decided to implement the Job Detail page as a modal to increase performance and to slightly change its layout for UX purposes, to limit responsive layout changes and, for best practice purposes, to avoid flooding the code with media queries or creating redundant code.
- The data is fetched only once recursively and not every time the data is filtered for performance purposes. Data results are paginated and you can see the first page straightaway while data is loaded in the background. Filtering and pagination navigation are available once all data is fetched.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
