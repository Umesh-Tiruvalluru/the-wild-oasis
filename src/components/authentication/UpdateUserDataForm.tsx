import { useState } from "react";
import { Label } from "../ui/label";
import useUser from "./useUser";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  const { user } = useUser();

  const email = user?.email ?? "No email available";
  const currentFullName = user?.user_metadata?.fullName ?? "";

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { mutate } = useUpdateUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (avatar) {
      mutate({ fullName, avatar });
    } else {
      mutate({ fullName });
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between max-w-[410px] gap-28">
        <Label className="shrink-0" htmlFor="email">
          Email Address
        </Label>
        <Input id="email" value={email} disabled />
      </div>
      <div className="flex items-center justify-between max-w-[410px] gap-28">
        <Label className="shrink-0" htmlFor="fullName">
          Full Name
        </Label>
        <Input
          id="fullName"
          value={fullName}
          type="text"
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="flex items-center max-w-[410px] gap-10">
        <Label className="shrink-0" htmlFor="avatar">
          Avatar
        </Label>
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files[0]) {
              setAvatar(files[0]);
            }
          }}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Update User</Button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
