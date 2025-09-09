

export default function ForimTextArea({ label, name, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        className="form-textarea"
      />
    </div>
  )
}

