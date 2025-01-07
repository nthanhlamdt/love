export default function Button({ colorText, colorBg, title, onClick, disabled, className }) {
  return (
    <button
      className={`px-4 py-2 ${colorBg} ${colorText} ${className} rounded-lg ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } hover:${colorBg.replace('bg-', 'bg-')}-700 hover:${colorText.replace('text-', 'text-')}-100 transition-colors duration-200`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  )
}