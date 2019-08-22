import React, { Component } from "react";

import IntlMessages from "util/IntlMessages";

class Inicio extends Component {
    
    
    constructor(props) {
      console.log('1. Constructor');
      super(props)
        this.state = {
          loading: true,
          error: null,
          data: undefined,
        };
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
      if (this.state.data.length === 0) {
        return (
          <div>
            <h3>No hay registros</h3>
            
          </div>
        );
      }
  
      return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.samplePage"/></h2>

            <div className="gx-d-flex justify-content-center">
                <h4>Start building your app. Happy Coding!</h4>
            </div>

        </div>
      );
    }
  }
  
  export default Inicio;