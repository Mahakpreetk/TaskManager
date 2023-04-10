import { Label, Select, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Task, TaskPriority } from 'src/models/task'
import Datepicker from "tailwind-datepicker-react"

interface NewTaskModalBodyProps {
  newTask: Task,
  isEditMode: boolean | null,
  setTask: React.Dispatch<React.SetStateAction<Task>>
}

const NewTaskModalBody: React.FC<NewTaskModalBodyProps> = ({ newTask, setTask, isEditMode }) => {
  const [show, setShow] = useState<boolean>(false)
  const disabled = isEditMode == null ? false : !isEditMode;

  useEffect(() => {
    setShow(!disabled)
  }, [disabled])
  
  console.log('MODAL:: ', disabled, show);  
  const handleClose = (state: boolean) => {
    setShow(state)
  }

  return (
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="title"
          value="Enter Task Title"
        />
      </div>
      <TextInput
        id="title"
        type="text"
        name="title"
        placeholder="eg: Get the material ready"
        required={true}
        disabled={disabled}
        shadow={true}
        value={newTask.title}
        onChange={({ target }) => setTask({ ...newTask, title: target.value })}
      />
      <div className="mb-2 mt-6 block">
        <Label
          htmlFor="description"
          value="Enter Task Description"
        />
      </div>
      <Textarea
        id="description"
        name="description"
        placeholder="eg: more info about the task for better understanding"
        required={true}
        style={{ fontSize: '15px' }}
        shadow={true}
        disabled={disabled}
        value={newTask.description}
        onChange={({ target }) => setTask({ ...newTask, description: target.value })}
      />
      <div className="mb-2 mt-6 block">
        <Label
          htmlFor="description"
          value="Select Priority Level"
        />
      </div>
      <Select
        id="priority"
        disabled={disabled}
        onChange={({target}) => setTask({ ...newTask, priority: target.value.toLowerCase() as TaskPriority })}
        required={true}
      >
        <option>
          High
        </option>
        <option>
          Medium
        </option>
        <option>
          Low
        </option>
      </Select>
      <div className="mb-2 mt-6 block">
        <Label
          htmlFor="description"
          value="Select Due Date"
        />
      </div>
      <Datepicker
        options={{
          minDate: new Date(),
        }}
        onChange={(date) => setTask({ ...newTask, due_date: date })}
        show={show}
        setShow={handleClose}
      />
    </div>
  )
}

export default NewTaskModalBody
