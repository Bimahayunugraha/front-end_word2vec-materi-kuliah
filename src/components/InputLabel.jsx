export default function InputLabel({ value, className = "", children, ...props }) {
  return (
    <label
      {...props}
      className={
        `absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 ` +
        className
      }>
      {value ? value : children}
    </label>
  );
}
