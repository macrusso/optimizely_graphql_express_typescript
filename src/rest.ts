import { Router, Request, Response } from 'express'
import * as optimizely from './optimizely'
import { Args, IsFeatureEnabledArgs, SetForcedVariationArgs } from './optimizely'

const activate = (req: Request, res: Response) => {
  const { userId, experimentKey } = req.query
  const variation = optimizely.activate({ userId, experimentKey } as Args)

  return res.status(200).json(variation);
}

const getVariation = (req: Request, res: Response) => {
  const { userId, experimentKey } = req.query
  const variation = optimizely.getVariation({ userId, experimentKey } as Args)

  return res.status(200).json(variation);
}

const getForcedVariation = (req: Request, res: Response) => {
  const { userId, experimentKey } = req.query
  const variation = optimizely.getForcedVariation({ userId, experimentKey } as Args)

  return res.status(200).json(variation);
}

const setForcedVariation = (req: Request, res: Response) => {
  const { userId, experimentKey, variationKey } = req.body
  const isForcedVariationSet = optimizely.setForcedVariation({ userId, experimentKey, variationKey } as SetForcedVariationArgs)

  return res.status(200).json(isForcedVariationSet);
}

const getEnabledFeatures = (req: Request, res: Response) => {
  const features = optimizely.getEnabledFeatures(req.query.userId as string)
  return res.status(200).json(features);
}

const isFeatureEnabled = (req: Request, res: Response) => {
  const { userId, featureKey } = req.query
  const variation = optimizely.isFeatureEnabled({ userId, featureKey } as IsFeatureEnabledArgs)

  return res.status(200).json(variation);
}


const router = Router({ mergeParams: true });

router.route('/activate').get(activate)
router.route('/variation').get(getVariation)
router.route('/forced-variation').get(getForcedVariation).post(setForcedVariation)
router.route('/features').get(getEnabledFeatures)
router.route('/feature').get(isFeatureEnabled)

export default router