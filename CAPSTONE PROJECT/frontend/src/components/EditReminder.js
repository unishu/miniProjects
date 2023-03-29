import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

const EditReminder = ({editReminder, task}) => {

    const [value, setValue] = useState(task.task);

    const handleSubmit = e => {
        e.preventDefault();


       editReminder(value, task.id)

       setValue(" ")
    }

  return (
    <form className='reminderForm' onSubmit={handleSubmit}>
        <input type="text" className='reminder-input' value={value}
        placeholder="Update Reminder" onChange={(e) => setValue(e.target.value)} />
        <Button type="submit" className="reminder-btn">Update Reminder
        </Button>
    </form>
  )
}

export default EditReminder