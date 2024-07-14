import { Button } from "@/components/ui/button";
import { DeleteProjectButton } from "../delete-project-button";
import { UploadProjectThumbnailComponent } from "../upload-component";

interface SettingsTabProps {
  projectId: string;
}

export const SettingsTab = ({ projectId }: SettingsTabProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 justify-start items-start">
        <UploadProjectThumbnailComponent projectId={projectId} />

        <DeleteProjectButton projectId={projectId} />
      </div>
    </>
  );
};
