import type { AdSdkParams } from './domain/ad_sdk_params'
import type { FakeVast } from './domain/fake_vast'
import { AdEvents } from './domain/ad_events'

import { fakeVast } from './stubs/vast_stub'

let adVideoTag: HTMLVideoElement | null = null
let adContainer: HTMLElement | null = null
let contentVideoTag: HTMLVideoElement | null = null
let midrollAlreadyPlayed = false

const adEventEmitter = new EventTarget()

const adSdk = {
  loadAds: ({
    adVideoTag: adTag,
    adContainer: container,
    contentVideoTag: contentTag,
  }: AdSdkParams): void => {
    resetListeners()
    adVideoTag = adTag
    adContainer = container
    contentVideoTag = contentTag
    fakeVast.position = 'preroll'
    midrollAlreadyPlayed = false

    contentVideoTag.addEventListener('timeupdate', handleMidroll)
    contentVideoTag.addEventListener('ended', handlePostroll)

    displayAndStartAd(fakeVast.mediaFile)
  },
  playAd: (): void => {
    adEventEmitter.dispatchEvent(new Event(AdEvents.AD_PLAY))
    adVideoTag?.play()
  },
  pauseAd: (): void => {
    adEventEmitter.dispatchEvent(new Event(AdEvents.AD_PAUSE))
    adVideoTag?.pause()
  },
  skipAd: (): void => {
    adEventEmitter.dispatchEvent(new Event(AdEvents.AD_SKIP))
    hideAd()
  },
  Events: AdEvents,
  on: (event: AdEvents, callback: EventListener): void => {
    adEventEmitter.addEventListener(event, callback)
  },
  off: (event: AdEvents, callback: EventListener): void => {
    adEventEmitter.removeEventListener(event, callback)
  },
  getAdDetails: (): { position: FakeVast['position'] } => {
    return { position: fakeVast.position }
  },
}

const displayAndStartAd = (mediaFile: string): void => {
  if (!adContainer || !adVideoTag) return

  adEventEmitter.dispatchEvent(new Event(AdEvents.AD_BREAK_START))
  adEventEmitter.dispatchEvent(new Event(AdEvents.AD_LOAD))
  adEventEmitter.dispatchEvent(new Event(AdEvents.AD_START))

  adContainer.style.display = 'block'
  adVideoTag.src = mediaFile
  adVideoTag.play()
  setTimeout(() => {
    skipButton.style.display = 'block'
  }, fakeVast.skipOffset * 1000)

  adVideoTag.addEventListener('ended', hideAd)
}

const hideAd = (): void => {
  if (!adContainer || !adVideoTag) return

  adEventEmitter.dispatchEvent(new Event(AdEvents.AD_END))
  adEventEmitter.dispatchEvent(new Event(AdEvents.AD_BREAK_END))

  adContainer.style.display = 'none'
  skipButton.style.display = 'none'
  adVideoTag.pause()
  adVideoTag.removeEventListener('ended', hideAd)
}

const handleMidroll = (): void => {
  if (!contentVideoTag || midrollAlreadyPlayed) return

  if (Math.abs(contentVideoTag.currentTime - fakeVast.midrollTime) <= 0.5) {
    midrollAlreadyPlayed = true
    fakeVast.position = 'midroll'
    displayAndStartAd(fakeVast.mediaFile)
  }
}

const handlePostroll = (): void => {
  if (!contentVideoTag) return

  fakeVast.position = 'postroll'
  displayAndStartAd(fakeVast.mediaFile)
  adVideoTag?.addEventListener('ended', resetListeners)
}

const resetListeners = (): void => {
  if (!contentVideoTag) return

  contentVideoTag.removeEventListener('timeupdate', handleMidroll)
  contentVideoTag.removeEventListener('ended', handlePostroll)
}

const createSkipButton = (): HTMLButtonElement => {
  const button = document.createElement('button')
  button.innerText = 'Skip'
  button.style.position = 'absolute'
  button.style.bottom = '10px'
  button.style.right = '10px'
  button.style.display = 'none'

  button.addEventListener('click', hideAd)

  return button
}

const skipButton = createSkipButton()

export default adSdk
