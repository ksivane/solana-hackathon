import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper';
import {  Button, Modal, Form , Table, Accordion, Figure, Tabs, Tab} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {mintComponentsData, mintProductComponentsData, mintComponent, mintProduct, burnProduct, burnComponentData, addAsAChild ,addAsAChild1, mintReproduceProductComponentsData} from '../redux/actions/loginUser';
import { useDispatch, useSelector} from "react-redux";
import type { RootState } from '../redux/store';
import {v4 as uuid_v4} from 'uuid';
import CommercialEntity from '../Components/commercialEntity';
import NavbarComp from '../Components/navbarComp';

 export const Dashboard = () => {
    const [show, setShow] = useState(false);
    const [mintResponseData, setMintResponseData] = useState("");
    const [checkboxValueRetrive, setCheckboxValue] = useState("");
    const [checkboxValueRetrive1, setCheckboxValue1] = useState("");
    const [checkboxValueBurnRetrive, setCheckboxBurnValue] = useState("");
    const [tableData, setTableData] = useState([]);
    const [tableData1, setTableData1] = useState([]);
    const [searchDropDownText, setDropDownText] = useState();
    const [dropDownData, setDropDownData] = useState([]);
    const [componentValue, setComponentValue] = useState(Math.floor(Math.random() * (255 - 1) + 1));
    const [addChildButton, setAddChildButton] = useState(true);
    const roleChange = useSelector((state: RootState) => state.loginReducer.roleChange);

    const [roleStateChange, setRoleChange] = useState('home');

    useEffect(() => {
      
     if(roleChange !== "Banker") {
      var stepper = new Stepper(document.querySelector('.bs-stepper'));

      if(roleChange === "Producer"){
        stepper.to(1)
      } else if(roleChange === "Manufacturer"){
          stepper.to(2)
      } else if(roleChange === "ReCycler"){
          stepper.to(3)
      } else if(roleChange === "Refurbisher"){
          stepper.to(4)
      } 
     }
      
    },[roleChange])

    // useEffect(() => {
    
    //   const stepper = new Stepper(document.querySelector('#stepper1'), {
    //     linear: false,
    //     animation: true
    //   })
    // },[])
    
    const dispatch = useDispatch();
  
    const {
      register,
      handleSubmit,
      setError,
      reset,
      formState: { errors }
    } = useForm();
  
    const {
      register: register2,
      formState: { errors: errors2 },
      handleSubmit: handleSubmit2,
    } = useForm();

    const {
      register: register3,
      formState: { errors: errors3 },
      handleSubmit: handleSubmit3,
    } = useForm();

    const mintData = useSelector((state: RootState) => state.mintReducer.mintDataValues);

    const mintResponse = useSelector((state: RootState) => state.mintReducer.mintResponse);

    const addAsAChildButton = useSelector((state: RootState) => state.mintReducer.addAsAChildButton);

    const burnResponseData = useSelector((state: RootState) => state.mintReducer.burnResponseData);


    const onSubmit = (data) => {
      console.log('mint Component 1 ***');
      // dispatch(mintComponent(true));
      // dispatch(mintProduct(false));
      // dispatch(burnProduct(false));
      setComponentValue (Math.floor(Math.random() * (255 - 1) + 1));
      data['componentid'] = JSON.stringify(Math.floor(Math.random() * (255 - 1) + 1));
      dispatch(mintComponentsData(data,"mintComponent", mintData));

    }; // your form submit function which will invoke after successful validation

    const keyVariable =  Object.keys(localStorage);

    const valueVariable =  Object.values(localStorage);
 
    const keyVariable1 =  Object.keys(localStorage);

    const serielDropdown = (event) => {

      var searchText = event.target.value;

      console.log('searchText', searchText);

      setDropDownText(searchText);

      var data = Object.values(Object.entries(localStorage).filter(([key]) => key.includes(searchText)));


      //      let arrToObjects =  data && data.length > 0 && data.map((item, idx) => {
      //       return { [item[idx]]: item[1] };
      //     })

      // console.log('arrToObjects', arrToObjects);
      
      //pushToAry("myName", "myVal");
      data && data.length > 0 && data.map(elem => {
          let val1 = JSON.parse(elem[1]);
          setTableData(val1);
      })
 
     
  }

  const serielDropdown1 = (event) => {

    var searchText = event.target.value;

    console.log('searchText', searchText);

    setDropDownText(searchText);

    var data = Object.values(Object.entries(localStorage).filter(([key]) => key.includes(searchText)));


    //      let arrToObjects =  data && data.length > 0 && data.map((item, idx) => {
    //       return { [item[idx]]: item[1] };
    //     })

    // console.log('arrToObjects', arrToObjects);
    
    //pushToAry("myName", "myVal");
    data && data.length > 0 && data.map(elem => {
        let val1 = JSON.parse(elem[1]);
        setTableData1(val1);
    })

   
}


 

  const reCycle = () => {

    valueVariable && valueVariable.length > 0 && valueVariable.map(elem => {
      
       var dataPush = [];

    for(let i=0; i < valueVariable.length; i++){
      elem = JSON.parse(valueVariable[i]);
      if(elem.parent == 0){
        
        dataPush.push(elem.id);
      }   
         setDropDownData(dataPush);
      }
    })
  }

  const reProduceEmpty = () => {

    valueVariable && valueVariable.length > 0 && valueVariable.map(elem => {
      
       var dataPush = [];

    for(let i=0; i < valueVariable.length; i++){
      elem = JSON.parse(valueVariable[i]);
      if(elem.parent == 0){
        
        dataPush.push(elem.id);
      }   
         setDropDownData(dataPush);
      }
    })
  }

  useEffect(() => {
    valueVariable && valueVariable.length > 0 && valueVariable.map(elem => {
      
      var dataPush = [];

   for(let i=0; i < valueVariable.length; i++){
     elem = JSON.parse(valueVariable[i]);
     if(elem.parent == 0){
       
       dataPush.push(elem.id);
     }   
        setDropDownData(dataPush);
     }
   })
  },[burnResponseData])

  
   
  
    useEffect(() => {
      setMintResponseData(mintResponse)
    },[mintResponse])

    useEffect(() => {
      setAddChildButton(false)
    },[addAsAChildButton])
  
    // const clearValues = (e) => {
    //   reset({
    //     componentid: "",
    //     description: "",
    //     name: "",
    //     serielNo: ""
    //   })
    //   setMintResponseData("");
    // onClick={clearValues}
    // }

    const showModal = (e) => {
      e.preventDefault();
      setShow(true);
    }

    const getSelected = (data) => {
      setComponentValue (Math.floor(Math.random() * (255 - 1) + 1));
      data['componentid'] = JSON.stringify(Math.floor(Math.random() * (255 - 1) + 1));
      dispatch(mintProductComponentsData(data,"mintAProduct"));
    }

    const mintReProduceProduct = (data) => {
      setComponentValue (Math.floor(Math.random() * (255 - 1) + 1));
      data['componentid'] = JSON.stringify(Math.floor(Math.random() * (255 - 1) + 1));
      dispatch(mintReproduceProductComponentsData(data,"mintAReproduceProduct"));
    }

    const addChildParent = () => {
      dispatch(addAsAChild("addAsAChild", searchDropDownText));
    }

    const addChildParent1 = () => {
      dispatch(addAsAChild1("addAsAChildReProduce", searchDropDownText));
    }

    const burnAProduct = () => {
      dispatch(burnComponentData("BurnAProduct", searchDropDownText));

    }; 

    
  return (
    <>
    <NavbarComp /> 
     {
     roleChange === "Banker" ?
     <>
      <br />
      <CommercialEntity />
     </>
     :
    <div>
      {/* <Tabs
      id="controlled-tab-example"
      activeKey={roleStateChange}
      onSelect={(k) => setRoleChange(k)}
      className="mb-3"
    >
            <Tab eventKey="home" title="Home">
              Home
            </Tab>
            <Tab eventKey="profile" title="Profile">
              Profile
            </Tab>
            <Tab eventKey="contact" title="Contact">
              Contact
            </Tab>
        </Tabs> */}
        <div id="stepper1" className="bs-stepper">
          <div className="bs-stepper-header">
            <div className="step"  data-target="#test-l-1">
              <button className="step-trigger">
                <span className="bs-stepper-circle">1</span>
                <span className="bs-stepper-label">Produce Component</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#test-l-2">
              <button className="step-trigger"  >
                <span className="bs-stepper-circle">2</span>
                <span className="bs-stepper-label">Manufacture Product</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#test-l-3">
              <button className="step-trigger" onClick={reCycle}>
                <span className="bs-stepper-circle">3</span>
                <span className="bs-stepper-label">Recycle</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#test-l-4">
              <button className="step-trigger" onClick={reProduceEmpty}>
                <span className="bs-stepper-circle">4</span>
                <span className="bs-stepper-label">Refurbish</span>
              </button>
            </div>
          </div>
          <div className="bs-stepper-content">
              <div id="test-l-1" className="content">
                <div className="form-group">
                  <Form key={1} onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label visuallyHidden column sm={2}>
                          Id
                        </Form.Label>
                        <Form.Control  style={{display: 'none' }} defaultValue={componentValue} {...register("componentid", {
                          required: true,
                          minLength: 1,
                          maxLength: 255,
                        })} placeholder="Enter Component Id" />
                         {errors.componentid?.type === 'required' && "Id is required"}
                         {errors.componentid && errors.componentid.type === "minLength" && <span>Min length should be 1</span> }
                         {errors.componentid && errors.componentid.type === "maxLength" && <span>Max length should be 255</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Name
                        </Form.Label>
                        <Form.Control  {...register('name', { required: true, minLength: 5, maxLength: 16 })}  type="text" placeholder="Enter Name" />
                        {errors.name?.type === 'required' && "name is required"}
                        {errors.name && errors.name.type === "minLength" && <span>Min length should be 5</span> }
                        {errors.name && errors.name.type === "maxLength" && <span>Max length should be 16</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Description 
                        </Form.Label>
                        <Form.Control {...register("description", {
                          required: true,
                          minLength: 10,
                          maxLength: 64
                        })} type="text" placeholder="Enter Description" />
                        {errors.description?.type === 'required' && "Description is required"}
                         {errors.description && errors.description.type === "minLength" && <span>Min length should be 10</span> }
                         {errors.description && errors.description.type === "maxLength" && <span>Max length should be 64</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Serial Number
                        </Form.Label>
                        <Form.Control {...register("serielNo", {
                          required: true,
                          minLength: 5,
                          maxLength: 16,
                        })} type="text" placeholder="Enter Serial Number" />
                          {errors.serielNo?.type === 'required' && "Serial Number is required"}
                         {errors.serielNo && errors.serielNo.type === "minLength" && <span>Min length should be 5</span> }
                         {errors.serielNo && errors.serielNo.type === "maxLength" && <span>Max length should be 16</span> }
                      </Form.Group>
                      <Button style={{float:'right', paddingTop:'10px'}} className="btn btn-primary" variant="success" type="submit" >Mint Component</Button>
                      <br /> 
                      <br /> 

                        <div className="form-group">
                         <label htmlFor="exampleFormControlTextarea1">
                          Response from Solana blockchain 
                          </label>
                          <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows={5}
                          defaultValue = {Object.keys(mintResponseData).length === 0 ? '' : mintResponseData}
                          />
                        </div>
                    </Form>
                </div>
              </div>
              <div id="test-l-2" className="content">
                <div className="form-group">
                  <div>
                      <div className="row">
                          <div className="col-md-5 offset-md-2">
                          <div className="form-row">
                                <div className="form-group col-md-6">
                                
                                  <Modal
                                      show={show}
                                      onHide={() => setShow(false)}
                                      dialogClassName="modal-90w"
                                      aria-labelledby="example-custom-modal-styling-title"
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                          General Info
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                      <Form>
                                        <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                          <Form.Label column sm={2}>
                                            Type
                                          </Form.Label>
                                            CPU
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                          <Form.Label column sm={2}>
                                            Brand
                                          </Form.Label>
                                            QualComm
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                          <Form.Label column sm={2}>
                                            Serial
                                          </Form.Label>
                                            Snapdragon 888
                                        </Form.Group>
                                      </Form>
                                      </Modal.Body>
                                    </Modal>
                                </div>
                            </div>                      
                          </div>
                      </div>
                  </div>
                  <Form key={2} onSubmit={handleSubmit2(getSelected)}>
                  <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label visuallyHidden column sm={2}>
                          Id
                        </Form.Label>
                        <Form.Control style={{display:'none'}} defaultValue={componentValue} {...register2("componentid", {
                          required: true,
                          minLength: 1,
                          maxLength: 255,
                        })} 
                        type="text" placeholder="Enter Product Id" />
                         {errors.componentid?.type === 'required' && "Id is required"}
                         {errors.componentid && errors.componentid.type === "minLength" && <span>Min length should be 1</span> }
                         {errors.componentid && errors.componentid.type === "maxLength" && <span>Max length should be 255</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Name
                        </Form.Label>
                        <Form.Control  {...register2('name', { required: true, minLength: 5, maxLength: 16 })}  type="text" placeholder="Enter Name" />
                        {errors.name?.type === 'required' && "name is required"}
                        {errors.name && errors.name.type === "minLength" && <span>Min length should be 5</span> }
                        {errors.name && errors.name.type === "maxLength" && <span>Max length should be 16</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Description 
                        </Form.Label>
                        <Form.Control {...register2("description", {
                          required: true,
                          minLength: 10,
                          maxLength: 64
                        })} type="text" placeholder="Enter Description" />
                        {errors.description?.type === 'required' && "Description is required"}
                         {errors.description && errors.description.type === "minLength" && <span>Min length should be 10</span> }
                         {errors.description && errors.description.type === "maxLength" && <span>Max length should be 64</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Serial Number
                        </Form.Label>
                        <Form.Control {...register2("serielNo", {
                          required: true,
                          minLength: 5,
                          maxLength: 16,
                        })} type="text" placeholder="Enter Serial Number" />
                          {errors.serielNo?.type === 'required' && "Serial Number is required"}
                         {errors.serielNo && errors.serielNo.type === "minLength" && <span>Min length should be 5</span> }
                         {errors.serielNo && errors.serielNo.type === "maxLength" && <span>Max length should be 16</span> }
                      </Form.Group>
                      <Button style={{float:'right', paddingTop:'10px'}} className="btn btn-primary" variant="success" type="submit"  >Mint Product</Button>
                      <br />
                      <br />
                    <div>
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Add Component to Product</Accordion.Header>
                          <Accordion.Body>
                          <div>
                        <select onChange={(event)=> serielDropdown(event)} value={searchDropDownText} className="form-control" aria-label="Default select example">
                          <option>Select Item</option>
                          {
                              keyVariable.map(elem => (
                                  <option key={uuid_v4()} value={elem} >{elem}</option>
                                
                              ))
                          }
                        </select>
                      </div> 
                      <br />
                     <div>
                      {
                      <Table striped bordered hover variant="light" id="Table1">
                                  <thead>
                                    <tr> 
                                      <th>Id</th>
                                      <th>Name</th>
                                      <th>Description</th>
                                      <th>Serial Number</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                       
                                         <tr key={uuid_v4()}>
                                            {/* <td style={{whiteSpace:'nowrap'}} >
                                              {
                                                tableData && Object.keys(tableData).length > 1 ?
                                                <input type="checkbox" className="messageCheckbox" id="myCheck"
                                                name="mintData" onClick={checkboxValue} value={checkboxValueRetrive} 
                                                 />
                                                : ''
                                              }
                                             </td> */}
                                            {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData && tableData.id}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData && tableData.name}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData && tableData.description}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}} >{tableData && tableData.serielNo}</td>
                                            {/* <td> <button type="button" style={{float:'right', marginTop:'10px', whiteSpace:'nowrap'}} className="btn btn-primary" onClick={(e) => showModal(e)} >Show Detail</button> </td> */}
                                          </tr>
                                    }
                                  </tbody>
                          </Table>
                          }
                          </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                    </Form>  
                    <br />
                    <div>
                        <Button style={{float:'right', paddingTop:'10px'}} className="btn btn-primary" variant="success" type="submit"  onClick={addChildParent} >Add as a Child</Button>
                    </div>
                    <br />
                    <br />
                </div>
              </div>
              <div id="test-l-3" className="content">
                <div className="form-group">
                <select onChange={(event)=> serielDropdown(event)} value={searchDropDownText} className="form-control" aria-label="Default select example">
                  <option> Select Item to Recycle </option>
                  {
                      dropDownData && dropDownData.map(elem => (
                          <option key={uuid_v4()} value={elem} >{elem}</option>
                        
                      ))
                  }
                </select>
                <br />
                <div>
                <Table striped bordered hover variant="light" id="Table2">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Serial Number</th>
                        {/* <th></th> */}
                      </tr>
                    </thead>
                    <tbody>
                                    {
                                         <tr key={uuid_v4()}>
                                            {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData && tableData.id}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData && tableData.name}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData && tableData.description}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}} >{tableData && tableData.serielNo}</td>
                                            {/* <td> <button type="button" style={{float:'right', marginTop:'10px', whiteSpace:'nowrap'}} className="btn btn-primary" onClick={(e) => showModal(e)} >Show Detail</button> </td> */}
                                          </tr>
                                       
                                    }
                      </tbody>
                    </Table>
                  </div>
                    <br />
                      <div>
                          <Button style={{float:'right', paddingTop:'10px'}} className="btn btn-primary" variant="success" type="submit" onClick={burnAProduct}  >Burn Product</Button>
                          <br />
                      </div>
                </div>
              </div>
              <div id="test-l-4" className="content">
              <div className="form-group">
                  <div>
                      <div className="row">
                          <div className="col-md-5 offset-md-2">
                          <div className="form-row">
                                <div className="form-group col-md-6">
                                
                                  <Modal
                                      show={show}
                                      onHide={() => setShow(false)}
                                      dialogClassName="modal-90w"
                                      aria-labelledby="example-custom-modal-styling-title"
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                          General Info
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                      <Form>
                                        <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                          <Form.Label column sm={2}>
                                            Type
                                          </Form.Label>
                                            CPU
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                          <Form.Label column sm={2}>
                                            Brand
                                          </Form.Label>
                                            QualComm
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                          <Form.Label column sm={2}>
                                            Serial
                                          </Form.Label>
                                            Snapdragon 888
                                        </Form.Group>
                                      </Form>
                                      </Modal.Body>
                                    </Modal>
                                </div>
                            </div>                      
                          </div>
                      </div>
                  </div>
                  <Form key={2} onSubmit={handleSubmit3(mintReProduceProduct)}>
                  <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label visuallyHidden column sm={2}>
                          Id
                        </Form.Label>
                        <Form.Control style={{display:'none'}} defaultValue={componentValue} {...register3("componentid", {
                          required: true,
                          minLength: 1,
                          maxLength: 255,
                        })} 
                        type="text" placeholder="Enter Product Id" />
                         {errors.componentid?.type === 'required' && "Id is required"}
                         {errors.componentid && errors.componentid.type === "minLength" && <span>Min length should be 1</span> }
                         {errors.componentid && errors.componentid.type === "maxLength" && <span>Max length should be 255</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Name
                        </Form.Label>
                        <Form.Control  {...register3('name', { required: true, minLength: 5, maxLength: 16 })}  type="text" placeholder="Enter Name" />
                        {errors.name?.type === 'required' && "name is required"}
                        {errors.name && errors.name.type === "minLength" && <span>Min length should be 5</span> }
                        {errors.name && errors.name.type === "maxLength" && <span>Max length should be 16</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Description 
                        </Form.Label>
                        <Form.Control {...register3("description", {
                          required: true,
                          minLength: 10,
                          maxLength: 64
                        })} type="text" placeholder="Enter Description" />
                        {errors.description?.type === 'required' && "Description is required"}
                         {errors.description && errors.description.type === "minLength" && <span>Min length should be 10</span> }
                         {errors.description && errors.description.type === "maxLength" && <span>Max length should be 64</span> }
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                          Serial Number
                        </Form.Label>
                        <Form.Control {...register3("serielNo", {
                          required: true,
                          minLength: 5,
                          maxLength: 16,
                        })} type="text" placeholder="Enter Serial Number" />
                          {errors.serielNo?.type === 'required' && "Serial Number is required"}
                         {errors.serielNo && errors.serielNo.type === "minLength" && <span>Min length should be 5</span> }
                         {errors.serielNo && errors.serielNo.type === "maxLength" && <span>Max length should be 16</span> }
                      </Form.Group>
                      <Button style={{float:'right', paddingTop:'10px'}} className="btn btn-primary" variant="success" type="submit">Mint Product</Button>
                      <br />
                      <br />
                      <div>
                      <br />
                      <br />
                      <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Add Component to Product</Accordion.Header>
                        <Accordion.Body>
                      <div>
                        <select onChange={(event)=> serielDropdown1(event)} value={searchDropDownText} className="form-control" aria-label="Default select example">
                          <option>Select Item</option>
                          {
                              keyVariable1.map(elem => (
                                  <option key={uuid_v4()} value={elem} >{elem}</option>
                                
                              ))
                          }
                        </select>
                      </div> 
                      <br />
                     <div>
                      {
                      <Table striped bordered hover variant="light" id="Table3">
                                  <thead>
                                    <tr>
                                      <th>Id</th>
                                      <th>Name</th>
                                      <th>Description</th>
                                      <th>Serial Number</th>
                                      {/* <th></th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                     
                                         <tr key={uuid_v4()}>
                                            {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData1 && tableData1.id}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData1 && tableData1.name}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}}>{tableData1 && tableData1.description}</td>
                                             {/* @ts-expect-error: Let's ignore a compile error like this unreachable code */}
                                            <td style={{whiteSpace:'nowrap'}} >{tableData1 && tableData1.serielNo}</td>
                                            {/* <td> <button type="button" style={{float:'right', marginTop:'10px', whiteSpace:'nowrap'}} className="btn btn-primary" onClick={(e) => showModal(e)} >Show Detail</button> </td> */}
                                          </tr>
                                       
                                    }
                                  </tbody>
                          </Table>
                          }
                        </div>
                        </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                     </div>
                    </Form>  
                    <br />
                    <div>
                      <Button style={{float:'right', paddingTop:'10px'}} className="btn btn-primary" variant="success" type="button" onClick={addChildParent1} >Add as a Child</Button>
                    </div>
                    <br />
                </div>
              </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Dashboard;
