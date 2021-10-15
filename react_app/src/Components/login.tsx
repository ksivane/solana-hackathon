import React, {useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import {loginUser, roleChange} from '../redux/actions/loginUser';
import { Form } from 'react-bootstrap';
import NavbarComp from '../Components/navbarComp';

const Login = () => {   

    const [userNameVal, setUserName] = useState("");

    const [role, setRole] = useState("");

    const dispatch = useDispatch();

    let history = useHistory();

    const userName = (event) => {
        setUserName(event.target.value);
    }

    const login = () => {
        dispatch(loginUser(userNameVal));
        history.push("/dashboard");
    }

    const roleDropdown = (event) => {
        setRole(event.target.value);
        dispatch(roleChange(event.target.value));
        //history.push("/dashboard");
    }

    return(
        <>
          <div className="auth-wrapper">
            <div className="auth-inner">
            <form>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter Username" value={userNameVal} onChange={(e)=>userName(e)}/>
                    </div>

                    <div className="form-group" style={{marginTop: '10px'}}>
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password" />
                    </div>
                    <br />
                    <div>
                        <Form.Select  onChange={(event)=> roleDropdown(event)} value={role} aria-label="Default select example">
                            <option value="Select Role">Select Role</option>
                            <option value="Banker">Banker</option>
                            <option value="Producer">Producer</option>
                            <option value="Manufacturer">Manufacturer</option>
                            <option value="ReCycler">ReCycler</option>
                            <option value="Refurbisher">Refurbisher</option>
                        </Form.Select>
                    </div>
                <div className="form-group" style={{marginTop: '10px'}}>
                    <Button variant="primary" onClick={login}>Login</Button>
                </div>
            </form>
            <br />
            {/* <div>
              <select  onChange={(event)=> roleDropdown(event)} value={role} aria-label="Default select example">
                  <option value="Select Role">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manufacturer">Manufacturer</option>
               </select>
           </div> */}
           
            </div>
        </div>
        </>
    )

}

export default Login;