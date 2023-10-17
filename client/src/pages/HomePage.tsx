import { useState } from "react";
import JobList from "../components/JobList";
import { useJobs } from "../lib/graphql/hooks";
import React from "react";

const JOBS_PER_PAGE = 5;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, loading, error } = useJobs(
    JOBS_PER_PAGE,
    (currentPage - 1) * JOBS_PER_PAGE,
  );

  if (loading) return <div>Loading...</div>;

  if (error) return <div>404 NOT FOUND</div>;

  return (
    <div>
      <h2 className="title">Newest Jobs</h2>
      <JobList jobs={jobs.items} />
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <button
          className="button is-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev page
        </button>
        <span className="mx-4">Page {currentPage}</span>
        <button
          disabled={jobs.items.length < JOBS_PER_PAGE}
          className="button is-primary"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next page
        </button>
      </nav>
    </div>
  );
}

export default HomePage;
