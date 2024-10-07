import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FormLabel } from "@/components/ui/form";
import { Room } from "@/types/interfaces";
import { UploadImageForGenerationComponent } from "../../[projectId]/[roomId]/_components/upload-image-for-generation";

const ImageUploadAccordion = ({ room }: { room: Room }) => {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <FormLabel>Upload Image</FormLabel>
          </AccordionTrigger>
          <AccordionContent className="m-2">
            <UploadImageForGenerationComponent room={room} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };
  