import { createJob, getJob, getJobs, getJobsByCompany, deleteJob, updateJob } from './db/jobs.js';
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
        createJob: (_root, { input: { title, description } }, { user }) => {
            if (!user) {
                throw unauthorizedError('You must be signed in to create a job');
            }
            const companyId = 'FjcJCHJALA4i'; // hardcoded for now, change when we add auth
            return createJob({ companyId, title, description });
        },
        deleteJob: async (_root, { id }, { user }) =>  {
            if (!user) {
                throw unauthorizedError('You must be signed in to delete a job');
            }
            const job =  await deleteJob(id, user.companyId);
            if (!job) {
                throw notFoundError(`No job found with id ${id}`);
            }
            return job;
        },
        updateJob: async (_root, { input: { id, title, description }}, { user }) => {
            if (!user) {
                throw unauthorizedError('You must be signed in to update a job');
            }
            const job = await updateJob({ id, companyId: user.companyId, title, description });
            if (!job) {
                throw notFoundError(`No job found with id ${id}`);
            }
            return job;
        },
    }
    
};

function notFoundError(error) {
    return new GraphQLError(error, 
        { extensions: { code: '404_NOT_FOUND' }}
    );
}

function unauthorizedError(error) {
    return new GraphQLError(error, 
        { extensions: { code: 'NOT AUTHORIRED FOR THIS ACTION' }}
    );
}

function toISODate(date) {
    return date.slice(0, 'yyyy-mm-dd'.length);
}