import { UploadProjectThumbnailComponent } from "./_components/upload-component";
import { getProjectById } from "@/services/project-service";

interface UserProjectPageProps {
  params: {
    projectId: string;
  };
}

const UserProjectPage = async ({ params }: UserProjectPageProps) => {
  const projectId = params.projectId;

  const project = await getProjectById(projectId);

  return (
    <>
      <div className="p-6">
        <div>{project.id}</div>
        <div>{project.name}</div>
        <div>{project.category}</div>
        <div>{project.thumbnailUrl}</div>
        <UploadProjectThumbnailComponent projectId={projectId} />
      </div>
    </>
  );
};

export default UserProjectPage;
