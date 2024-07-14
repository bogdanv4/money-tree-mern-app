export default function Button({ children, className, onClick, step }) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={step === 1 ? true : false}
    >
      {children}
    </button>
  );
}
