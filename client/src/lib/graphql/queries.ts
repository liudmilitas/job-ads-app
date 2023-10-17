import { getAccessToken } from "../auth";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  concat,
  createHttpLink,
} from "@apollo/client";
import { graphql } from "../../generated";

const httpLink = createHttpLink({
  uri: "http://localhost:9000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export const jobsQuery = graphql(`
  query JobsQuery($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      items {
        id
        title
        date
        company {
          id
          name
        }
      }
    }
  }
`);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jobDetailFragment = graphql(`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`);

export const jobByIdQuery = graphql(`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
`);

export const companyByIdQuery = graphql(`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        date
        title
      }
    }
  }
`);

export const createJobMutation = graphql(`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
`);

export async function deleteJob(id) {
  const mutation = graphql(`
    mutation DeleteJob($id: ID!) {
      job: deleteJob(id: $id) {
        id
      }
    }
  `);
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { id },
  });
  return data.job;
}
