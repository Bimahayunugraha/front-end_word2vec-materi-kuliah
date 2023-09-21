import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { truncate } from "../../utils/truncate";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByRoleDosen } from "../../stores/features/usersSlice";
import { PulseLoader } from "react-spinners";

const Overview = () => {
  const dispatch = useDispatch();
  const dosenData = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);

  useEffect(() => {
    dispatch(fetchUsersByRoleDosen(1000));
  }, [dispatch]);

  return (
    <div className="container mx-auto py-6 px-4">
      <div>
        <div className="flex flex-wrap px-2">
          <div className="w-full lg:w-1/2 xl:w-1/3">
            <div className="mb-6 h-auto rounded-xl bg-white p-4 shadow-4">
              <div className="flex items-center space-x-4">
                <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-violet bg-opacity-10 p-6">
                  <span className="mt-1 text-xl">
                    <i className="fa-solid fa-users text-primary-violet"></i>
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-medium text-neutral-80">Total Data Dosen</p>

                  {status === "succeeded" ? (
                    <p className="text-xl font-semibold text-secondary-navy">
                      {dosenData.meta?.totalRows}
                    </p>
                  ) : (
                    <PulseLoader size={5} color="#6FCBFD" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:px-2 lg:w-1/2 xl:w-1/3">
            <div className="mb-6 h-auto rounded-xl bg-white p-4 shadow-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-base font-medium text-neutral-80">Data Dosen Terbaru</p>
                    <Link
                      to="/manage-dosen"
                      className="inline-flex items-center justify-center text-sm font-normal text-primary-violet hover:border-b hover:border-primary-violet hover:text-blue-800">
                      Lihat semua
                      <i className="fa-solid fa-arrow-right ml-2"></i>
                    </Link>
                  </div>
                  {status === "succeeded" ? (
                    <div>
                      {dosenData.data?.length > 0 ? (
                        <ul className="max-w-md">
                          {dosenData.data?.slice(0, 5).map((dosen) => {
                            return (
                              <li className="pb-3" key={dosen.id}>
                                <div className="flex items-center space-x-4">
                                  <div className="inline-flex flex-shrink-0 items-center justify-center">
                                    <span className="text-sm font-semibold text-white">
                                      <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={dosen.profile_image.image_url}
                                        alt={dosen.profile_image.image_name}
                                      />
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-neutral-80">
                                      {truncate(dosen.name, 50)}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="flex flex-wrap items-center justify-center px-6 py-4 text-xs font-semibold leading-7 text-neutral-80">
                          <i className="fa-regular fa-circle-info mr-3 text-sm"></i>
                          Data dosen tidak ditemukan
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="my-0 mx-auto flex items-center justify-center">
                      <PulseLoader size={5} color="#6FCBFD" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-1/3">
            <div className="mb-6 h-auto rounded-xl bg-white p-4 shadow-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-center">
                    <Calendar prev2Label={false} next2Label={false} showFixedNumberOfWeeks={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
