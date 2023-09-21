import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectInput(
  { className = "", children, isFocused = false, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <select
        {...props}
        className={
          "block w-full rounded-lg border border-neutral-60 p-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " +
          className
        }
        ref={input}>
        {children}
      </select>
    </div>
  );
});
