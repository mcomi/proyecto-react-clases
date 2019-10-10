import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'antd'
import About from '../../components/profile/About/index'
import Biography from '../../components/profile/Biography/index'
import Events from '../../components/profile/Events/index'
import Contact from '../../components/profile/Contact/index'

import {friendList} from './data'
import {photoList} from './Wall/data'
import Cartera from '../../components/profile/Cartera/index'
import Photos from '../../components/profile/Photos/index'
import Auxiliary from '../../util/Auxiliary'
import ProfileHeader from '../../components/profile/ProfileHeader/index'
import {
  getAdvisorDetail,
  getObjetivosFromAdvisorByYear,
  getVolumenCarteraPorCvl,
} from '../../api/advisors'

import IntlMessages from 'util/IntlMessages'

const Perfil = props => {
  const {authUser} = props
  console.log(authUser)
  const initialAdvisor = {
    first_name: 'Advisor',
    last_name: 'Demo',
    email: 'email',
  }
  const {username} = props.match.params
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [settings, setSettings] = useState(null)
  const [advisor, setAdvisor] = useState(initialAdvisor)
  const [objetivos, setObjetivos] = useState(null)
  const [hasObjetivos, setHasObjetivos] = useState(false)
  const [anioObjetivos, setAnioObjetivos] = useState('2019')
  const [volumenCartera, setVolumenCartera] = useState([])
  const [volumenCarteraOnload, setVolumenCarteraOnload] = useState([])

  const getAdvisor = async () => {
    try {
      const data = await getAdvisorDetail(username)
      if (data) {
        setAdvisor(data)
        loadVolumenCarteraPorCvlOnLoad(data.username)
      }
    } catch (error) {}
  }

  const loadVolumenCarteraPorCvl = async () => {
    try {
      const cvl = advisor.username
      const data = await getVolumenCarteraPorCvl(cvl)
      if (data) setVolumenCartera(data)
    } catch (error) {}
  }

  const loadVolumenCarteraPorCvlOnLoad = async cvl => {
    try {
      const data = await getVolumenCarteraPorCvl(cvl)
      console.log(data)
      if (data) setVolumenCarteraOnload(data)
    } catch (error) {}
  }

  const handleYearChange = anio => {
    setAnioObjetivos(anio)
  }

  const getObjetivosPorAnio = async () => {
    try {
      const cvl = advisor.username
      const data = await getObjetivosFromAdvisorByYear(cvl, anioObjetivos)
      if (data.length > 0) {
        setObjetivos(data[0])
        setHasObjetivos(true)
      } else {
        alert('No hay datos para ese año')
      }
    } catch (error) {}
  }

  useEffect(() => {
    getAdvisor()
  }, [])

  return (
    <Auxiliary>
      <ProfileHeader name={`${advisor.first_name} ${advisor.last_name}`} />
      <div className='gx-profile-content'>
        <Row>
          <Col xl={16} lg={14} md={14} sm={24} xs={24}>
            <About
              advisor={advisor}
              getObjetivosPorAnio={getObjetivosPorAnio}
              handleYearChange={handleYearChange}
              loadVolumenCarteraPorCvl={loadVolumenCarteraPorCvl}
            />
            {hasObjetivos && <Biography objetivos={objetivos} />}
            <Events />
          </Col>

          <Col xl={8} lg={10} md={10} sm={24} xs={24}>
            <Contact
              email={advisor.email}
              phone={advisor.phone}
              code={advisor.calling_code}
            />
            <Row>
              <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                {volumenCartera.length > 0 && (
                  <Cartera volumenCartera={volumenCartera} />
                )}
              </Col>
              <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                <Photos photoList={photoList} />
              </Col>
              <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                {volumenCarteraOnload.length > 0 && (
                  <Cartera volumenCartera={volumenCarteraOnload} />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Auxiliary>
  )
}

const mapStateToProps = ({auth}) => {
  const {authUser} = auth
  return {authUser}
}

export default connect(mapStateToProps)(Perfil)
