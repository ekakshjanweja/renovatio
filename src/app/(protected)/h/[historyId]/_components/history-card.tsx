"use client";

import { SolaceSelect } from "@/db/schema/solace";
import { useState } from "react";
import Image from "next/image";
import { UrlCopy } from "@/components/url-copy";
import { cn } from "@/lib/utils";

interface HistoryCardProps {
  item: SolaceSelect;
}

export const HistoryCard = ({ item }: HistoryCardProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(item.coverUrl);

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <div className="relative w-[95vw] md:w-[50vw] lg:w-[20vw] aspect-square">
              <Image
                alt={"selected-item"}
                src={selectedItem}
                fill
                className="rounded-xl object-cover w-full"
                quality={50}
                placeholder="blur"
                blurDataURL={selectedItem}
              />
            </div>

            <div className="mt-8 lg:mt-0 flex flex-col justify-start items-start relative w-[50vw] lg:w-[30vw] lg:pl-4 overflow-x-auto gap-y-4">
              <p className="text-xl mb-4">Generation Properties</p>

              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-sm">Prompt</p>
                <p className="p-4 bg-neutral-200 rounded-xl text-neutral-800 w-full text-lg font-medium">
                  {item.prompt}
                </p>
              </div>

              <div className="lex flex-col gap-y-2 w-full">
                <p className="text-sm">Image Url</p>
                <UrlCopy url={selectedItem ?? ""} />
              </div>
              <div className="flex w-full items-center justify-between gap-x-4">
                <p className="flex items-center justify-center flex-1 py-2 bg-neutral-800 rounded-lg hover:bg-custom transition-all duration-300">
                  {item.roomType}
                </p>
                <p className="flex items-center justify-center flex-1 py-2 bg-neutral-800 rounded-lg hover:bg-custom transition-all duration-300">
                  {item.style}
                </p>
              </div>
              <div className="flex w-full items-center gap-x-4">
                {item.isEnhanced && (
                  <p className="border-custom border-2 px-4 py-2 text-sm rounded-full bg-neutral-900 hover:bg-neutral-700 font-medium transition-all duration-300">
                    Enhanced
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 mx-auto w-full overflow-x-auto my-4 gap-4 lg:gap-0">
            {item.variations.map((variation, index) => (
              <div
                key={index}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedItem(variation.url)}
              >
                <div className="relative w-[45vw] md:w-[20vw] lg:w-[10vw] aspect-square">
                  <Image
                    alt={variation.iid}
                    src={variation.url}
                    fill
                    className={cn(
                      "rounded-md object-cover transition-all duration-300",
                      selectedItem === variation.url
                        ? "border-2 border-custom"
                        : "opacity-50"
                    )}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
