"use client";

import { getUploadURL } from "@/app/(tabs)/products/add/actions";
import { PhotoIcon } from "@heroicons/react/24/solid";

import { useContext, useState } from "react";
import { updatePhoto } from "./actions";
import BackButton from "@/components/back-button";
import Input from "@/components/input";
import Button from "@/components/button";
import { UserContext } from "@/context/UserContext";

const EditProfile = () => {
  const user = useContext(UserContext);


  const [preview, setPreview] = useState(user?.avatar || "");
  const [uploadURL, setUploadURL] = useState("");
  const [photoId, setPhotoId] = useState("");
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    const { success, result } = await getUploadURL();
    if (success) {
      const { id, uploadURL } = result;
      setUploadURL(uploadURL);
      setPhotoId(id);

      const cloudflareForm = new FormData();
      cloudflareForm.append("file", file);
      const response = await fetch(uploadURL, {
        method: "POST",
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        console.log("still error");
        return;
      }

      const photoURL = `https://imagedelivery.net/3g1eFcBpThtQ1-GLTJihVg/${id}/avatar`;

      return updatePhoto(photoURL);
    }

    if (file.size > 1024 * 1024 * 4) {
      return { error: "Please upload an image smaller than 4MB" };
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <BackButton />

      <div className="relative">
        <form className="p-5 flex flex-col gap-5">

          <Input name="username" required placeholder="Username" type="text" />
          <Input name="password" required placeholder="Password" type="text" />
          <Input
            name="password"
            required
            placeholder="Confirm Password"
            type="text"
          />
          <Button text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
