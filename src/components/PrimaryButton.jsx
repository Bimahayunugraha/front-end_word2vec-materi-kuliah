export default function PrimaryButton({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={
        `inline-block items-center justify-center rounded-10 border border-transparent bg-secondary-navy text-center text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-secondary-navy md:text-sm ` +
        className
      }>
      {children}
    </button>
  );
}
