export default function InputError({ message, className = "", ...props }) {
  return message ? (
    <h5 {...props} className={"text-xs text-red-600 " + className}>
      {message}
    </h5>
  ) : null;
}
