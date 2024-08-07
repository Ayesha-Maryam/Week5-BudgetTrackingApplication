import React from 'react'

export default function DatePicker({date, onDateChange}) {
  return (
    <div>
        <form>
        <input type="date" value={date} onChange={e=>onDateChange(e.target.value)}/>
        </form>
      
    </div>
  )
}
