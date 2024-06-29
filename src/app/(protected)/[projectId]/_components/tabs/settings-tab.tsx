import { CreateProjectForm } from "../update-project/update-project-form";
import { UploadProjectThumbnailComponent } from "../upload-component";

interface SettingsTabProps {
  projectId: string;
}

export const SettingsTab = ({ projectId }: SettingsTabProps) => {
  return (
    <>
      {/* <CreateProjectForm /> */}
      <UploadProjectThumbnailComponent projectId={projectId} />
    </>
  );
};
