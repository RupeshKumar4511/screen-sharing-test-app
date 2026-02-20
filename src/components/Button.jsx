export default function Button({ children, onClick, disabled, variant = "primary" }) {
  const base = "px-6 py-3 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "secondary"
      ? "bg-gray-200 text-black hover:bg-gray-300"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}