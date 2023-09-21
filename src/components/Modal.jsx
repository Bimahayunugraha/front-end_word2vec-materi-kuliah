import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  children,
  show = false,
  maxWidth = "2xl",
  closeable = true,
  onClose = () => {},
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  }[maxWidth];

  return (
    <Transition show={show} as={Fragment} leave="duration-200">
      <Dialog as="div" id="modal" className="relative z-50" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-600/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex transform items-center justify-center overflow-y-auto overflow-x-hidden outline-none">
          <div className="pointer-events-none relative mx-auto flex h-[calc(100%-1rem)] w-full items-center justify-center p-4 min-[576px]:h-[calc(100%-3.5rem)]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel
                className={`pointer-events-auto relative flex max-h-full w-full transform flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
