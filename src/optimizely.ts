import optimizelySDK, { Client } from '@optimizely/optimizely-sdk';

export const optimizelyInstance: Client = optimizelySDK.createInstance({
  sdkKey: process.env.SDK_KEY
});

export const getVariation = (userId: string) => {
  console.log(userId)
  const variation = optimizelyInstance.activate('local_test_experiment', userId);
  console.log(variation);

  if (variation === 'variation_1') {
    return 'variation_1'
  } else if (variation === 'variation_2') {
    return 'variation_2'
  } else {
    return 'default'
  }
}
