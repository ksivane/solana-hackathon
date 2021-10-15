
import React, {useState, useEffect} from 'react';
import {  useSelector} from "react-redux";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import CircleBlock from '../Components/images/CircleBlock.png';
import type { RootState } from '../redux/store';
import { PersonCircle } from 'react-bootstrap-icons';
import EstablishConnection from '../Components/establishConnection';
import {v4 as uuid_v4} from 'uuid';

const NavbarComp = () => {


    const userName = useSelector((state: RootState) => state.loginReducer.userNameResponse);

    const roleChange = useSelector((state: RootState) => state.loginReducer.roleChange);

    const mintData = useSelector((state: RootState) => state.mintReducer.mintDataValues);

    const mintProductData = useSelector((state: RootState) => state.mintReducer.mintProductDataValues);

    const burnComponentData = useSelector((state: RootState) => state.mintReducer.burnComponentData);

    const addAsAChildValue = useSelector((state: RootState) => state.mintReducer.addAsAChildValue);

    const addAsAChildReproduceValue = useSelector((state: RootState) => state.mintReducer.addAsAChildReproduceValue);

    const mintProductProductDataValues = useSelector((state: RootState) => state.mintReducer.mintProductProductDataValues);

    console.log('mint Component 4 ***');

    const logout = () => {
       window.location.href = '/';
    }

    const userObj = [
        {
            role: "Producer",
            CompanyName: "RedStone Electronics Pte. Ltd."
        },
        {
            role: "Manufacturer",
            CompanyName: "BlueForest Phones Pte. Ltd."
        },
        {
            role: "ReCycler",
            CompanyName: "VKB Recyclers co."
        },
         {
            role: "Refurbisher",
            CompanyName: "SecondLife Goods Pte. Ltd."
        },
        {
            role: "Banker",
            CompanyName: "Indigo Commercial Bank."
        }]


    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand><img
                alt=""
                src={CircleBlock}
                width="30"
                height="30"
                className="d-inline-block align-top"
                /> CircleBlock</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
                 <Nav>
                    {
                     roleChange ?
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        {
                            userObj && userObj.map(elem => {
                                if(roleChange === elem.role) {
                                    return (
                                    <>
                                        <NavDropdown.Item key={uuid_v4()} ><span> <PersonCircle /> </span> <span>Welcome {userName} </span></NavDropdown.Item>
                                        <NavDropdown.Item>{elem.role} </NavDropdown.Item>
                                        <NavDropdown.Item>{elem.CompanyName} </NavDropdown.Item>
                                     </>
                                    )
                                }
                            })
                         
                        }
                        
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    : ''
                   }
                </Nav>
            </Navbar.Collapse>
            </Container>
            <>
                    {
                      mintData && mintData.length > 0 ?
                        <EstablishConnection mintData={mintData[0]}   />
                        : ''
                    }
                    {
                      mintProductData && mintProductData.length > 0 ?
                        <EstablishConnection  mintData={mintProductData[0]} />
                        : ''
                    }
                    {
                        addAsAChildValue && addAsAChildValue.length > 0 ?
                        <EstablishConnection mintData={addAsAChildValue[1]} />
                        : ''
                    }
                    {
                      burnComponentData && burnComponentData.length > 0 ?
                        <EstablishConnection   mintData={burnComponentData[1]} />
                        : ''
                    }
                    {
                      addAsAChildReproduceValue && addAsAChildReproduceValue.length > 0 ?
                        <EstablishConnection   mintData={addAsAChildReproduceValue[1]} />
                        : ''
                    }
                    {
                    mintProductProductDataValues && mintProductProductDataValues.length > 0 ?
                    <EstablishConnection   mintData={mintProductProductDataValues[0]} />
                    : ''
                    }
            </>
          </Navbar>
        </>
    );

 }

 export default NavbarComp;