import React, {useEffect, useState} from 'react'
import {Card, Divider, Icon, Table} from 'antd'
import {Link} from 'react-router-dom'

import {getAdvisors} from '../../api/advisors'

import IntlMessages from 'util/IntlMessages'

const SamplePage = () => {
  const [advisors, setAdvisors] = useState([])

  const loadAdvisors = async () => {
    try {
      const listAdvisors = await getAdvisors()
      setAdvisors(listAdvisors)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadAdvisors()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: text => (
        <Link to={`/advisor/${text}`} className='gx-link'>
          {text}
        </Link>
      ),
    },
    {
      title: 'Firstname',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Lastname',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ]

  return (
    <Card title='Advisors'>
      <Table
        className='gx-table-responsive'
        columns={columns}
        dataSource={advisors}
      />
    </Card>
  )
}

export default SamplePage
