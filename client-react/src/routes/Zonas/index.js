import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Card, Table} from 'antd'
import {getZonas} from '../../api/zones'

const Zonas = () => {
  // state
  const [zonas, setZonas] = useState([])

  // ciclo del componente
  useEffect(() => {
    loadZonas()
  }, [])

  // metodos
  const loadZonas = async () => {
    try {
      const data = await getZonas()
      if (data) setZonas(data)
    } catch (error) {}
  }

  const elegirZona = idZona => {
    alert('Elegiste zona con id: ' + idZona)
  }

  const filterZonas = text => {
    const zonasFiltradas = zonas.filter(zona => {
      return zona.nombre.includes(text)
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: text => (
        <a onClick={() => elegirZona(text)} className='gx-link'>
          {text}
        </a>
      ),
    },
    {
      title: 'ID Padre',
      dataIndex: 'idPadre',
    },
    {
      title: 'Nombre',
      dataIndex: 'Nombre',
    },
    {
      title: 'Tipo de Zona',
      dataIndex: 'TipoZona',
    },
    {
      title: 'Cargo',
      dataIndex: 'Cargo',
    },
  ]

  return (
    <Card title='Zonas'>
      <Table
        className='gx-table-responsive'
        columns={columns}
        dataSource={zonas}
      />
    </Card>
  )
}

export default Zonas
