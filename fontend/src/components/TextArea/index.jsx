export default function TextArea({ type, title, value, onChange }) {
  return (
    <>
      <textarea
        type={type}
        placeholder={title}
        value={value}
        required
        onChange={onChange}
        className='textarea textarea-bordered w-full text-pink-500'
      />
    </>
  )
}