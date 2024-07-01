import { DeleteProjectButton } from "../delete-project-button";
import { UploadProjectThumbnailComponent } from "../upload-component";

interface SettingsTabProps {
  projectId: string;
}

export const SettingsTab = ({ projectId }: SettingsTabProps) => {
  return (
    <>
      <UploadProjectThumbnailComponent projectId={projectId} />
      <DeleteProjectButton projectId={projectId} />
    </>
  );
};
