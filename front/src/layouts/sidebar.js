import React from 'react'
import {
    Grid,
    Icon,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import MenuExampleLabeledIcons from './navBar'
import { Link } from "react-router-dom";
import sidebarItems from './sidebarItems';

const SidebarExampleDimmed = ({ Children }) => {
    const [visible, setVisible] = React.useState(false)
    const [subMenuValues, setSubMenu] = React.useState({
        subMenuVisible: false,
        items: []
     });

    return (
        <React.Fragment>
            <Grid columns={1}>
                <Grid.Column style={{ padding: "inherit", paddingTop: "10px" }}>
                    <Sidebar.Pushable as={Segment} style={{ margin: "inherit", padding: "inherit", border: "inherit", borderRadius: "inherit" }}>
                        <Sidebar
                            as={Menu}
                            animation='overlay'
                            icon='labeled'
                            inverted
                            onHide={() => setVisible(false)}
                            vertical
                            visible={visible}
                            width='thin'
                            style={{ boxShadow: "inherit" }}
                        >
                            {sidebarItems.map(el => {
                                return el.path != null 
                                    ? <Link to={el.path}>
                                        <Menu.Item as='a'>
                                            <Icon name={el.icon} size={el.size} />
                                            <p>{el.name}</p>
                                        </Menu.Item>
                                    </Link>
                                    : <Link>
                                        <Menu.Item as='a' onClick={() => setSubMenu({subMenuVisible:true, items:el.subMenus})}>
                                            <Icon name={el.icon} size={el.size} />
                                            <p>{el.name}</p>
                                        </Menu.Item>
                                    </Link>
                            })}
                        </Sidebar>

                        <Sidebar
                            as={Menu}
                            animation='overlay'
                            direction='right'
                            onHide={() => setSubMenu({subMenuVisible:false, items:[]})}
                            inverted
                            vertical
                            visible={subMenuValues.subMenuVisible}
                            style={{ boxShadow: "inherit" }}
                        >
                            {subMenuValues.items.map(el => (
                                <Link to={el.path}>
                                    <Menu.Item as='a'>
                                        <Icon name={el.icon} size={el.size} />
                                        <p>{el.name}</p>
                                    </Menu.Item>
                                </Link>
                            ))}
                        </Sidebar>

                        <Sidebar.Pusher dimmed={visible}>
                            <Segment basic style={{ paddingTop: 0, paddingRight: 0 }}>
                                <MenuExampleLabeledIcons visible={visible} setVisible={setVisible}></MenuExampleLabeledIcons>
                                <div style={{ height: "100vh" }}>
                                    <Children></Children>
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Grid.Column>
            </Grid>
        </React.Fragment>
    )
}

export default SidebarExampleDimmed