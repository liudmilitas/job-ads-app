import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks';

function HomePage() {
  const { jobs, loading, error } = useJobs();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>404 NOT FOUND</div>;

  return (
    <div>
      <h1 className="title">
        Newest Jobs
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
