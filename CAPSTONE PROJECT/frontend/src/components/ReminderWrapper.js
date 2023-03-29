import React, {useState} from 'react'
import Reminders from './Reminders'
import {v4 as uuidv4} from 'uuid'
import ReminderForm from './ReminderForm'
import EditReminder from './EditReminder'
import { Container } from 'react-bootstrap'

uuidv4()

const ReminderWrapper = () => {

    const [reminders, setReminders] = useState([])

    const addReminder = reminder => {
        setReminders([...reminders, {id: uuidv4(), task: reminder,
        completed: false, isEditing: false}])
        console.log(reminders)
    }


    const toggleComplete = id => {
        setReminders(reminders.map(reminder => reminder.id === id ? 
            {...reminder, completed: !reminder.completed} : reminder))
    }

    const deleteReminder = id => {
        setReminders(reminders.filter(reminder => reminder.id !==id))
    }

    const editReminder = id => {
        setReminders(reminders.map(reminder => reminder.id === id  ? 
            {...reminder, isEditing: !reminder.isEditing} : reminder))
    }

    const editTask = (task, id) => {
        setReminders(reminders.map(reminder => reminder.id === id ? 
            {...reminder, task, isEditing: !reminder.isEditing} : reminder))
    }

  return (
    <Container className='reminderWrapper flex'>
    <h1>Things to do</h1>

        <ReminderForm addReminder={addReminder}/>
        {reminders.map((reminder, index) => (
            reminder.isEditing ? (
                <EditReminder editReminder={editTask} task={reminder}/>
            ) : (
            <Reminders task={reminder}  key={index}
            toggleComplete={toggleComplete} deleteReminder={deleteReminder} editReminder={editReminder}/>
            )

        ))}
        


    </Container>
  )
}

export default ReminderWrapper