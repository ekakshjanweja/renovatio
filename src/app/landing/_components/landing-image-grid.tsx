import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function LandingImageGrid() {
  const cards = [
    {
      imageUrl:
        "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/056d8f7f-2719-4628-999d-4d9c71fd5616/Default_living_room_minimal_asthetic_grey_dark_center_table_so_0.jpg",
    },
    {
      imageUrl:
        "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/fbba498a-4085-4ec0-8cfb-1b401708df5f/Default_dark_themed_bedroom_luxurious_wood_accents_tv_minimal_0.jpg",
    },
    {
      imageUrl:
        "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/e2551212-4781-497a-a438-f413b1b432b6/Default_A_minimal_Grey_themed_villa_facade_asthetic_nature_min_0.jpg",
    },
    {
      imageUrl:
        "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/de4035df-99b7-4683-9b0b-cc9671f56014/Default_balcony_wooden_floooring_plants_on_front_wall_windows_0.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {cards.map((card, index) => (
          //   <Card key={index} className="w-full max-w-[300px] mx-auto">
          //     <CardContent className="p-0">
          //       <div className="relative w-full h-[400px]">
          //         <Image
          //           src={card.imageUrl}
          //           alt={""}
          //           fill
          //           style={{ objectFit: "cover" }}
          //           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          //         />
          //       </div>
          //     </CardContent>
          //   </Card>
          <Card key={index}>
            <CardContent
              //   className={
              //     "flex aspect-auto p-0  h-[300px] md:h-[500px] w-[100px] md:w-[300px]"
              //   }
              className="flex aspect-auto p-0 h-[300px] md:h-[500px] w-[100px] md:w-[300px] rounded-xl"
            >
              <div className="relative h-[300px] md:h-[500px] w-[100px] md:w-[300px] rounded-xl">
                <Image
                  className="rounded-xl"
                  src={card.imageUrl}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
