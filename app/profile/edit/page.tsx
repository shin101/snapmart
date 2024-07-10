"use client";

import { getUploadURL } from "@/app/products/add/actions";
import { PhotoIcon } from "@heroicons/react/24/solid";

import { useState } from "react";
import { updatePhoto } from "./actions";
import BackButton from "@/components/back-button";

const EditProfile = () => {
  const [preview, setPreview] = useState("");
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
          <label
            htmlFor="photo"
            className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
            style={{ backgroundImage: `url(${preview})` }}
          >
            {preview == "" ? (
              <>
                <PhotoIcon className="w-20" />
                <div className="text-neutral-400 text-sm">Add photo</div>
              </>
            ) : null}
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="hidden"
          />
        </form>{" "}
      </div>
    </div>
  );
};

export default EditProfile;
