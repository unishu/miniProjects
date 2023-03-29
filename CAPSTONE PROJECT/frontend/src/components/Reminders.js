import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Reminders = ({task, toggleComplete, deleteReminder, editReminder}) => {
  return (
    <div className='reminders'>
        <p onClick={() =>toggleComplete(task.id)} 
        className={`${task.completed ? 'completed': ""}`}> 
        {task.task}</p>
        
        <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editReminder(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteReminder(task.id)} />
        </div>
    
    
    </div>
  )
}

export default Reminders