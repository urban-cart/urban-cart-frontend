
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { postProduct } from "../utils/api";
import {getCategories} from "../utils/api";

export const SellItem = () => {
  const [formData, setFormData] = useState({
    name: "Item",
    price: 0,
    quantity: 0,
    description: "Default Value",
    categoryId: "Default Value",
  });
  const [categories, setCategories] = useState([]);

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
      await postProduct(formData);
    } catch (error) {
      console.error("Error posting product:", error);
    }
  };

  useEffect(() => {

    getCategories().then((data) => {
      setCategories(data);
      console.log(data);
    });
  }, []);


  return (
      <div>
        <Container>
        <h1>Sell Item</h1>
        <form onSubmit={handleSubmit}>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Item name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-price"
                label="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-quantity"
                label="quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
              <TextField
                id="outlined-multiline-static"
                label="description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
              <TextField
                  id="filled-select-category"
                  select
                  label="Select"
                  helperText="Please select your category"
                  variant="filled"
                  name = "categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
            </div>
            <button type="submit">Sell</button>
        </form>
        </Container>
      </div>
  );
};

