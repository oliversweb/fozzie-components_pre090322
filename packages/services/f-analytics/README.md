<div align="center">

# f-analytics

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Encapsulates the GTM / Google Analytics functionality

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-analytics.svg)](https://badge.fury.io/js/%40justeat%2Ff-analytics)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-analytics/badge.svg)](https://coveralls.io/github/justeat/f-analytics)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-analytics/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-analytics?targetFile=package.json)

---
This component abstracts away the gathering of the various data values needed for Google Analytics and the setting of Google Tag Manager (GTM).  Once declared in your template is will; on render, push these various data value to Google.  You can see this in action by inspecting the `dataLayer` from the browser console in developer tools and looking for the model `plaformData`.


## Benefits (Now)
- Single source for GTM logic: Currently we have GTM logic scattered throught various components and parent features this will remove that logic and centralise it in this single component.
- Self sufficient: With only supplying a small amount of props this component will attempt to evaluate, gather and produce all the GA data required for the initial render.

## Benefits (Soon)
- _extend the data for the `platformData` GA model_
- _evaluate, gather and produce data for the `pageData` GA model_
- _evaluate, gather and produce data for the `userData` GA model_
- _provide the facility to push 'ad-hoc' GA events_
<hr></br>

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-analytics
```

```sh
npm install @justeat/f-analytics
```

### Vue Applications

You can import it in your Vue SFC like this:

```js
import Analytics from '@justeat/f-analytics';

export default {
    components: {
        Analytics
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `analytics` bundle from the main `bundle.client.js`:

```js
export default {
    components: {
        Analytics: () => import(/* webpackChunkName: "analytics" */ '@justeat/f-analytics')
    }
}
```
</br>

## Configuration

The `f-analytics` needs to be included in the markup like a regular component.  It has no visual appearance only hidden aspects.

```js

<f-analytics
    gtm-id="GTM-123456A"
    name="my_feature"
    :locale="$i18n.locale"
/>
```

To check it has loaded successfully view the markup and search for `data-test-id="analytics"`.
</br></br>

## Props

`f-analytics` requires you to supply the following props.

The props that can be defined are as follows:

| Prop  | Type  | Required | Default | Description |
| :----- | :-----: | :-----: | :-------: | :----------- |
| gtmId | `String` | *No | `GTM-XXXXXXX` | The GTM ID to be embedded into the GTM tags |
| name | `String` | *No | `` | The name of the parent feature |
| locale | `String` | *No | `` | The current locale of the parent feature. Note |

\*  _You don't have to supply any of the props to but the component will only operate in a limited capacity without them._
</br></br>

Although this component can gather most data with only the props supplied it also needs some values only available on the serverside and will expect these to be present to fulfil all of it's functionality.

The follow properties need to present & accessible :

| Prop Name | Type | Example |  Description |
| :----- | :----- | :----- | :----------- |
| `justEatEnvironment` | Server Environment Variable | `staging` | This will indicate the current environment |
| `FEATURE_VERSION` | Server Environment Variable | `1.12.345.0` | This will indicate the current version of the feature |
| `INSTANCE_POSITION` | Server Environment Variable | `004` | This will indicate the current position of the AWD EC2 instance |
| `je-user_percentage` | cookie (httponly) | `34` | This will indicate the user percent value (this assist with experiment bucketing) |
</br>

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
$ yarn build
```

Change directory to the `f-analytics` package:

```sh
$ cd packages/components/atoms/f-analytics
```
</br>

## Testing

To test all components, run from root directory.
To test only `f-analytics`, run from the `./fozzie-components/packages/components/atoms/f-analytics` directory.

### Unit and Integration tests

```sh
yarn test
```

### Component and Accessibility Tests

```bash
# Note: Ensure Storybook is running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
yarn test-component:chrome
```
### Accessibility tests
```bash
yarn test-a11y:chrome
```
</br>
