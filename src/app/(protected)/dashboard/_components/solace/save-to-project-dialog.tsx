"use client";

import { addImageToProject } from "@/actions/project-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types/interfaces";
import { useState } from "react";

interface SaveToProjectDialogProps {
  imageUrl: string;
  projects: Project[];
}

export const SaveToProjectDialog = ({
  imageUrl,
  projects,
}: SaveToProjectDialogProps) => {
  const [selectedProject, setSelectedProject] = useState("");

  const handleProjectSelect = (value: string) => {
    setSelectedProject(value);
  };

  const handleSubmit = () => {
    if (selectedProject) {
      addImageToProject(selectedProject, imageUrl);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-custom hover:bg-custom">
            Save to project
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save to project</DialogTitle>
            <DialogDescription>
              Save this image to a project in your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select onValueChange={handleProjectSelect} value={selectedProject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleSubmit} disabled={!selectedProject}>
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
