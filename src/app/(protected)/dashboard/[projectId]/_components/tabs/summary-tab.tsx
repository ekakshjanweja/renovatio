import { getProjectById } from "@/actions/project-action";
import { AutoScrollCarousel } from "../auto-scroll-carousel";
import { ProjectDetailsCard } from "../cards/project-details-card";
import { DesignerDetailsCard } from "../cards/designer-details";

interface SummaryTabProps {
  projectId: string;
}

export const SummaryTab = async ({ projectId }: SummaryTabProps) => {
  const project = await getProjectById(projectId);

  const projectImages: string[] = [
    project.thumbnailUrl!,
    project.thumbnailUrl!,
  ];

  return (
    <>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full gap-y-8 gap-x-16 mx-auto">
        <AutoScrollCarousel images={projectImages} />
        <ProjectDetailsCard project={project} />
        <DesignerDetailsCard designerId={project.designerId} />
      </div>
    </>
  );
};
