"use client";

import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import default_avatar from "../public/default.jpg";
import { getUploadURL } from "@/app/(tabs)/products/add/actions";
import { updatePhoto } from "@/app/(tabs)/profile/edit/actions";

const ProfileAvatar = () => {
  const user = useContext(UserContext);
  const [preview, setPreview] = useState(user?.avatar || default_avatar);
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
        return;
      }
	  const photoURL = `https://imagedelivery.net/3g1eFcBpThtQ1-GLTJihVg/${id}/public`;
  
	  return updatePhoto(photoURL);
    }

  };
  if (!user) return null;
  return (
    <div className="absolute top-0 left-0 transform translate-x-1/4 -translate-y-1/2">
      <Image
        src={user.avatar!}
        alt={user.username}
        width={170}
        height={170}
        className="size-48 rounded-full object-cover"
      />

      <label htmlFor="profile-photo">
        <div className="absolute opacity-70 bg-gray-200 hover:bg-opacity-50 rounded-full p-2 border border-gray-700 cursor-pointer top-3/4 right-1">
          <PencilIcon className="size-5" />
          <input
            type="file"
            id="profile-photo"
            onChange={onImageChange}
            name="photo"
            accept="image/*"
            className="hidden"
          />
        </div>
      </label>
    </div>
  );
};

export default ProfileAvatar;
