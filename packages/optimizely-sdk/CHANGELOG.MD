# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
Changes that have landed but are not yet released.

## [3.0.0-rc2] - November 16, 2018

### Breaking Changes

* Drops `window.optimizelyClient` from the bundled build ([#189](https://github.com/optimizely/javascript-sdk/pull/189)).

### New Features
* Allow sticky bucketing via passing in `attributes.$opt_experiment_bucket_map`, this more easily allows customers to do some async data fetching and ensure a user gets a specific variation ([#179](https://github.com/optimizely/javascript-sdk/pull/179)).

```
const userId = '123'
const expId = '456'
const variationId = '678'
const userAttributes = {
  $opt_experiment_bucket_map: {
    [expId]: {
      variation_id: variationId
    }
  }
}

var selectedVariationKey = optimizelyClient.activate('experiment-1', userId, userAttributes);
```

### Fixes
* `setForcedVariation` treats empty variation key as invalid and does not reset variation. ([#185](https://github.com/optimizely/javascript-sdk/pull/185))
* Publish the unminified UMD bundle along with the minified one. ([#187](https://github.com/optimizely/javascript-sdk/pull/187))

## [3.0.0-rc] - November 6, 2018

This is the release candidate version of the 3.0 SDK:

### New Features

- Support for boolean combinations of audiences on experiments ([#175](https://github.com/optimizely/javascript-sdk/pull/175))
- Added PR template and commit message guidelines ([#183](https://github.com/optimizely/javascript-sdk/pull/183))

### Fixes

- Updated dependency versions ([#180](https://github.com/optimizely/javascript-sdk/pull/180))
- Suppressed unwanted console output in tests ([#181](https://github.com/optimizely/javascript-sdk/pull/181))
- Update project config to handle latest 3.0 datafile format ([#182](https://github.com/optimizely/javascript-sdk/pull/182))

## [3.0.0-alpha] - October 22, 2018

This is the alpha release of the 3.0 SDK, which includes a number of improvements to audience targeting:

### New Features

- Support for number-valued and boolean-valued attributes ([#174](https://github.com/optimizely/javascript-sdk/pull/174)).
- Support for audiences with new match conditions for attribute values, including 'substring' and 'exists' matches for strings; 'greater than', 'less than', 'exact, and 'exists' matches for numbers; and "exact" and 'exists' matches for booleans ([#174](https://github.com/optimizely/javascript-sdk/pull/174)).

### Breaking Changes

- Previously, when a 'not' audience condition was applied to a malformed attribute, it was possible for the condition to evaluate to `true`.  We’ve corrected this behavior, so that malformed attributes always evaluate to `null` and are ignored ([#174](https://github.com/optimizely/javascript-sdk/pull/174)).

## [2.2.0] - September 26, 2018

### Fixed
- Track and activate should not remove null attributes ([#168](https://github.com/optimizely/javascript-sdk/pull/168))
- Track attributes with valid attribute types ([#166](https://github.com/optimizely/javascript-sdk/pull/166))
- Prevent SDK from initializing if the datafile version in invalid ([#161](https://github.com/optimizely/javascript-sdk/pull/161))
- Updating lerna to latest version ([#160](https://github.com/optimizely/javascript-sdk/pull/160))

### Changed
- Change invalid experiment key to debug level ([#165](https://github.com/optimizely/javascript-sdk/pull/165))

## [2.1.3] - August 21, 2018

### Fixed
- Send all decisions for the same event in one snapshot. ([#155](https://github.com/optimizely/javascript-sdk/pull/155))
- Give Node.js consumers the unbundled package ([#133](https://github.com/optimizely/javascript-sdk/pull/133))

### Deprecated
- The UMD build of the SDK now assigns the SDK namespace object to `window.optimizelySdk` rather than to `window.optimizelyClient`. The old name still works, but on its first access a deprecation warning is logged to the console. The alias will be removed in the 3.0.0 release. ([#152](https://github.com/optimizely/javascript-sdk/pull/152))

## [2.1.2] - June 25, 2018

### Fixed
- Failure to log success message when event dispatched ([#123](https://github.com/optimizely/javascript-sdk/pull/123))
- Fix: Don't call success message when event fails to send ([#123](https://github.com/optimizely/javascript-sdk/pull/123))

## [2.0.5] - June 25, 2018

### Fixed
- Failure to log success message when event dispatched ([#123](https://github.com/optimizely/javascript-sdk/pull/123))
- Fix: Don't call success message when event fails to send ([#123](https://github.com/optimizely/javascript-sdk/pull/123))

## 2.1.1
June 19, 2018

* Fix: send impression event for Feature Test with Feature disabled ([#117](https://github.com/optimizely/javascript-sdk/pull/117))

## 2.0.4
June 19, 2018

* Fix: send impression event for Feature Test with Feature disabled ([#117](https://github.com/optimizely/javascript-sdk/pull/117))

## 2.1.0
May 24, 2018

* Introduces support for bot filtering.

## 2.0.3
May 24, 2018

* Remove [`request`](https://www.npmjs.com/package/request) dependency ([#98](https://github.com/optimizely/javascript-sdk/pull/98))
* Add package-lock.json ([#100](https://github.com/optimizely/javascript-sdk/pull/100))
* Input validation in Activate, Track, and GetVariation methods ([#91](https://github.com/optimizely/javascript-sdk/pull/91) by [@mfahadahmed](https://github.com/mfahadahmed))

## 2.0.1
April 16th, 2018

* Improve browser entry point by pointing to the browser index file instead of the webpack-compiled bundle. ([@DullReferenceException](https://github.com/DullReferenceException) in [#88](https://github.com/optimizely/javascript-sdk/pull/88))

## 2.0.0
April 11th, 2018

This major release of the Optimizely SDK introduces APIs for Feature Management. It also introduces some breaking changes listed below.

### New Features
* Introduces the `isFeatureEnabled` API to determine whether to show a feature to a user or not.
```
var enabled = optimizelyClient.isFeatureEnabled('my_feature_key', 'user_1', userAttributes);
```

* You can also get all the enabled features for the user by calling the following method which returns a list of strings representing the feature keys:
```
var enabledFeatures = optimizelyClient.getEnabledFeatures('user_1', userAttributes);
```

* Introduces Feature Variables to configure or parameterize your feature. There are four variable types: `Integer`, `String`, `Double`, `Boolean`.
```
var stringVariable = optimizelyClient.getFeatureVariableString('my_feature_key', 'string_variable_key', 'user_1');
var integerVariable = optimizelyClient.getFeatureVariableInteger('my_feature_key', 'integer_variable_key', 'user_1');
var doubleVariable = optimizelyClient.getFeatureVariableDouble('my_feature_key', 'double_variable_key', 'user_1');
var booleanVariable = optimizelyClient.getFeatureVariableBoolean('my_feature_key', 'boolean_variable_key', 'user_1');
```

### Breaking changes
* The `track` API with revenue value as a stand-alone parameter has been removed. The revenue value should be passed in as an entry of the event tags map. The key for the revenue tag is `revenue` and will be treated by Optimizely as the key for analyzing revenue data in results.
```
var eventTags = {
  'revenue': 1200
};

optimizelyClient.track('event_key', 'user_id', userAttributes, eventTags);
```
* The package name has changed from `optimizely-client-sdk` to `optimizely-sdk` as we have consolidated both Node and JavaScript SDKs into one.

## 2.0.0-beta1
March 29th, 2018

This major release of the Optimizely SDK introduces APIs for Feature Management. It also introduces some breaking changes listed below.

### New Features
* Introduces the `isFeatureEnabled` API to determine whether to show a feature to a user or not.
```
var enabled = optimizelyClient.isFeatureEnabled('my_feature_key', 'user_1', userAttributes);
```

* You can also get all the enabled features for the user by calling the following method which returns a list of strings representing the feature keys:
```
var enabledFeatures = optimizelyClient.getEnabledFeatures('user_1', userAttributes);
```

* Introduces Feature Variables to configure or parameterize your feature. There are four variable types: `Integer`, `String`, `Double`, `Boolean`.
```
var stringVariable = optimizelyClient.getFeatureVariableString('my_feature_key', 'string_variable_key', 'user_1');
var integerVariable = optimizelyClient.getFeatureVariableInteger('my_feature_key', 'integer_variable_key', 'user_1');
var doubleVariable = optimizelyClient.getFeatureVariableDouble('my_feature_key', 'double_variable_key', 'user_1');
var booleanVariable = optimizelyClient.getFeatureVariableBoolean('my_feature_key', 'boolean_variable_key', 'user_1');
```

### Breaking changes
* The `track` API with revenue value as a stand-alone parameter has been removed. The revenue value should be passed in as an entry of the event tags map. The key for the revenue tag is `revenue` and will be treated by Optimizely as the key for analyzing revenue data in results.
```
var eventTags = {
  'revenue': 1200
};

optimizelyClient.track('event_key', 'user_id', userAttributes, eventTags);
```
* The package name has changed from `optimizely-client-sdk` to `optimizely-sdk` as we have consolidated both Node and JavaScript SDKs into one.

## 1.6.0

* Bump optimizely-server-sdk to version 1.5.0, which includes:
  - Implemented IP anonymization.
  - Implemented bucketing IDs.
  - Implemented notification listeners.

## 1.5.1
* Bump optimizely-server-sdk to version 1.4.2, which includes:
  - Bug fix to filter out undefined values in attributes and event tags
  - Remove a duplicated test

## 1.5.0
* Bump optimizely-server-sdk to version 1.4.0, which includes:
  - Add support for numeric metrics.
  - Add getForcedVariation and setForcedVariation methods for client-side variation setting
  - Bug fix for filtering out null attribute and event tag values

## 1.4.3
* Default skipJSONValidation to true
* Bump optimizely-server-sdk to version 1.3.3, which includes:
  - Removed JSON Schema Validator from Optimizely constructor
  - Updated SDK to use new event endpoint
  - Minor bug fixes

## 1.4.2
* Minor performance improvements.

## 1.4.1
* Switched to karma/browserstack for cross-browser testing
* Removed es6-promise
* Bump optimizely-server-sdk to version 1.3.1, which includes:
  - Minor performance improvements.

## 1.4.0
* Reduce lodash footprint.
* Bump optimizely-server-sdk to version 1.3.0, which includes:
  - Introduced user profile service.
  - Minor performance and readibility improvements.

## 1.3.5
* Bump optimizely-server-sdk to version 1.2.3, which includes:
  - Switched to json-schema library which has a smaller footprint.
  - Refactored order of bucketing logic.
  - Refactor lodash dependencies.
  - Fixed error on validation for objects with undefined values for attributes.

## 1.3.4
* Bump optimizely-server-sdk to version 1.2.2, which includes:
  - Use the 'name' field for tracking event tags instead of 'id'.

## 1.3.3
* Include index.js in package.json files to make sure it gets published regardless of node environment.

## 1.3.2
* Bump to 1.3.2 to re-publish to npm

## 1.3.1
* Bump optimizely-server-sdk to version 1.2.1, which includes:
  - Gracefully handle empty traffic allocation ranges.

## 1.3.0
* Bump optimizely-server-sdk to version 1.2.0, which includes:
  - Introduce support for event tags.
  - Add optional eventTags argument to track method signature.
  - Removed optional eventValue argument from track method signature.
  - Removed optional sessionId argument from activate and track method signatures.
  - Allow log level config on createInstance method.

## 1.2.2
* Remove .npmignore to consolidate with .gitignore.
* Add dist and lib directories to "files" in package.json.

## 1.2.1
* Fix webpack build error.

## 1.2.0
* Bump optimizely-server-sdk to version 1.1.0, which includes:
  - Add optional sessionId argument to activate and track method signatures.
  - Add sessionId and revision to event ticket.
  - Add 'Launched' status where user gets bucketed but event is not sent to Optimizely.

## 1.1.1
* Bump to optimizely-server-sdk to version 1.0.1, which includes:
  - Fix bug so conversion event is not sent if user is not bucketed into any experiment.
  - Bump bluebird version from 3.3.5 to 3.4.6.
  - Update event endpoint from p13nlog.dz.optimizely to logx.optimizely.

## 1.1.0
* Add global variable name export for use in non-CommonJS environments
* Remove redundant lodash core dependency to reduce bundle bloat

## 1.0.0
* Introduce support for Full Stack projects in Optimizely X with no breaking changes from previous version.
* Introduce more graceful exception handling in instantiation and core methods.
* Update whitelisting to take precedence over audience condition evaluation.
* Fix bug activating/tracking with attributes not in the datafile.

## 0.1.4
* Add functionality for New Optimizely endpoint.

## 0.1.3
* Add environment detection to event builder so it can distinguish between events sent from node or the browser.

## 0.1.2
* Add CORS param to prevent browsers from logging cors errors in the console when dispatching events.

## 0.1.1
* Remove percentageIncluded field from JSON schema, which is not needed.

## 0.1.0
* Beta release of the Javascript SDK for our Optimizely testing solution
