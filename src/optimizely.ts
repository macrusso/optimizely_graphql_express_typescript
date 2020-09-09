import optimizelySDK, { Client } from '@optimizely/optimizely-sdk';

export interface Args {
  userId: string
  experimentKey: string
}

export interface IsFeatureEnabledArgs extends Args {
  featureKey: string
}

export interface SetForcedVariationArgs extends Args {
  variationKey: string | null
}

export const optimizelyInstance: Client = optimizelySDK.createInstance({
  sdkKey: process.env.SDK_KEY
});

export const activate = ({ userId, experimentKey }: Args) => {
  const variation = optimizelyInstance.activate(experimentKey, userId);
  return variation
}

export const getVariation = ({ userId, experimentKey }: Args) => {
  const variation = optimizelyInstance.getVariation(experimentKey, userId);
  return variation
}

export const getForcedVariation = ({ userId, experimentKey }: Args) => {
  const variation = optimizelyInstance.getForcedVariation(experimentKey, userId);
  return variation
}

export const setForcedVariation = ({ userId, experimentKey, variationKey }: SetForcedVariationArgs) => {
  const isForcedVariationSet = optimizelyInstance.setForcedVariation(experimentKey, userId, variationKey)
  return isForcedVariationSet
}

export const getEnabledFeatures = (userId: string) => {
  const features = optimizelyInstance.getEnabledFeatures(userId);
  return features
}

export const isFeatureEnabled = ({ userId, featureKey }: IsFeatureEnabledArgs) => {
  const variation = optimizelyInstance.isFeatureEnabled(featureKey, userId);
  return variation
}
