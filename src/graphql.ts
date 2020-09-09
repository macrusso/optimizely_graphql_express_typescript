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
    activate(userId: String!, experimentKey: String!): String
    getVariation(userId: String!, experimentKey: String!): String
    getForcedVariation(userId: String!, experimentKey: String!): String
    setForcedVariation(userId: String!, experimentKey: String!, variationKey: String): String
    getEnabledFeatures(userId: String!): [String]
    isFeatureEnabled(userId: String!, featureKey: String!): Boolean
  }

  type Mutation {
    setForcedVariation(userId: String!, experimentKey: String!, variationKey:String): Boolean
  }
`);

const root = {
  activate: (args: Args) => {
    return activate(args)
  },
  getVariation: (args: Args) => {
    return getVariation(args)
  },
  getForcedVariation: (args: Args) => {
    return getForcedVariation(args)
  },
  setForcedVariation: (args: SetForcedVariationArgs) => {
    const { variationKey = null } = args
    return setForcedVariation({ ...args, variationKey })
  },
  getEnabledFeatures: (args: Args) => {
    return getEnabledFeatures(args.userId)
  },
  isFeatureEnabled: (args: IsFeatureEnabledArgs) => {
    return isFeatureEnabled(args)
  },
};

export default graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})