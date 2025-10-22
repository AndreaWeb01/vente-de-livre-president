export default function FormTextarea({name, register, placeholder = "", error }) {
  const id = `textarea-${name}`;
  return (
    <div className="mb-4">
      {/* <label htmlFor={id} className="block text-sm font-semibold mb-2">
        {label}
      </label> */}

      <textarea
        id={id}
        {...register(name)}
        placeholder={placeholder}
        rows={6}
        className={`w-full border rounded-md p-4 text-sm resize-none outline-none focus:ring-2 focus:ring-green-200
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
