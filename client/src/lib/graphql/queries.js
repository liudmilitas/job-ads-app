import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

getJobs().then((data) => console.log(data));

export function getJobs() {
    const query = gql`{
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
    }`;

    return client.request(query);
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
    const { job } = await client.request(query, { id });
    return job;
  }