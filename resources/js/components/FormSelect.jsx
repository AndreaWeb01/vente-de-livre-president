export default function FormSelect({
  name,
  label,
  register,
  options = [],
  placeholder = "Sélectionnez une option",
  error,
}) {
  const id = `select-${name}`;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-semibold mb-2">
        {label}
      </label>

      <select
        id={id}
        {...register(name)}
        defaultValue=""
        className={`w-full border rounded-md p-4 text-sm outline-none focus:ring-0 focus:ring-green-200
          ${error ? "border-red-500" : "border-gray-300"}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={`${id}-error`} className="text-red-600 text-xs mt-1">
          {error.message || error}
        </p>
      )}
    </div>
  );
}
