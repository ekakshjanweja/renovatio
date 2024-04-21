import { UploadProjectThumbnailComponent } from "./_components/upload-component";
import { getProjectById } from "@/services/project-service";
import Image from "next/image";

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
        <Image
          src={project.thumbnailUrl!}
          alt={project.name}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto rounded-xl object-cover"
          quality={50}
          loading="lazy"
          placeholder="blur"
          blurDataURL={project.thumbnailUrl!}
        />
        <UploadProjectThumbnailComponent projectId={projectId} />
      </div>
    </>
  );
};

export default UserProjectPage;
