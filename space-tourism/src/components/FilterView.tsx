import { FC } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface FilterViewProps {
  jobRole: string;
  jobLevel: string;
  jobLang: string[];
  jobTools: string[];
  handleRemoveRole: () => void;
  handleRemoveLevel: () => void;
  handleRemoveLang: (language: string) => void;
  handleRemoveTool: (tool: string) => void;
}

const FilterView: FC<FilterViewProps> = ({
  jobLang,
  jobLevel,
  jobRole,
  jobTools,
  handleRemoveLang,
  handleRemoveLevel,
  handleRemoveRole,
  handleRemoveTool,
}) => {
  return (
    <div>
      <Stack direction="row" spacing={1}>
        {jobRole.length > 0 ? (
          <Chip label={jobRole} onClick={handleRemoveRole} />
        ) : null}
        {jobLevel.length > 0 ? (
          <Chip label={jobLevel} onClick={handleRemoveLevel} />
        ) : null}

        {jobLang.map((lang) => {
          return <Chip label={lang} onClick={() => handleRemoveLang(lang)} />;
        })}
        {jobTools.map((tool) => {
          return <Chip label={tool} onClick={() => handleRemoveTool(tool)} />;
        })}
      </Stack>
    </div>
  );
};

export default FilterView;
