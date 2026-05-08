import { loadFullScreenAd, showFullScreenAd } from '@apps-in-toss/web-framework';

export const INTERSTITIAL_AD_ID = 'ait.v2.live.9c5c5e9d7c9b43d2';

export function showInterstitialAd(): Promise<void> {
  return new Promise((resolve) => {
    const cleanup = loadFullScreenAd({
      options: { adGroupId: INTERSTITIAL_AD_ID },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          showFullScreenAd({
            options: { adGroupId: INTERSTITIAL_AD_ID },
            onEvent: (e) => {
              if (e.type === 'dismissed') resolve();
            },
            onError: () => resolve(),
          });
        }
      },
      onError: () => resolve(),
    });
    setTimeout(() => { cleanup(); resolve(); }, 10000);
  });
}
