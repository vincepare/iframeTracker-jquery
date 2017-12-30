# Contributing to iframeTracker

## Bug report
* Please provide a live example (use tools like [jsbin](https://jsbin.com), [jsfiddle](https://jsfiddle.net) or [codepen](https://codepen.io/))
* Indicate which browsers the issue can be reproduced in

## Build setup
1. Fork and clone the repository
1. Run `npm install` to install all dependencies
1. Run `npm test` to check your build environment

## Coding guidelines
* Enforce existing coding style (*eslint* will help you : `npx grunt eslint`)
* Use UTF-8 charset
* Beware to not decrease code coverage (write new tests for new code)

## Pull request
1. Create a new branch from `develop` (please don't work on your `develop` branch directly)
1. Run `npm test`
1. Open `test/unit/*.html` unit test files in actual browser to ensure tests pass everywhere
1. Update the documentation to reflect any changes
1. Push to your fork and submit a pull request
