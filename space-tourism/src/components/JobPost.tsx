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
}

const JobPost: FC<job> = ({ job }) => {
  return (
    <div>
      <Card variant="outlined" sx={{ minWidth: 600 }}>
        <CardContent>
          <h2>{job.position}</h2>
          <img src={job.logo} alt="" />
          <Stack direction="row" spacing={1}>
            <Chip label={job.role} />
            <Chip label={job.level} />
            {job.languages.map((language) => {
              return <Chip label={language} />;
            })}
            {job.tools.map((tool) => {
              return <Chip label={tool} />;
            })}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPost;
