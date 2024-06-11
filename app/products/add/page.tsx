"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import uploadProduct from "./actions";
import { useFormState } from "react-dom";

const AddProduct = () => {
  const [preview, setPreview] = useState("");
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);

    if (file.size > 1024 * 1024 * 4) {
      return { error: "Please upload an image smaller than 4MB" };
    }
  };
  const [state, action] = useFormState(uploadProduct, null);
  return (
    <div>
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
