import { getJob, getJobs, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
    Query: {
        job: (_root, { id }) => getJob(id),
        jobs: () => getJobs(),
        company: (_root, { id }) => getCompany(id),

    },

    Job: {
        date: (job) => toISODate(job.createdAt),
        company: (job) => getCompany(job.companyId),
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },
    
};

function toISODate(date) {
    return date.slice(0, 'yyyy-mm-dd'.length);
}