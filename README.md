# Ad SDK Web

A lightweight web wrapper for Dailymotion's Ad SDK – load, manage, and interact with video ads easily in modern web players.

[![npm](https://img.shields.io/npm/v/@dailymotion/ad-sdk-web.svg)](https://www.npmjs.com/package/@dailymotion/ad-sdk-web)

## 📘 Public API Documentation

### `async initialize(playerContainer: HTMLElement): Promise<void>`

Loads the external ad SDK script and creates internal DOM elements for ad playback.<br />
This method should be called before any other function of the SDK and once per page.

**Parameters:**

- `playerContainer`: `HTMLElement`
  The DOM element where the ad container will be mounted.

**Throws:**
If the container is missing or the script fails to load.

---

### `loadAdsSequence(appState: AppState): void`

Loads ads sequence with the provided contextual information. <br />

After this call, the ad SDK will listen to the progress of the video and will trigger an `AD_BREAK_START` event whenever an ad break is about to begin. When this event occurs, the video player is expected to pause playback. Playback should resume only after the corresponding AD_BREAK_END event is received. <br />

A preroll ad may start automatically after this call. If no preroll is available, the SDK will send an AD_BREAK_END event to indicate that content playback can proceed.<br />

This method should be called once per video, before starting the main content.

**Parameters:**

- `appState`: `AppState`
  A structured object providing ad targeting and playback environment data.  
  👉 **See full structure below** or jump to [AppState](#AppState)

---

### `playAd(): void`

Request the SDK to start the ad playback.

**Throws:**  
If the SDK is not initialized.

---

### `pauseAd(): void`

Request the SDK to pause the ad.

**Throws:**  
If the SDK is not initialized.

---

### `skipAd(): void`

Request the SDK to skip the currently playing ad.

**Throws:**  
If the SDK is not initialized.

---

### `getAdDetails(): AdDetails`

Returns detailed information about the currently playing ad.

**Returns:**  
An `AdDetails` object containing properties such as `position`, ad duration, and other metadata.

👉 **See full structure below** or jump to [AdDetails](#AdDetails)

---

### `on(event: AdEvents, callback: () => void): void`

Subscribes to a specific Ad SDK event.

**Parameters:**

- `event`: `AdEvents`  
  The event name to listen for.  
  👉 **See [`AdEvents`](#AdEvents) for available event names.**

- `callback`: `() => void`  
  The callback function to execute when the event occurs.

**Throws:**  
If the Ad SDK is not initialized.

---

### `off(event: AdEvents, callback: () => void): void`

Unsubscribes from a specific Ad SDK event.

**Parameters:**

- `event`: `AdEvents`  
  The event name to stop listening for.  
  👉 **See [`AdEvents`](#AdEvents) for available event names.**

- `callback`: `() => void`  
  The callback function to remove.

**Throws:**  
If the Ad SDK is not initialized.

---

### `updateAppState(appState: AppState): void`

Updates the SDK with a new state payload.

**Parameters:**

- `appState`: `AppState`  
  Updated app context data.
  👉 **See full structure below** or jump to [AppState](#AppState)

---

<br />

# Data structures

## AppState

| Parameter   | Type               | Required | Description                                                                             |
| ----------- | ------------------ | -------- | --------------------------------------------------------------------------------------- |
| consent     | Consent            | yes      | User consent and privacy settings relevant for ad personalization and legal compliance. |
| video       | VideoState         | yes      | Current video playback state and characteristics affecting ad behavior.                 |
| environment | EnvironmentContext | yes      | Context about the app environment, locale, and device details.                          |
| player      | PlayerContext      | yes      | Settings and references related to the video player instance.                           |

## Consent

| Parameter                    | Type    | Required | Description                                                                   |
| ---------------------------- | ------- | -------- | ----------------------------------------------------------------------------- |
| ccpaConsent                  | string  | yes      | User’s consent status under the California Consumer Privacy Act.              |
| tcfConsent                   | string  | yes      | Consent string according to the IAB Transparency and Consent Framework (TCF). |
| isEnabledForTcf              | boolean | yes      | Flag indicating if TCF enforcement is enabled for this user/session.          |
| tcf2HasConsentForGoogle      | boolean | yes      | Whether consent has been given for Google in TCF v2 context.                  |
| tcf2HasConsentForDailymotion | boolean | yes      | Whether consent has been given for Dailymotion in TCF v2 context.             |
| isGdprApplicable             | boolean | yes      | Indicates if GDPR regulations apply to the current user/session.              |

## VideoState

| Parameter        | Type    | Required | Description                                                   |
| ---------------- | ------- | -------- | ------------------------------------------------------------- |
| id               | string  | yes      | The video id                                                  |
| isAutoplay       | boolean | yes      | Whether the video is set to autoplay.                         |
| type             | string  | yes      | Indicates if the type of the video. LIVE \| STREAM            |
| isCurrentTimeDVR | boolean | yes      | Whether the current playback position is within a DVR window. |
| isSeekable       | boolean | yes      | Whether the video player supports seeking functionality.      |
| duration         | number  | no       | The duration of the video                                     |
| viewId           | string  | yes      | Unique identifier for the video view or playback session.     |

## EnvironmentContext

| Parameter      | Type   | Required | Description                                                       |
| -------------- | ------ | -------- | ----------------------------------------------------------------- |
| appName        | string | yes      | Name of the app or website embedding the player.                  |
| locale         | string | yes      | Locale or language setting for the user session.                  |
| topDomain      | string | yes      | The top-level domain of the page embedding the player.            |
| embedder       | string | yes      | Identifier or name of the embedding entity or partner.            |
| clientType     | string | yes      | Type of client (e.g., web, mobile app, CTV).                      |
| deviceId       | string | yes      | Unique identifier for the user’s device.                          |
| trafficSegment | number | yes      | Numeric segment ID used for traffic or user segmentation.         |
| v1st           | string | yes      | A unique ID automatically assigned to your device by Dailymotion. |

## PlayerContext

| Parameter                  | Type             | Required | Description                                                      |
| -------------------------- | ---------------- | -------- | ---------------------------------------------------------------- |
| videoTag                   | HTMLVideoElement | yes      | Reference to the HTML video element.                             |
| isPlayerControlsEnabled    | boolean          | yes      | Whether the player controls are enabled.                         |
| is3rdPartyCookiesAvailable | boolean          | yes      | Indicates if third-party cookies are accessible in this context. |
| playedVideosCounter        | number           | yes      | Count of videos played during the session/user lifecycle.        |

<br />

# Internal data models

## AdDetails

| Parameter         | Type                                 | Description                                                  |
| ----------------- | ------------------------------------ | ------------------------------------------------------------ |
| skipOffset        | number                               | Time in seconds after which the ad can be skipped.           |
| duration          | number                               | Total duration of the ad in seconds.                         |
| mediaFile         | string                               | URL of the media file (video/audio) for the ad.              |
| impressionTracker | string                               | URL used to track ad impressions (views).                    |
| midrollTime       | number                               | Timestamp in the main content when a midroll ad should play. |
| position          | 'preroll' \| 'midroll' \| 'postroll' | Indicates the ad position relative to the main content.      |

## AdEvents

| Parameter                | Description                                        |
| ------------------------ | -------------------------------------------------- |
| AD_BREAK_START           | Sent when the ad break has started                 |
| AD_BREAK_END             | Sent when the ad break has ended                   |
| AD_LOAD                  | Sent when the ad has loaded                        |
| CONTENT_PAUSE_REQUESTED  | Sent to pause the content for midroll ads          |
| AD_START                 | Sent when the ad has started                       |
| AD_PLAY                  | Sent when the ad is played                         |
| AD_PAUSE                 | Sent when the ad is paused                         |
| AD_END                   | Sent when an ad has ended                          |
| AD_ERROR                 | Sent when an error preventing to play an ad occurs |
| CONTENT_RESUME_REQUESTED | Sent to resume content after an ad                 |

<br />

# SDK and Events sequences for each ad position

## Preroll sequence

<img src="https://statics.dmcdn.net/h/ad-sdk-web/preroll_sequence.png?v1" alt="Preroll sequence" width="500"/>

## Midroll sequence
<img src="https://statics.dmcdn.net/h/ad-sdk-web/midroll_sequence.png?v1" alt="Midroll sequence" width="500"/>

## Postroll sequence
<img src="https://statics.dmcdn.net/h/ad-sdk-web/postroll_sequence.png?v1" alt="Postroll sequence" width="500"/>

