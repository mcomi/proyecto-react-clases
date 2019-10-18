import React from 'react'
import {Badge} from 'antd'
import Widget from '../../Widget/index'

const Cartera = ({volumenCartera}) => {
  console.log(volumenCartera)
  return (
    <Widget styleName='gx-card-profile-sm' title={<span>Cartera </span>}>
      <div className='gx-pt-2'>
        <ul className='unstyled'>
          {volumenCartera.map((cartera, index) => (
            <li className='gx-mb-2' key={index}>
              <h6>{cartera.product_name}</h6>
              <span>{cartera.Saldo}</span>
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  )
}
export default Cartera
