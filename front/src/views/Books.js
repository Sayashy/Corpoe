import React, { Component } from "react";
import { Grid } from 'semantic-ui-react'
import BooksComponent from '../components/Books'

class Books extends Component {

    render() {
        return (
            <Grid style={{margin:"10px"}} columns={1}>
                <Grid.Column>
                    <BooksComponent />
                </Grid.Column>
            </Grid>
        )
    }
}

export default Books;
