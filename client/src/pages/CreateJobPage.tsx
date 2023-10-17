import { MouseEventHandler, useState } from "react";
import { useCreateJob } from "../lib/graphql/hooks";
import { useNavigate } from "react-router";
import React from "react";

function CreateJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { createJob, loading } = useCreateJob();

  const handleSubmit: MouseEventHandler = async (event) => {
    event.preventDefault();
    const job = await createJob(title, description);
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Job title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Job description </label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-link"
                disabled={loading}
                onClick={handleSubmit}
              >
                Create Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
