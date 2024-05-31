import "./App.css";
import { FC, useEffect, useState } from "react";
import JobPost from "./components/JobPost";

interface AppProps {
  title: string;
}

const App: FC<AppProps> = ({ title }) => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getJobs = () => {
      try {
        fetch("../data.json")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setJobs(data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  });
  return (
    <div>
      <h1>{title}</h1>
      {jobs.map((job) => {
        return (
          <div>
            <JobPost job={job} />
          </div>
        );
      })}
    </div>
  );
};

export default App;
