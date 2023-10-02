import { createJob, getJob, getJobs, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        job: async (_root, { id }) => {
            const job = await getJob(id);
            if (!job) {
              throw notFoundError('No Job found with id ' + id);
            }
            return job;
          },
        jobs: () => getJobs(),
        company: async (_root, { id }) => {
            const company = await getCompany(id);
            if (!company) {
                throw notFoundError(`Company with id ${id} not found`);
            }
            return company;
        },

    },

    Job: {
        date: (job) => toISODate(job.createdAt),
        company: (job) => getCompany(job.companyId),
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },

    Mutation: {
        createJob: (_root, { input: { title, description } }) => {
            const companyId = 'FjcJCHJALA4i'; // hardcoded for now, change when we add auth
            return createJob({ companyId, title, description });
        },
    }
    
};

function notFoundError(error) {
    return new GraphQLError(error, 
        { extensions: { code: '404_NOT_FOUND' }}
    );
}

function toISODate(date) {
    return date.slice(0, 'yyyy-mm-dd'.length);
}