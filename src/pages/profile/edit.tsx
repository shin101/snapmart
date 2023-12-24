import React from "react";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Layout from "../../../components/layout";

const EditProfile = () => {
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-4">
        <div className="pt-8 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-slate-500" />
            <label
              htmlFor="picture"
              className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-gray-700"
            >
              Change Photo
              <input
                id="picture"
                type="file"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
          <div className="space-y-1">
            <Input label="Email Address" name="email" kind="text" required />
            <Input label="Phone Number" name="phone" kind="phone" required />
          </div>

          <div className="flex items-center justify-between space-x-2 pt-8">
            <Button text="Update Profile" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
