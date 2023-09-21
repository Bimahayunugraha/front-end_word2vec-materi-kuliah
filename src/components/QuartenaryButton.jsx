export default function QuartenaryButton({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={
        `inline-block items-center justify-center rounded-10 border border-transparent text-center text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out md:text-sm ` +
        className
      }>
      {children}
    </button>
  );
}
