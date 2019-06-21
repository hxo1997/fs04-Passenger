import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // Container,
    // Row,
    // Col,
    // Jumbotron,
    // Button
} from 'reactstrap';

class Header extends Component {
            constructor(props){
                super(props)
        
                this.toggle = this.toggle.bind(this);
                this.state = {
                    isOpen: false
                };
            }
            toggle() {
                this.setState({
                    isOpen: !this.state.isOpen
                });
            }
            render() {
                return (
                    <div>
                        <Navbar color="dark" light expand="md">
                            <NavbarBrand color="bg-light" href="/">XEDIKE</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/Home/">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/Register">Register</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/Login/">Login</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                );
            }
}
export default Header;