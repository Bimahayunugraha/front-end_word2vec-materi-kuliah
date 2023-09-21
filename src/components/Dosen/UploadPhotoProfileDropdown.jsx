import { useState, createContext, useContext, Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";

const DropDownContext = createContext();

const UploadPhotoProfileDropdown = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = "hidden";
    }
    function enableScroll() {
      document.body.style.overflow = "auto";
    }

    if (open) {
      disableScroll();
    } else {
      enableScroll();
    }
    return () => {
      enableScroll();
    };
  }, [open]);

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
    </>
  );
};

const Content = ({ align = "right", width = "40", contentClasses = "py-1 bg-white", children }) => {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0";
  }

  let widthClasses = "";

  if (width === "40") {
    widthClasses = "w-40";
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <div
          className={`absolute z-50 mt-1 rounded-lg shadow-4 ${alignmentClasses} ${widthClasses}`}
          onClick={() => setOpen(false)}>
          <div className={`rounded-lg ring-1 ring-black ring-opacity-5 ` + contentClasses}>
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};

const Input = ({ className = "", children, ...props }) => {
  return (
    <div
      {...props}
      className={
        "relative flex w-full cursor-pointer items-center justify-center px-4 py-4 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none " +
        className
      }>
      {children}
    </div>
  );
};

UploadPhotoProfileDropdown.Trigger = Trigger;
UploadPhotoProfileDropdown.Content = Content;
UploadPhotoProfileDropdown.Input = Input;

export default UploadPhotoProfileDropdown;
