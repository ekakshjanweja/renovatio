"use client";

import { uploadProjectThumbnail } from "@/actions/image-uploader";
import { UploadDropzone } from "@/lib/uploadthing";

interface UploadProps {
  projectId: string;
}

export const UploadProjectThumbnailComponent = ({ projectId }: UploadProps) => {
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
            uploadProjectThumbnail(projectId, res?.[0]?.url);
          }}
        />
      </div>
    </>
  );
};

export const UploadProjectImagesComponent = ({ projectId }: UploadProps) => {
  return <></>;
};
