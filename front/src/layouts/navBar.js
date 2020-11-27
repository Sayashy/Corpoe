import React, { Component } from 'react'
import { Icon, Menu, Header } from 'semantic-ui-react'

export default class MenuExampleLabeledIcons extends Component {
  state = { activeItem: 'gamepad' }

  handleSubMenu = () => {
    this.props.setVisible(!this.props.visible)
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled' style={{ margin: "inherit" }}>
        <Menu.Item
          name='gamepad'
          active={activeItem === 'gamepad'}
          onClick={this.handleSubMenu}
        >
          <Icon name='caret square right' />
          Menu
        </Menu.Item>
        <Menu.Menu position='right'>
          <div style={{justifyContent:'center'}} className='ui right aligned category search item'>
              <span>Book CRUD - Corpo'Events</span>
          </div>
        </Menu.Menu>
      </Menu>
    )
  }
}
