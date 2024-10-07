"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Room } from "@/types/interfaces";

interface UploadImageForGenerationProps {
  room: Room;
}

export const UploadImageForGenerationComponent = ({
  room,
}: UploadImageForGenerationProps) => {
  return (
    <>
      <div className="rounded-xl outline-dashed outline-muted h-1/2 w-[350px] mt-8">
        <UploadDropzone
          endpoint="projectThumbnailUploader"
          appearance={{
            container: { height: 200 },
            uploadIcon: { scale: 0.8 },
            button: {
              padding: "20px 20px",
              background: "#571c9e",
              margin: "20px 20px",
            },
          }}
          onClientUploadComplete={(res) => {
            /*
              TODO: 
                1. Upload Images
                2. Add the uploaded
            */
          }}
        />
      </div>
    </>
  );
};
