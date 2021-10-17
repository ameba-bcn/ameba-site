This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# AMEBA FRONTEND

## Release changes

Version 1.4
- DiscountCode
- NodeModules Lib cleaned
- MiniTable products on Summary
- Profile View updated

Version 1.3
- Multilanguage
- Form errors restyled
- New checkout look&feel

Version 1.2
- Free shopping process
- SubscriptionBox
- Back error handling
- Profile view in no memeber users
- Forms to Formik
- Checkout refactored
- Error message new logic
- Bugfix: Duplicate products on refresh
- ItemVariant renamed
- Restyled from dessign

Version 1.1
- Profile data on logged user
- Bugfix stepper checkout on non member

Version 1.0
- New view BOOKING
- Complete new Membership flow
- Bugfix

Version 0.9.1
- Bugfix

Version 0.9
- Fill back button
- Error handling request responses
- Filter and search in Agenda
- Unmount modals avoiding last loadings
- Hide profile view on not members logged users
- Bugfix: Delete cart error, max 3 activities in Main...

Version 0.8
- Scroll to top on access page
- Event List images adjustment
- Cast video options disabled
- Stripe payment bugfix
- Duplicate product bugfix

Version 0.7
- Main cart events responsive restyle 
- SupportYourLocals cards responsive
- New Button component
- New Plus button component
- Modals restyled
- Mobile menu

Version 0.6
- Profile user data load logic created
- Profile user data edit logic created
- BugFix: Main activities cards restyled, title unbound error
- BugFix: Redirect to Login after addToCart if not logged
- Prettier included

Version 0.5
- About implemented
- BugFix: Logout crashes app on two tabs
- BugFix: Logout freeze
- BugFix: Activities clickable on main

Version 0.4
- New login flow including cart_id asigned to user
- New register flow including cart_id asigned to user
- New register new member flow including cart_id asigned to user
- New checkout cart and checkout member flow including cart_id asigned to user

Version 0.3
- New newsletter form on footer
- Performace and rerenders optimized
- Store tracks user status
- Requests on load and refactor
- NewMemberForm consumes EP
- Profile view user first approach

Version 0.2
- Membership procedure
- Modals mobile adapted
- Password recovery implemented
- Email verification implemented

Version 0.1
- Implemented checkout procedure


## Start with Docker
- Instalar Docker
- En el directorio raíz del proyecto, build del proyecto:
```
docker build . -t ameba-site
```
- Deploy
```
docker run ameba-site
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### `versions` and `compatibility`
node 14.15.0
npm install node-sass@4.14.0
