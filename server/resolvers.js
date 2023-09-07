import { getJob, getJobs } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
    Query: {
        job: (_root, { id }) => getJob(id),
        jobs: () => getJobs(),
    },

    Job: {
        date: (job) => toISODate(job.createdAt),
        company: (job) => getCompany(job.companyId),
    },
    
};

function toISODate(date) {
    return date.slice(0, 'yyyy-mm-dd'.length);
}