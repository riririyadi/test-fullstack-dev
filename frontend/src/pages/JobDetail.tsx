import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import parse from "html-react-parser";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { jobType } from "./JobList";
const url = "http://localhost:3000/api/job";

const JobDetail = () => {
  const location = useLocation();
  const [job, setJob] = useState<jobType>({} as jobType);
  const [isLoading, setIsLoading] = useState(false);

  // get userId
  let userId = location.state.userId;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url + `/${userId}`);
        console.log(response.data);
        if (response.data) {
          setJob(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <nav className="h-16 w-screen bg-slate-500 flex justify-between items-center p-5 text-white sticky top-0">
        <h1 className="text-2xl">
          <span className="font-bold">GitHub</span>
          {"  "}Jobs
        </h1>
      </nav>
      {isLoading ? (
        <div></div>
      ) : (
        <div className="w-5/6 mx-auto mt-10">
          <p>
            {job.type} / {job.location}
          </p>
          <h1 className="text-2xl">{job.title}</h1>
          <div className="flex w-full gap-8">
            <div className="w-2/3">
              <p className="mt-5">{parse(job.description ?? "")}</p>
            </div>
            <div className="w-1/3">
              <img src={job.company_logo} alt="company-logo" />
              <div>{parse(job.company_url ?? "")}</div>

              <p className="mt-5">{parse(job.how_to_apply ?? "")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
