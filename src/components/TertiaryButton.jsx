export default function TertiaryButton({ className = "", disabled, children, ...props }) {
  return (
    <button
      {...props}
      className={
        `inline-block items-center justify-center rounded-10 border border-transparent bg-secondary-yellow text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-yellow-300 focus:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 active:bg-secondary-yellow ${
          disabled && "opacity-25"
        } ` + className
      }
      disabled={disabled}>
      {children}
    </button>
  );
}
