import { UploadProjectThumbnailComponent } from "./_components/upload-component";
import { getProjectById } from "@/services/project-service";
import Image from "next/image";
import { DeleteComponent } from "./_components/delete-component";
import { AutoScrollCarousel } from "./_components/auto-scroll-carousel";
import { ProjectDetailsCardWrapper } from "./_components/project-details-card";
import { LocationCard } from "./_components/cards/location-card";

interface UserProjectPageProps {
  params: {
    projectId: string;
  };
}

const UserProjectPage = async ({ params }: UserProjectPageProps) => {
  const projectId = params.projectId;

  const project = await getProjectById(projectId);

  const projectImages: string[] = [
    project.thumbnailUrl!,
    project.thumbnailUrl!,
  ];

  return (
    <>
      <div className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full gap-y-8 gap-x-4 mx-auto">
          <AutoScrollCarousel images={projectImages} />
          <div className="hidden lg:flex md:flex-col lg:h-[450px] xl:h-[500px] justify-between">
            <LocationCard
              isSmall={true}
              projectLocation={project.location}
              landmark="DPS Dwarka"
            />
          </div>
          <LocationCard
            isSmall={false}
            projectLocation={project.location}
            landmark="DPS Dwarka"
          />
        </div>
        {/* <div className="w-[400px] h-[350px]">
          <AutoScrollCarousel images={projectImages} />
        </div> */}
      </div>
    </>
  );
};

// const UserProjectPage = async ({ params }: UserProjectPageProps) => {
//   const projectId = params.projectId;

//   const project = await getProjectById(projectId);

//   return (
//     <>
//       <div className="p-6">
//         <DeleteComponent projectId={project.id} />
//         <div>{project.id}</div>
//         <div>{project.name}</div>
//         <div>{project.category}</div>
//         {project.thumbnailUrl != null && (
//           <Image
//             src={project.thumbnailUrl}
//             alt={project.name}
//             width="0"
//             height="0"
//             sizes="100vw"
//             className="w-full h-auto rounded-xl object-cover"
//             quality={50}
//             loading="lazy"
//             // placeholder="blur"
//             // blurDataURL={project.thumbnailUrl!}
//           />
//         )}
//         <div>Update Thumbnail</div>
//         <UploadProjectThumbnailComponent projectId={projectId} />
//       </div>
//     </>
//   );
// };

export default UserProjectPage;
