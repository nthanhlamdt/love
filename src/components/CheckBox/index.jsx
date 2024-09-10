import { useState } from 'react'

// eslint-disable-next-line react/prop-types
function Checkbox({ setData, data }) {
  const [checkedGender, setCheckedGender] = useState('')

  return (
    <div className="flex left">
      <div className="form-control selected">
        <label className="label cursor-pointer selected pt-1">
          <span className="label-text mr-2">Nam</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={checkedGender === 'Nam'}
            onChange={() => {
              setCheckedGender('Nam')
              setData({ ...data, gender: 'Nam' })
            }}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer pt-1">
          <span className="label-text mr-2">Nữ</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={checkedGender === 'Nữ'}
            onChange={() => {
              setCheckedGender('Nữ')
              setData({ ...data, gender: 'Nữ' })
            }}
          />
        </label>
      </div>
    </div>
  )
}

export default Checkbox
