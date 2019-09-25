import React from 'react'
import Widget from 'components/Widget'

const Biography = ({objetivos}) => {
  console.log(objetivos)
  return (
    <Widget styleName='gx-card-profile'>
      <div className='ant-card-head'>
        <span className='ant-card-head-title gx-mb-2'>Objetivos</span>
        <p className='gx-text-grey gx-fs-sm gx-mb-0'>Año: {objetivos.Anno}</p>
      </div>
      <h3 className='gx-font-weight-light'></h3>
      <p></p>
    </Widget>
  )
}

export default Biography
