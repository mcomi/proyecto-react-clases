import React from 'react'
import Auxiliary from 'util/Auxiliary'

const AboutItem = ({advisor}) => {
  const {first_name, last_name, email, username} = advisor
  return (
    <Auxiliary>
      <div className='gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2'>
        <div className='gx-mr-3'>
          <i className={`icon icon-star gx-fs-xlxl gx-text-orange`} />
        </div>
        <div className='gx-media-body'>
          <h6 className='gx-mb-1 gx-text-grey'>{`${first_name} ${last_name}`}</h6>
          {email}
        </div>
      </div>
    </Auxiliary>
  )
}

export default AboutItem
