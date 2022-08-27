import type { PWAEvent } from './usePWAEvent.js'

export const useForceUpdate = (event: PWAEvent): void => {
  event.on('updatefound', () => {
    navigator.serviceWorker.getRegistration().then((registration) => {
      // check whether a valid service worker is actived
      if (registration && registration.active)
        // force refresh
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.location.reload(true)
      // unregister the service worker
      // void useUnregister().then((isSuccess) => {
      //   if (isSuccess) window.location.reload();
      // });
    })
  })
}
