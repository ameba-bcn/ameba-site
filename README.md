This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# AMEBA FRONTEND

## Release changes

Version 2.0.15
- Portada iphone

Version 2.0.14
- Loader modal member on close
- Three last activities on main

Version 2.0.13
- Safari styling issues solved

Version 2.0.12
- CORS error

Version 2.0.11
- Delete ameba-site on baseURL
- Restore axios headers

Version 2.0.10
- Unavailable screen with countdown

Version 2.0.9
- Package versions bug

Version 2.0.8
- Translations

Version 2.0.7
- Safari IntersectionObserver
- Translations

Version 2.0.6
- Fullscreen checkout close header
- Unique Size vertical align

Version 2.0.5
- Media iFrames
- Safari IntersectionObserver
- Wider toast

Version 2.0.4
- Restyle alignments
- Regrid cards

Version 2.0.3
- New modal interactiveBox layout
- Modal title left align
- Bugfix: OnClose activity modal crash

Version 2.0.2
- Colaboration logos
- Button supporter read from server

Version 2.0.1
- React Player 
- Modal loader

Version 2.0.0
- Unmount modals
- Membership load from constant

Version 1.99
- Cart with short name
- Cart and dropdown with sizes
- has_stock on use
- SubHeader on event modal

Version 1.98
- Unisex sizes prevented
- Bug: SupportYourLocals tags overflowing
- Plus modal on mobile restyled
- Sorting desc on events
- Flowing title on modal
- Fallback when loading fonts& and icons

Version 1.97
- Bug: Constant fix

Version 1.96
- Bug: display BE response on psswd recovery flow
- Bug: Avoid hardcoded price on banner
- Bug: Roster copy

Version 1.95
- Bug: Bookings collapsed

Version 1.94
- Bug: Bookings links artists
- Bug: Artist media links
- Bug: Wrong breadcrumb title
- Bug: manifesto text format

Version 1.93
- Payment redirects after successfull payment

Version 1.92
- Payment stripe key consumed from ep

Version 1.91
- Product landing by url queries

Version 1.9
- Payment reads stripe env
- Errors translated

Version 1.8
- Payment component updated
- Hover cards with effect

Version 1.7
- FE Translated
- Validate on submit, not on type
- Hover in cards bug

Version 1.6
- Checkout Styling
- Font auto resize
- New videos on landing
- Video fallback on load (img)
- SupportYourLocals fragmented in small components

Version 1.5
- Loading Styling
- SupportYourLocals subdivided by smaller components
- Password recovery bugfix

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
