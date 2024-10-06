import { getProjectById } from "@/actions/project-action";
import { AutoScrollCarousel } from "../auto-scroll-carousel";
import { ProjectDetailsCard } from "../cards/project-details-card";
import { DesignerDetailsCard } from "../cards/designer-details-card";
import { PlanDetailsCard } from "../cards/plan-details-card";
import { ExploreProjectCard } from "../cards/explore-project-card";
import {
  deleteImageFromRoom,
  getAllRoomsForProject,
} from "@/actions/room-action";
import { Project, Room } from "@/types/interfaces";
import { RoomCard } from "../cards/room-card";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ProjectImageGrid } from "../project-images-grid";

interface DetailsTabProps {
  projectId: string;
}

export const DetailsTab = async ({ projectId }: DetailsTabProps) => {
  const project: Project = await getProjectById(projectId);

  const projectImages: string[] = [
    project.thumbnailUrl!,
    project.thumbnailUrl!,
    project.thumbnailUrl!,
    project.thumbnailUrl!,
  ];

  const rooms: Room[] = await getAllRoomsForProject(projectId);

  const roomImages: string[] = [];

  return (
    <>
      <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-16 mx-auto justify-center">
        <AutoScrollCarousel images={projectImages} />
        <ProjectDetailsCard project={project} />
        <ExploreProjectCard
          projectId={projectId}
          designerId={project.designerId!}
        />
        <DesignerDetailsCard designerId={project.designerId} />
        {rooms.map((room) => (
          <>
            <RoomCard room={room} />
          </>
        ))}
      </div>
      <ProjectImageGrid project={project} />
    </>
  );
};
