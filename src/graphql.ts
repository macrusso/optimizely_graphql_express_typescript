import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql'
import {
  Args,
  IsFeatureEnabledArgs,
  SetForcedVariationArgs,
  activate,
  getVariation,
  getForcedVariation,
  setForcedVariation,
  getEnabledFeatures,
  isFeatureEnabled
} from './optimizely'


const schema = buildSchema(`
  type Query {
    activate(userId: String!): String
    getVariation(userId: String!): String
    getForcedVariation(userId: String!): String
    setForcedVariation(userId: String!, variationKey): String
    getEnabledFeatures(userId: String!): [String]
    isFeatureEnabled(userId: String!, featureKey: String!): [String]
  }

  type Mutations {
    setForcedVariation(userId: String!, variationKey): Boolean
  }
`);

const root = {
  activate: (args: Args) => {
    const { userId, experimentKey } = args
    return activate({ userId, experimentKey })
  },
  getVariation: (args: Args) => {
    const { userId, experimentKey } = args
    return getVariation({ userId, experimentKey })
  },
  getForcedVariation: (args: Args) => {
    const { userId, experimentKey } = args
    return getForcedVariation({ userId, experimentKey })
  },
  setForcedVariation: (args: SetForcedVariationArgs) => {
    const { userId, experimentKey, variationKey = null } = args
    return setForcedVariation({ userId, experimentKey, variationKey })
  },
  getEnabledFeatures: (args: Args) => {
    return getEnabledFeatures(args.userId)
  },
  isFeatureEnabled: (args: IsFeatureEnabledArgs) => {
    const { userId, experimentKey, featureKey } = args
    return isFeatureEnabled({ userId, experimentKey, featureKey })
  },
};

export default graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})