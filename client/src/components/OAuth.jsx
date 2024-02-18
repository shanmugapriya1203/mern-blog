import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
const OAuth = () => {
  return (
    <div>
      <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
<AiFillGoogleCircle className='w-6 h-6 mr-2'/>
  

Continue with google
      </Button>
    </div>
  )
}

export default OAuth



