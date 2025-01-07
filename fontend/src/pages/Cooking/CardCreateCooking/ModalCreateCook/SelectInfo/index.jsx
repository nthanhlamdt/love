import { Clock, ConciergeBell } from 'lucide-react'
import Input from '~/components/Input'
import Label from '~/components/Label'
import TextArea from '~/components/TextArea'

export default function SelectInfo({ newRecipe, setNewRecipe }) {
  const fields = [
    { title: 'Tên món ăn*', name: 'name', type: 'text' },
    { title: 'Tiêu đề*', name: 'title', type: 'text' },
    { title: 'Mô tả*', name: 'description', type: 'textarea' }
  ]

  return (
    <div>
      {fields.map(field => (
        <div key={field.name} className={field.name === 'time' || field.name === 'peopleEating' ? 'flex items-center gap-2' : ''}>
          <div className={field.name === 'time' || field.name === 'peopleEating' ? 'w-full' : ''}>
            <Label title={field.title} />
            {field.type === 'textarea' ? (
              <TextArea
                value={newRecipe[field.name]}
                title={field.title}
                onChange={e => setNewRecipe({ ...newRecipe, [field.name]: e.target.value })}
              />
            ) : (
              <Input
                type={field.type}
                value={newRecipe[field.name]}
                title={field.title}
                onChange={e => setNewRecipe({ ...newRecipe, [field.name]: e.target.value })}
              />
            )}
          </div>
        </div>
      ))}

      <div className='flex items-center gap-2'>
        <div>
          <Label title={<div className='flex items-center gap-1'><Clock /> Thời gian(phút)*</div>}/>
          <Input
            type={'number'}
            value={newRecipe['time']}
            title={<div className='flex items-center gap-1'><Clock /> Thời gian(phút)*</div>}
            onChange={e => setNewRecipe({ ...newRecipe, time: e.target.value })}
          />
        </div>

        <div>
          <Label title={<div className='flex items-center gap-1'><ConciergeBell /> Số lượng người*</div>}/>
          <Input
            type={'number'}
            value={newRecipe['peopleEating']}
            title={<div className='flex items-center gap-1'><ConciergeBell /> Số lượng người*</div>}
            onChange={e => setNewRecipe({ ...newRecipe, peopleEating: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
