import React, {Component} from 'react';
import { Navbar, Form, FormControl, Button} from 'react-bootstrap';


class Buscar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" >  
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        
        )
    }
};
export default Buscar;