import React from 'react'

const NewRecordButton = () => {
  return (
    <div>NewRecordButton

<Button variant= "info" className='' 
                    href= {`/petrecord/${pet.name}`} //{`/petrecords/${pet.name}/records`}
                    > Records</Button> {' '}
    </div>
  )
}

export default NewRecordButton