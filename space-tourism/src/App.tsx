import "./App.css";
import { FC, useEffect, useState } from "react";
import JobPost from "./components/JobPost";

interface AppProps {
  title: string;
}

interface job {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: [string];
  tools: [string];
}

const App: FC<AppProps> = ({ title }) => {
  const [jobs, setJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);

  useEffect(() => {
    const getJobs = () => {
      try {
        fetch("../data.json")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setJobs(data);
            setCurrentJobs(data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  }, []);

  const handleFilter = (filters: {
    role?: string;
    level?: string;
    languages?: string[];
    tools?: string[];
  }) => {
    const { role, level, languages, tools } = filters;
    console.log(filters);

    const newJobs = jobs.filter((job: job) => {
      if (role && !(job.role === role)) {
        return;
      }
      if (level && !(job.level === level)) {
        return;
      }
      if (languages) {
        const jobLang = new Map();

        for (const lang in job.languages) {
          jobLang.set(lang, lang);
        }
        for (const lang in languages) {
          if (!jobLang.get(lang)) {
            return;
          }
        }
      }
      if (tools) {
        const jobTool = new Map();

        for (const tool in job.tools) {
          jobTool.set(tool, tool);
        }
        for (const tool in tools) {
          if (!jobTool.get(tool)) {
            return;
          }
        }
      }
      return job;
    });
    console.log(newJobs);
    setCurrentJobs(newJobs);
  };

  return (
    <div>
      <h1>{title}</h1>
      {currentJobs.map((job) => {
        return (
          <div>
            <JobPost job={job} handleFilter={handleFilter} />
          </div>
        );
      })}
    </div>
  );
};

export default App;
