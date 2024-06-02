import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateRoom = () => {
  return (
    <>
      <div className="flex w-full max-w-2xl items-center space-x-2">
        <Input type="text" placeholder="Room Name" name="Room Name" />
        <Button variant={"secondary"} type="submit">
          Create Room
        </Button>
      </div>
    </>
  );
};

export default CreateRoom;
