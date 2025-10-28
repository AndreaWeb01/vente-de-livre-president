export default function FormInput({  name, register, type = "text", placeholder = "", error, label }) {
  const id = `input-${name}`;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="block text-sm font-semibold mb-1">
        {label}
      </label>

      <input
        id={id}
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`w-full border rounded-[5px] p-2 text-sm outline-none focus:ring-0 focus:ring-green-200
          ${error ? "border-red-500" : "border-gray-300"}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error && (
        <p id={`${id}-error`} className="text-red-600 text-xs mt-1">
          {error.message || error}
        </p>
      )}
    </div>
  );
}
