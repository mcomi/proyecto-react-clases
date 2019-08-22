import React, {Component} from "react";
import {Col, Row} from "antd";
import About from "../../components/profile/About/index";
import Biography from "../../components/profile/Biography/index";
import Events from "../../components/profile/Events/index";
import Contact from "../../components/profile/Contact/index";

import {friendList} from './data'
import {photoList} from "./Wall/data";
import Friends from "../../components/profile/Friends/index";
import Photos from "../../components/profile/Photos/index";
import Auxiliary from "../../util/Auxiliary";
import ProfileHeader from "../../components/profile/ProfileHeader/index";

import IntlMessages from "util/IntlMessages";


class Perfil extends Component {
  constructor(props) {
      
    console.log('1. Constructor: ');
    super(props)
      this.state = {
        loading: false,
        error: null,
        data: undefined,
      };
  }  
  
  componentWillMount(){
      console.log('component will mount')
  }
  componentDidMount() {
    console.log('3. componentDidMount');
    
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('4. componentDidUpdate');
    console.log({
        prevProps: prevProps,
        prevState: prevState
    });
    console.log({
        props: this.props,
        state: this.state
    })
  }

  
  componentWillUnmount() {
      console.log('5.componentWillUnmount');
  }


  render() {
    console.log('2. Render');
      if (this.state.loading === true) {
        return (
            <div>
                <h2 className="title gx-mb-4"><IntlMessages id="sidebar.samplePage"/></h2>
    
                <div className="gx-d-flex justify-content-center">
                    <h4>Cargando...</h4>
                </div>
    
            </div>
        );
      }
  
      if (this.state.error) {
        return `Error:' ${this.state.error}`;
      }
      /*if (this.state.data.length === 0) {
        return (
          <div>
            <h3>No hay registros</h3>
            
          </div>
        );
      }*/

    return (
      <Auxiliary>
        <ProfileHeader/>
        <div className="gx-profile-content">
          <Row>
            <Col xl={16} lg={14} md={14} sm={24} xs={24}>
              <About/>
              <Biography/>
              <Events/>
            </Col>

            <Col xl={8} lg={10} md={10} sm={24} xs={24}>
              <Contact/>
              <Row>
                <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                  <Friends friendList={friendList}/>
                </Col>
                <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                  <Photos photoList={photoList}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Auxiliary>
    );
  }
}

export default Perfil;