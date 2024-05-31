// import './JobPost.css'
import { FC } from "react";

interface job {
  job: {
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
  };
}

const JobPost: FC<job> = ({ job }) => {
  return (
    <div>
      <h2>{job.position}</h2>
    </div>
  );
};

export default JobPost;
