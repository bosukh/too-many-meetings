'use strict'

import React, { PropTypes } from 'react'
import { Footer } from 'react-materialize'

class Layout extends React.Component {
  render() {
    const footerStyle = {
      position:'fixed',
      bottom:0,
      width:'100%',
      height:'inherit',
      margin: '0px',
      textAlign:'center',
      padding:'0px'}
    return (
      <div>
        <div>{this.props.children}</div>
        <footer style={footerStyle} className='teal darken-3'>
          <p className='white-text'>
            This is a small side project I built to learn React and Redux.
            You can see the source code <a href='https://github.com/bosukh/too-many-meetings'>here</a>.
            Thank you.
          </p>
        </footer>
      </div>
    );
  }
}

export default Layout
