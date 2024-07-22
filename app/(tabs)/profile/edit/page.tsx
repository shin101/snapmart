"use client";

import { useContext, useState } from "react";
import BackButton from "@/components/back-button";
import Input from "@/components/input";
import Button from "@/components/button";
import { UserContext } from "@/context/UserContext";
import { UpdateProfile } from "./actions";
import { useFormState } from "react-dom";

const EditProfile = () => {
  const user = useContext(UserContext);
  const [state, dispatch] = useFormState(UpdateProfile, null);


  return (
    <div className="max-w-screen-sm mx-auto">
      <BackButton />
      <div className="relative">
        <form className="p-5 flex flex-col gap-5" action={dispatch}>
          <Input
            name="username"
            required
            placeholder="Username"
            type="text"
            errors={state?.fieldErrors.username}
          />
          <Input
            name="password"
            required
            errors={state?.fieldErrors.password}
            placeholder="Password"
            type="text"
          />
          <Input
            name="confirm_password"
            required
            errors={state?.fieldErrors.confirm_password}
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
