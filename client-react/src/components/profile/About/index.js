import React from 'react'
import {Col, Row, Tabs, Button, Select} from 'antd'
import Widget from 'components/Widget'
import {aboutList} from '../../../routes/Perfil/data'
import AboutItem from './AboutItem'

const TabPane = Tabs.TabPane
const {Option, OptGroup} = Select

const About = ({advisor, handleYearChange, getObjetivosPorAnio}) => {
  const handleChange = value => {
    handleYearChange(value)
  }

  return (
    <Widget
      title='About'
      styleName='gx-card-tabs gx-card-tabs-right gx-card-profile'
    >
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Overview' key='1'>
          <div className='gx-mb-2'>
            <Row>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                <AboutItem advisor={advisor} />
              </Col>
              <Col>
                <Select
                  defaultValue='2019'
                  style={{width: 100}}
                  onChange={handleChange}
                >
                  <Option value='2018'>2018</Option>
                  <Option value='2017'>2017</Option>
                </Select>
                <Button
                  variant='raised'
                  className='jr-btn bg-cyan text-white'
                  onClick={getObjetivosPorAnio}
                >
                  Ver Objetivos
                </Button>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab='Work' key='2'>
          <div className='gx-mb-2'>
            <Row>
              {aboutList.map((about, index) => (
                <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
                  <AboutItem data={about} />
                </Col>
              ))}
            </Row>
          </div>
        </TabPane>
        <TabPane tab='Education' key='3'>
          <div className='gx-mb-2'>
            <Row>
              {aboutList.map((about, index) => (
                <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
                  <AboutItem data={about} />
                </Col>
              ))}
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </Widget>
  )
}

export default About
