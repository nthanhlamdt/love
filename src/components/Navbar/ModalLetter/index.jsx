import Letter from './Letter'

function ModalLetter() {
  return (
    <dialog id="modal_letter" className='modal'>
      <div className='modal-box p-0'>
        <Letter />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default ModalLetter