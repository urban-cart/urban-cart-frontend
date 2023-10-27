import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { postUser } from "../utils/api";
import {useDispatch, useSelector} from 'react-redux'
import {setToken, setUser} from '../store/product.slice'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const [currentUser, setCurrentUser] = useState([]);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("values:", name, value);
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        console.log("formdata:", formData);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          console.log(formData);
          const response = await postUser(formData);
          if (response.access_token) {
            dispatch(setToken(response));
            dispatch(setUser(formData.email));
            navigate('/');
          
          }
        } catch (error) {
          console.error("Error posting product:", error);
        }
      };
    
    return (
        <div>
          <Card sx={{ bgcolor: "white", width: 500, height: 500, alignItems: "center",
                     display: "flex", flexDirection: "row", justifyContent:"center"}}>
          <form onSubmit={handleSubmit}>
            <div>
                <TextField
                  required
                  id="outlined-required"
                  label="username"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-price"
                  label="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit"  >Login</button>
          </form>
          </Card>
        </div>
    );
  };