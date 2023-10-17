import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { useJob } from "../lib/graphql/hooks";
import React from "react";

function JobPage() {
  const { jobId } = useParams();
  const { job, loading, error } = useJob(jobId || "");

  if (loading) return <div>Loading...</div>;

  if (error) return <div>404 NOT FOUND</div>;

  return (
    <div>
      <h1 className="title is-3">{job.title}</h1>
      <h2 className="subtitle is-5">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Time posted: {formatDate(job.date, "long")}
        </div>
        <p className="block">{job.description}</p>
      </div>
    </div>
  );
}

export default JobPage;
