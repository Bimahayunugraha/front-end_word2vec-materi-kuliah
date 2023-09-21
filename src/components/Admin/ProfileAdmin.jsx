import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../stores/features/usersSlice";
import SkeletonLoadingProfile from "../SkeletonLoadingProfile";

const ProfileAdmin = () => {
  const user = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);
  const { name, username, email, phone, profile_images } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserById());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-6 py-6">
      {status === "succeeded" ? (
        <div className="mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white bg-opacity-90 px-4 shadow-4">
          <div className="flex flex-col items-center pb-10 pt-10">
            <div className="relative mb-1">
              <img
                className="h-32 w-32 rounded-full object-cover object-center shadow-lg"
                src={profile_images?.image_url}
                alt={profile_images?.image_name}
              />
            </div>
            <h5 className="mb-1 text-xl font-semibold text-gray-900">{name}</h5>
            <span className="text-sm text-gray-500">{username}</span>
            <div className="mt-4 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-1">
              <div className="mx-4 text-center">
                <span className="font-semibold text-gray-400">Email</span>
                <p className="font-medium text-gray-900">{email}</p>
              </div>
              <div className="mx-4 text-center">
                <span className="font-semibold text-gray-400">Nomor Telepon</span>
                <p className="font-medium text-gray-900">{phone}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoadingProfile />
      )}
    </div>
  );
};

export default ProfileAdmin;
