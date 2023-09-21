// Sidebar
export const sidebarActive =
  "mb-1 flex items-center rounded-lg bg-primary-violet bg-opacity-10 p-2 text-sm font-normal text-primary-violet transition-all duration-300 ease-in-out hover:bg-indigo-200";

export const sidebarInActive =
  "mb-1 flex items-center rounded-lg p-2 text-sm font-normal text-neutral-80 transition-all duration-300 ease-in-out hover:bg-indigo-100";

// Navbar
export const navbarActive =
  "block rounded py-2 pl-3 pr-4 font-semibold text-primary-violet hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-violet transition-all duration-150 ease-in-out";

export const navbarInActive =
  "block rounded py-2 pl-3 pr-4 font-normal text-neutral-80 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-violet transition-all duration-150 ease-in-out";

// Tabs
export const activeTab =
  "inline-block rounded-full border border-primary-violet bg-tertiary-background-1 px-3 py-1 text-xs text-tertiary-3";

export const notActiveTab =
  "inline-block rounded-full border border-primary-violet px-3 py-1 text-xs text-tertiary-3 hover:bg-neutral-background";

export const activeLinkTab =
  "inline-block rounded-t-xl bg-secondary-soft-red p-4 font-medium text-white hover:bg-red-600 transition-all duration-300 ease-in-out";

export const inActiveLinkTab =
  "inline-block rounded-t-xl p-4 font-normal text-neutral-5 hover:bg-red-500 hover:text-neutral-5 transition-all duration-300 ease-in-out";

// button
export const addButton =
  "inline-flex items-center rounded-lg bg-secondary-navy px-3 py-1.5 text-center text-[10px] font-normal text-white focus:outline-none focus:ring-4 focus:ring-blue-300 md:px-3 md:py-1";
export const uploadButton =
  "bg-secondary-soft-red px-5 py-4 text-center text-sm font-normal text-white hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 hover:shadow-4 transition-all duration-300 ease-in-out hover:scale-105";
export const convertButton =
  "bg-secondary-soft-red px-5 py-4 text-center text-sm font-normal text-white hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 hover:shadow-4 transition-all duration-300 ease-in-out cursor-wait";
export const downloadButton =
  "rounded-10 bg-secondary-navy md:px-3 md:py-2 px-2 py-1 text-center text-sm font-normal text-white hover:bg-blue-800";
export const backButton =
  "rounded-10 bg-neutral-5 px-5 py-2.5 text-center text-xs md:text-sm font-normal text-neutral-80 hover:bg-neutral-20";

export const confirmDeleteButton =
  "focus:outline-none text-white bg-secondary-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5";

export const cancelDeleteButton =
  "text-secondary-red hover:text-secondary-red border border-secondary-red hover:bg-red-200 focus:ring-1 focus:outline-none focus:ring-secondary-red font-medium rounded-lg text-sm px-5 py-2.5 text-center";

export const cancelButton =
  "rounded-10 border border-secondary-navy bg-white px-5 py-2.5 text-xs md:text-sm font-normal text-primary-violet hover:bg-gray-100 hover:text-violet-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 text-center";

export const saveButton =
  "rounded-10 bg-secondary-navy px-5 py-2.5 text-center text-xs md:text-sm font-normal text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300";

export const disabledButton =
  "rounded-10 bg-neutral-20 px-5 py-2.5 text-center text-xs md:text-sm font-normal text-neutral-60 cursor-not-allowed";

export const actionEditButton =
  "rounded-lg bg-yellow-200 hover:bg-secondary-yellow px-2 py-1 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-yellow-300";

export const actionDeleteButton =
  "rounded-lg bg-secondary-soft-red px-2 py-1 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-red-300 hover:bg-secondary-red";

// Label, Input. and Select
export const labelError = "block text-sm text-secondary-red font-medium mb-2";

export const labelNotError = "block text-sm text-neutral-60 font-medium mb-2";

export const inputError =
  "block w-full appearance-none rounded-lg border border-secondary-red bg-transparent p-2.5 text-sm text-secondary-red focus:border-secondary-red focus:outline-none focus:ring-0 placeholder-neutral-40";

export const inputNotError =
  "block w-full appearance-none rounded-lg border border-neutral-20 bg-transparent p-2.5 text-sm text-neutral-60 focus:border-primary-violet focus:outline-none focus:ring-0 placeholder-neutral-40";

export const disabledInput =
  "block w-full appearance-none rounded-lg border border-neutral-20 bg-neutral-20 p-2.5 text-sm text-neutral-60";

export const labelConvertForm = "block text-sm text-neutral-20 font-medium mb-2";
export const inputConvertForm =
  "block w-full appearance-none rounded-lg border border-neutral-40 bg-transparent p-2.5 text-sm text-neutral-20 focus:border-white focus:outline-none focus:ring-0 placeholder-neutral-40";

export const searchInputForLgScreen =
  "block w-full rounded-lg border border-primary-violet bg-white p-2 pr-8 text-sm text-neutral-100-2 placeholder-neutral-80 placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500";

export const searchInputForSmScreen =
  "block w-full rounded-lg border border-primary-violet bg-white p-2 pr-8 text-sm text-neutral-100-2 placeholder:text-[10px] placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500";

export const select =
  "block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0";

// Regex Validation
export const regexNameValidation = /^[a-zA-Z\s]*$/;

export const regexEmailValidation =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regexPasswordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// export const regexUsernameValidation = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export const regexUsernameValidation = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

export const imageMimeType = /image\/(png|jpg|jpeg)/i;

// pagination button
export const previousButtonDisabled =
  "ml-0 block cursor-not-allowed rounded-l-lg bg-white py-2 px-3 font-normal leading-tight text-neutral-80 hover:bg-neutral-5 hover:text-gray-700";

export const previousButtonActive =
  "ml-0 block rounded-l-lg bg-white py-2 px-3 font-normal leading-tight text-secondary-navy hover:bg-blue-100 hover:text-indigo-800";

export const nextButtonDisabled =
  "block cursor-not-allowed rounded-r-lg bg-white py-2 px-3 font-normal leading-tight text-neutral-80 hover:bg-neutral-5 hover:text-gray-700";

export const nextButtonActive =
  "block rounded-r-lg bg-white py-2 px-3 font-normal leading-tight text-primary-violet hover:bg-blue-100 hover:text-indigo-800";
