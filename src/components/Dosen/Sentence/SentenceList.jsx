import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import SentenceAPI from "../../../apis/sentence.api";
import Tabs from "../Tabs";
import SentenceListItem from "./SentenceListItem";

const INITIAL_LIST_SENTENCE = {
  data: [],
  status: false,
};

const SentenceList = () => {
  const [listSentence, setListSentence] = useState(INITIAL_LIST_SENTENCE);
  const loading = useSelector((state) => state.sentence.loading);

  useEffect(() => {
    SentenceAPI.getFilesListSentences().then((result) =>
      setListSentence({ data: result.data.payload.rows, status: true })
    );
  }, [loading]);

  return (
    <div className="mx-auto md:container">
      <div className="text-center">
        <h1 className="mb-1 text-xl font-bold tracking-wide text-primary-soft-violet md:text-2xl">
          Daftar File yang Dikonversi
        </h1>
        <p className="text-sm font-normal text-neutral-60 md:text-base">
          File yang telah dikonversi akan disimpan selama 24 jam
        </p>
      </div>
      <div className="pt-6 pb-6">
        <div className="flex items-center">
          <div className="min-w-0 flex-1">
            <Tabs />
          </div>
        </div>
        <div className="bg-secondary-soft-white py-4"></div>
        <div className="h-[50vh] max-h-screen w-full overflow-y-auto bg-white shadow-6 md:rounded-b-xl">
          <div className="max-h-full">
            {listSentence.status ? (
              <div>
                {listSentence.data?.length > 0 ? (
                  <div>
                    {listSentence.data?.map((item) => {
                      return <SentenceListItem key={item.id} data={item} />;
                    })}
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center py-6 text-xs font-semibold leading-7 text-neutral-80">
                    <i className="fi fi-rr-info mr-3 text-sm"></i>
                    Data corpus not found
                  </div>
                )}
              </div>
            ) : (
              <div className="my-0 mx-auto flex items-center justify-center py-4 px-6">
                <PulseLoader size={10} color="#6FCBFD" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceList;
