import { useParams } from "react-router";
import { companyByIdQuery } from "../lib/graphql/queries.js";
import JobList from "../components/JobList.js";
import { useQuery } from "@apollo/client";

function CompanyPage() {
  const { companyId } = useParams();
  const { data, loading, error } = useQuery(companyByIdQuery, {
    variables: { id: companyId }
  });

  const { company } = data || { company: {} };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>404 NOT FOUND</div>;

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2>Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
