# tech-front

> An email app, which accepts the necessary information to send emails.

## Problem & Solution
This app solves the problem of an email client. It provides a simple, easy to use
interface with support for offline work.

The solution is split across two repos, this one (the front end) and the [back end](https://github.com/willtpwise/tech-back). It's a full-stack solution, however
the back end is in its infancy.

The front-end is built on a [Vue.js](https://vuejs.org/) framework; which makes
use of:
1. [vuex](https://vuex.vuejs.org/en/intro.html) for state management
1. [Element](http://element.eleme.io/) for UI
1. [Jest](https://facebook.github.io/jest/) for unit tests
1. [Nightwatch](http://nightwatchjs.org/) for E2E tests

The main architectural choice for Vue.js came down to the simplicity of the
framework. I find it's the easiest JavaScript framework to read and write, so
it seemed ideal for this app.

The choice for Vuex was simple. Vuex provided a
scalable option for state management... At this point, the app can only send
emails. With Vuex, scaling into a full-blown email client is within reach.

Element was actually my second choice, originally I considered [Vuetify](https://vuetifyjs.com),
but decided against it as I felt it was oversized for what the project required
(or could require in the future).

Jest and Nightwatch are fast and easy to write testing frameworks.
I don't claim to be an expert in testing, but I found Jest has a particularly
easy-to-write api for testing Vue components.

One feature within the app is the locally stored options for showing / hiding the 'cc'
and 'bcc' fields. Ideally this feature would store the user's choices on the
backend (associated to their user account). However, since there are no user
accounts at this point, I've decided to trade this off and use local storage
instead.

## Features
1. Multiple recipients (across To, CC & BCC)
1. Offline sync (PWA)

## Build Setup
First clone, install and run the [backend](https://github.com/willtpwise/tech-back)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production (minification is disabled)
npm run build
```

## Tests
Make sure you have the [Java Developers Kit](http://www.oracle.com/technetwork/java/javase/downloads/index.html) installed before running the E2E tests.
```
# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
