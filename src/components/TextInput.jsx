import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
  { type = "text", className = "", isFocused = false, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={
        "peer block w-full appearance-none rounded-lg px-2.5 text-sm focus:outline-none focus:ring-0 " +
        className
      }
      ref={input}
    />
  );
});
