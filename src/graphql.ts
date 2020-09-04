import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql'
import { getVariation } from './optimizely'

interface Args {
  userId: string
}

const schema = buildSchema(`
  type Query {
    variation(userId: String!): String
  }
`);

const root = {
  variation: (args: Args) => {
    return getVariation(args.userId)
  },
};

export default graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})