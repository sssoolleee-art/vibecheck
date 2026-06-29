import { useEffect, useRef } from 'react';
import { TossAds, loadFullScreenAd, showFullScreenAd, IAP } from '@apps-in-toss/web-framework';

export const AD_ID = {
  banner: 'ait.v2.live.58ee56b0fe7244f9',
  interstitial: 'ait.v2.live.e973eceb077f49ef',
  rewarded: 'ait.v2.live.f794425e10224af3',
};

export const AD_FREE_SKU = 'ait.0000032096.6f110e23.14a95f6cf1.8232478338';
export const AD_FREE_KEY = 'desireindex_ad_free';

export function isAdFree(): boolean {
  return localStorage.getItem(AD_FREE_KEY) === 'true';
}

export async function restoreAdFree(onUnlocked: () => void) {
  if (isAdFree()) { onUnlocked(); return; }
  try {
    const res = await IAP.getCompletedOrRefundedOrders();
    if (res?.orders.some(o => o.status === 'COMPLETED' && o.sku === AD_FREE_SKU)) {
      localStorage.setItem(AD_FREE_KEY, 'true');
      onUnlocked();
    }
  } catch {}
}

export function buyAdFree(onSuccess: () => void, onDone: () => void) {
  const cleanup = IAP.createOneTimePurchaseOrder({
    options: {
      sku: AD_FREE_SKU,
      processProductGrant: async () => {
        try { localStorage.setItem(AD_FREE_KEY, 'true'); onSuccess(); return true; }
        catch { return false; }
      },
    },
    onEvent: () => { cleanup(); onDone(); },
    onError: () => { cleanup(); onDone(); },
  });
}

export function showInterstitialAd(): Promise<void> {
  return new Promise((resolve) => {
    const cleanup = loadFullScreenAd({
      options: { adGroupId: AD_ID.interstitial },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          showFullScreenAd({
            options: { adGroupId: AD_ID.interstitial },
            onEvent: (e) => {
              if (e.type === 'dismissed') { cleanup(); resolve(); }
            },
            onError: () => { cleanup(); resolve(); },
          });
        }
      },
      onError: () => resolve(),
    });
    setTimeout(() => { cleanup(); resolve(); }, 30000);
  });
}

export function showRewardedAd(): Promise<boolean> {
  return new Promise((resolve) => {
    let resolved = false;
    function done(val: boolean) {
      if (resolved) return;
      resolved = true;
      resolve(val);
    }
    const cleanup = loadFullScreenAd({
      options: { adGroupId: AD_ID.rewarded },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          showFullScreenAd({
            options: { adGroupId: AD_ID.rewarded },
            onEvent: (e) => {
              if (e.type === 'dismissed') { cleanup(); done(true); }
            },
            onError: () => { cleanup(); done(true); },
          });
        }
      },
      onError: () => done(false),
    });
    setTimeout(() => { cleanup(); done(false); }, 30000);
  });
}

export function BannerAd() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !TossAds.attachBanner.isSupported()) return;
    const result = TossAds.attachBanner(AD_ID.banner, ref.current);
    return () => result.destroy();
  }, []);
  return <div ref={ref} style={{ width: '100%', minHeight: 50 }} />;
}
