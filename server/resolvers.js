import { getJob, getJobs, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        job: async (_root, { id }) => {
            const job = await getJob(id);
            if (!job) {
                throw notFoundError(`Job with id ${id} not found`);
            }
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
    
};

function notFoundError(error) {
    return new GraphQLError(error, 
        { extensions: { code: '404_NOT_FOUND' }}
    );
}

function toISODate(date) {
    return date.slice(0, 'yyyy-mm-dd'.length);
}