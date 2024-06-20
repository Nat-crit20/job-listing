import "./App.css";
import { FC, useEffect, useState } from "react";
import JobPost from "./components/JobPost";
import FilterView from "./components/FilterView";

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
  const [jobRole, setRole] = useState<string>("");
  const [jobLevel, setLevel] = useState<string>("");
  const [jobLang, setJobLang] = useState<string[]>([]);
  const [jobTools, setJobTools] = useState<string[]>([]);
  const handleSetRole = (role: string) => {
    setRole(role);
  };
  const handleSetLevel = (level: string) => {
    setLevel(level);
  };
  const handleSetLang = (language: string) => {
    if (!jobLang.includes(language)) {
      setJobLang((lang) => [...lang, language]);
    }
  };
  const handleSetTool = (tool: string) => {
    if (!jobTools.includes(tool)) {
      setJobTools((to) => [...to, tool]);
    }
  };
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
          const temp = job.languages[lang];
          jobLang.set(temp, temp);
        }
        for (const lang in languages) {
          //If the lang is not in the job list return
          const temp = languages[lang];
          if (!jobLang.get(temp)) {
            return;
          }
        }
      }
      if (tools) {
        const jobTool = new Map();

        for (const tool in job.tools) {
          const temp = job.tools[tool];
          jobTool.set(temp, temp); // Use the tool's name as the key and its data as the value
        }
        for (const tool in tools) {
          const temp = tools[tool];

          if (!jobTool.get(temp)) {
            return;
          }
        }
      }
      return job;
    });
    console.log(newJobs);
    setCurrentJobs(newJobs);
  };

  useEffect(() => {
    handleFilter({
      role: jobRole,
      level: jobLevel,
      languages: jobLang,
      tools: jobTools,
    });
    console.log("Click");
  }, [jobRole, jobLevel, jobLang, jobTools]);

  return (
    <div>
      <h1>{title}</h1>
      <FilterView
        jobRole={jobRole}
        jobLevel={jobLevel}
        jobLang={jobLang}
        jobTools={jobTools}
      />
      {currentJobs.map((job) => {
        return (
          <div>
            <JobPost
              job={job}
              handleSetRole={handleSetRole}
              handleSetLevel={handleSetLevel}
              handleSetLang={handleSetLang}
              handleSetTool={handleSetTool}
            />
          </div>
        );
      })}
    </div>
  );
};

export default App;
