import React, { Component } from "react";
import axios from 'axios'
import { Table, Button, Icon, Label, Modal, Form } from 'semantic-ui-react'

class Books extends Component {

    state = {
        items: [],
        open: false,
        isbn:"",
        name:"",
        author:""
    }

    getBooks = async () => {
        const resp = await axios.get('http://localhost:20000/books')
        if (resp.data && resp.data.success) {
            this.setState({ items: resp.data.items })
        }
    }

    onToggle = () => {
        this.setState({
            open: !this.state.open,
            isbn: "",
            name: "",
            author:""
        })
    }

    addBook = async () => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        const params = {
            isbn: this.state.isbn,
            name: this.state.name,
            author: this.state.author,
            release_date: Date.now()/2
        }
        const resp = await axios.post('http://localhost:20000/books', {params})
    }

    async componentDidMount() {
        await this.getBooks()
    }

    render() {
        return (
            <React.Fragment >
                <Button as='div' labelPosition='right'>
                    <Button color='red' onClick={() => this.onToggle()}>
                        Add Book
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        <Icon style={{ margin: 'inherit' }} name='add' />
                    </Label>
                </Button>
                <Table inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ISBN</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                            <Table.HeaderCell>Release Date</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    {this.state.items.length > 0 ?
                        <>
                            <Table.Body>
                                {this.state.items.map(el =>
                                    <Table.Row>
                                        <Table.Cell>{el.isbn}</Table.Cell>
                                        <Table.Cell>{el.name}</Table.Cell>
                                        <Table.Cell>{el.author}</Table.Cell>
                                        <Table.Cell>{el.release_date}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell>3 People</Table.HeaderCell>
                                    <Table.HeaderCell />
                                </Table.Row>
                            </Table.Footer>
                        </>
                        : <Table.Row>
                            <Table.Cell>No Data</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>}

                </Table>

                <Modal
                    onClose={() => this.onToggle()}
                    onOpen={() => this.onToggle()}
                    open={this.state.open}
                >
                    <Modal.Header>Add Book</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form>
                                <Form.Field>
                                    <label>ISBN</label>
                                    <input value={this.state.isbn} placeholder='Please insert ISBN here..' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Name</label>
                                    <input value={this.state.name} placeholder='Please insert Name here..' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Author</label>
                                    <input value={this.state.author} placeholder='Please insert Author here..' />
                                </Form.Field>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => this.onToggle()}>
                            Nope
                        </Button>
                        <Button
                            content="Yep, Add Book"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={() => this.addBook()}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Books;
