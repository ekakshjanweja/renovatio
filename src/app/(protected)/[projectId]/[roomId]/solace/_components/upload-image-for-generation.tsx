// "use client";

// import { updateRoom } from "@/actions/room-action";
// import { UploadDropzone } from "@/lib/uploadthing";

// interface UploadRoomImagesComponentProps {
//   roomId: string;
// }

// export const UploadRoomImagesComponent = ({
//   roomId,
// }: UploadRoomImagesComponentProps) => {
//   return (
//     <>
//       <div className="rounded-xl outline-dashed outline-muted h-1/2 w-[350px] mt-8">
//         <UploadDropzone
//           endpoint="projectThumbnailUploader"
//           appearance={{
//             container: { height: 200 },
//             uploadIcon: { scale: 0.8 },
//             button: {
//               padding: "20px 20px",
//               background: "#571c9e",
//               margin: "20px 20px",
//             },
//           }}
//           onClientUploadComplete={(res) => {
//             updateRoom(roomId, [res?.[0]?.url], null, null);
//           }}
//         />
//       </div>
//     </>
//   );
// };
