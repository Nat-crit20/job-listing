// import './JobPost.css'
import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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
  handleFilter: (filter: {
    role: string;
    level?: string;
    languages?: string[];
    tools?: string[];
  }) => void;
}

const JobPost: FC<job> = ({ job, handleFilter }) => {
  const submitFilter = () => {
    handleFilter({
      role: "Frontend",
      level: "Junior",
      languages: ["JavaScript"],
      tools: ["Sass"],
    });
    console.log("Click");
  };
  return (
    <div>
      <Card variant="outlined" sx={{ minWidth: 600 }}>
        <CardContent>
          <img src={job.logo} alt="" />
          <Stack direction="row" spacing={1}>
            <Chip variant="outlined" label={job.company} />
            {job.new && <Chip label="New" />}
            {job.featured && <Chip label="Featured" />}
          </Stack>
          <h2>{job.position}</h2>

          <Stack direction="row" spacing={1}>
            <Chip label={job.role} onClick={submitFilter} />
            <Chip label={job.level} onClick={submitFilter} />
            {job.languages.map((language) => {
              return <Chip label={language} onClick={submitFilter} />;
            })}
            {job.tools.map((tool) => {
              return <Chip label={tool} onClick={submitFilter} />;
            })}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPost;
