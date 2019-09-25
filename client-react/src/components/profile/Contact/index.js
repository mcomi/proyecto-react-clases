import React from 'react'
import Widget from 'components/Widget'
// import {contactList} from '../../../routes/Perfil/data'

const Contact = ({email, phone, code}) => {
  return (
    <Widget title='Contact' styleName='gx-card-profile-sm'>
      <div className='gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list'>
        <div className='gx-mr-3'>
          <i className={`icon icon-email gx-fs-xxl gx-text-grey`} />
        </div>
        <div className='gx-media-body'>
          <span className='gx-mb-0 gx-text-grey gx-fs-sm'>Email</span>
          <p className='gx-mb-0'>
            <span className='gx-link'>{email}</span>
          </p>
        </div>
      </div>
      <div className='gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list'>
        <div className='gx-mr-3'>
          <i className={`icon icon-phone gx-fs-xxl gx-text-grey`} />
        </div>
        <div className='gx-media-body'>
          <span className='gx-mb-0 gx-text-grey gx-fs-sm'>Phone</span>
          <p className='gx-mb-0'>
            <span className='gx-link'>{`${code} ${phone}`}</span>
          </p>
        </div>
      </div>
    </Widget>
  )
}

export default Contact
