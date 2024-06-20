import { FC } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface FilterViewProps {
  jobRole: string;
  jobLevel: string;
  jobLang: string[];
  jobTools: string[];
}

const FilterView: FC<FilterViewProps> = ({
  jobLang,
  jobLevel,
  jobRole,
  jobTools,
}) => {
  return (
    <div>
      <Stack direction="row" spacing={1}>
        <Chip label={jobRole} />
        <Chip label={jobLevel} />
        {jobLang.map((lang) => {
          return <Chip label={lang} />;
        })}
        {jobTools.map((tool) => {
          return <Chip label={tool} />;
        })}
      </Stack>
    </div>
  );
};

export default FilterView;
