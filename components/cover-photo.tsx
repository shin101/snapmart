"use client";

import { User } from "@prisma/client";
import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { getUploadURL } from "@/app/(tabs)/products/add/actions";
import { uploadCoverPhoto } from "@/app/(tabs)/profile/actions";

interface BackgroundProps {
  user: User;
}

const CoverPhoto = ({ user }: BackgroundProps) => {
  const [preview, setPreview] = useState(
    user?.cover_photo ||
      "https://imagedelivery.net/3g1eFcBpThtQ1-GLTJihVg/45daf333-7d5c-4230-5d3b-f5f38a617300/public"
  );
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

      const photoURL = `https://imagedelivery.net/3g1eFcBpThtQ1-GLTJihVg/${id}/public`;
      return uploadCoverPhoto(user, photoURL);
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: `url(${preview})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "288px",
          display: "inline-block",
        }}
      >
        <label htmlFor="cover-photo">
          <div className="absolute right-8 transform translate-y-52 opacity-70 bg-gray-100 hover:bg-opacity-50 rounded-full p-2 border  border-gray-500 hover:border-gray-400 cursor-pointer">
            <PencilIcon className="size-7" />
            <input
              onChange={onImageChange}
              type="file"
              id="cover-photo"
              name="photo"
              accept="image/*"
              className="hidden"
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default CoverPhoto;
