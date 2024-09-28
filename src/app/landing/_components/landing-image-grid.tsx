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
    <>
      <div className="z-0 absolute mt-36 bg-gradient-to-b from-transparent via-neutral-700 to-transparent w-full h-[300px] md:h-[500px] opacity-50"></div>
      <div className="z-0 absolute mx-4 md:mx-16 mt-36 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-24 gap-y-8 overflow-hidden ">
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`bg-gradient-to-b from-neutral-500 to-neutral-950 opacity-50  hover:opacity-100 transition-all duration-300
         ${index === 1 ? "hidden lg:block" : ""}
         ${index === 2 ? "hidden xl:block" : ""}
         ${index === 3 ? "hidden 2xl:block" : ""}
       `}
          >
            <CardContent className="flex aspect-auto p-0 rounded-xl">
              <div className="relative h-[300px] w-[300px] md:h-[500px] md:w-[500px] lg:h-[500px] lg:w-[600px] rounded-xl mix-blend-overlay">
                <Image
                  className="rounded-xl"
                  src={card.imageUrl}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
