import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "../auth";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new GraphQLClient("http://localhost:9000/graphql", {
  headers: () => {
    const accessToken = getAccessToken();
    if(accessToken){
      return {
        authorization: `Bearer ${accessToken}`
      }
    }
    return {};
  },
});

const apolloClient = new ApolloClient({
  uri: "http://localhost:9000/graphql",
  cache: new InMemoryCache(),
});

getJobs().then((data) => console.log(data));

export async function getJobs() {
  const query = gql`
    {
      jobs {
        id
        title
        date
        description
        company {
          id
          name
        }
      }
    }
  `;
  const { data } = await apolloClient.query({query});
  return data.jobs;
}

export async function getJob(id) {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        date
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const { data } = await apolloClient.query({
    query,
    variables: { id },
  });
  return data.job;
}

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const { job } = await client.request(mutation, {
    input: { title, description },
  });
  return job;
}

export async function deleteJob(id) {
  const mutation = gql`
    mutation DeleteJob($id: ID!) {
      job: deleteJob(id: $id) {
        id
      }
    }
  `;
  const { job } = await client.request(mutation, { id });
  return job;
}

export async function getCompany(id) {
  const query = gql`
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
  `;
  const { data } = await apolloClient.query({
    query,
    variables: { id },
  });
  return data.company;
}
