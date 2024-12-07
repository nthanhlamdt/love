import { CalendarRange, ClipboardType, Heart } from 'lucide-react'
import Emoji from '../../../../../components/Emoji'
import { useState } from 'react'

export default function InforFormModal({ data, setData }) {
  const [typeCelebrate, setTypeCelebrate] = useState('🌟 kỷ niệm đặc biệt')
  const [iconSelect, setIconSelect] = useState(false)
  const [iconTypeCelebrate, setIconTypeCelebrate] = useState('')

  return (
    <div>
      <div className="flex flex-col mt-5">
        <label className="flex text-pink-600 mb-1">
          <Heart className="mr-1" />Tiêu đề kỷ niệm*
        </label>

        <input
          type="text"
          value={data.name}
          placeholder="Tiêu đề kỉ niệm"
          onChange={e => setData({ ...data, name:e.target.value })}
          className="border border-pink-400 rounded-lg p-2 outline-pink-800 text-pink-600 font-semibold"
        />
      </div>

      <div className="flex flex-col mt-5">
        <label className="flex text-pink-600 mb-1">
          <CalendarRange className="mr-1" /> Mô tả*
        </label>
        <textarea
          rows={2}
          value={data.description}
          placeholder="Mô tả"
          onChange={e => setData({ ...data, description: e.target.value })}
          className="border border-pink-500 rounded-lg p-2 outline-pink-800 text-pink-600 font-semibold"
        />
      </div>

      <div className="flex flex-col mt-5">
        <label className="flex text-pink-600 mb-1">
          <ClipboardType className="mr-1" />
          Loại kỉ niệm*
        </label>
        <select
          className="border border-pink-500 rounded-lg p-2 outline-pink-800 text-pink-600 font-semibold"
          value={typeCelebrate}
          onChange={e => {
            setData({ ...data, type: e.target.value })
            setTypeCelebrate(e.target.value)
          }}
        >
          <option value={'🌟 kỷ niệm đặc biệt'}>🌟Ngày kỷ niệm đặc biệt</option>
          <option value={'💕 Ngày hẹn hò'}>💕Ngày hẹn hò</option>
          <option value={'🗓️ Ngày lễ hằng năm'}>🗓️Ngày lễ hằng năm</option>
          <option value={''}>❓Khác</option>
        </select>
      </div>

      {typeCelebrate ===
        '' && (
        <div className="relative">
          {iconSelect && (
            <Emoji setIconTypeCelebrate={setIconTypeCelebrate} setData={setData} data={data} iconTypeCelebrate={iconTypeCelebrate} />
          )}

          <div className="relative flex mt-5 items-center justify-between">
            <p className="text-pink-600 font-semibold mr-1">Loại kỉ niệm: </p>
            <div className="relative ml-2 flex-1 flex items-center justify-between border border-pink-400 rounded-lg py-1 focus:border-pink-600 focus:border-2">
              <input
                type="text"
                value={iconTypeCelebrate + data.type.replace(new RegExp(iconTypeCelebrate, 'g'), '')}
                placeholder="Tên loại kỉ niệm"
                onChange={e => {
                  const textOnly = iconTypeCelebrate + e.target.value.replace(new RegExp(iconTypeCelebrate, 'g'), '')
                  setData({ ...data, type: textOnly })
                }}
                className="py-1 px-2 outline-none text-pink-600 font-semibold"
              />

              <span
                className="cursor-pointer mr-1 hover:bg-pink-100"
                onClick={() => setIconSelect(!iconSelect)}
              >
                😀
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
