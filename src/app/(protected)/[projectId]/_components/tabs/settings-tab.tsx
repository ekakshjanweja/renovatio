import { DeleteProjectButton } from "../delete-project-button";
import { UploadProjectThumbnailComponent } from "../upload-component";

interface SettingsTabProps {
  projectId: string;
}

export const SettingsTab = ({ projectId }: SettingsTabProps) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <UploadProjectThumbnailComponent projectId={projectId} />
        <div className="flex ">
          <p>Delete Project</p>
          <DeleteProjectButton projectId={projectId} />
        </div>
      </div>
    </>
  );
};
