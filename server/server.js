import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js';
import { get } from 'node:http';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);
const typeDefs = await readFile('./schema.graphql', 'utf8');

function getContext({ req }) {
  return { auth: req.auth };
}

const apolloServer = new ApolloServer({  typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }));  

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
