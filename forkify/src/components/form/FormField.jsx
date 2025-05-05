export default function FormField({ label, name, placeholder, props }) {
  return (
    <label>
      {label}
      <input
        type="text"
        name={name}
        placeholder={placeholder || label}
        required
        {...props}
      />
    </label>
  );
}
