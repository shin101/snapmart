"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadURL, uploadProduct } from "./actions";
import { useFormState } from "react-dom";

const AddProduct = () => {
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
    }

    if (file.size > 1024 * 1024 * 4) {
      return { error: "Please upload an image smaller than 4MB" };
    }
  };
  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get("photo");
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadURL, {
      method: "POST",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      return;
    }
    const photoURL = `https://imagedelivery.net/3g1eFcBpThtQ1-GLTJihVg/${photoId}`;
    formData.set("photo", photoURL);
    return uploadProduct(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);
  return (
    <div className="max-w-screen-sm mx-auto">
      <form action={action} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview == "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                Add photo
                {state?.fieldErrors.photo}
              </div>
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
        <Input
          name="title"
          required
          placeholder="Title"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          type="number"
          required
          placeholder="Price"
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          type="text"
          required
          placeholder="Description"
          errors={state?.fieldErrors.description}
        />
        <Button text="Submit" />
      </form>
    </div>
  );
};

export default AddProduct;
