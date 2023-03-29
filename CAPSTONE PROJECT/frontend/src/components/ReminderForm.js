import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

const ReminderForm = ({addReminder}) => {

    const [value, setValue] = useState(' ');

    const handleSubmit = e => {
        e.preventDefault();

      //add reminder
       addReminder(value)
       localStorage.setItem("reminder", JSON.stringify(value)) 

       //clear form after submission
       setValue(" ")
    }

  return (
    <form className='reminderForm' onSubmit={handleSubmit}>
        <input type="text" className='reminder-input' value={value}
        placeholder="Reminder" onChange={(e) => setValue(e.target.value)} />
        <Button type="submit" className="reminder-btn ms-2">Add Reminder
        </Button>
    </form>
  )
}

export default ReminderForm