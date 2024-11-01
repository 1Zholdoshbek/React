// src/components/ProductForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../api/productService';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function ProductForm() {
    const [product, setProduct] = useState({ name: '', description: '', price: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadProduct();
        }
    }, [id]);

    const loadProduct = async () => {
        const response = await getProductById(id);
        setProduct(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!product.name) newErrors.name = 'Name is required';
        if (!product.description) newErrors.description = 'Description is required';
        if (!product.price) newErrors.price = 'Price is required';
        else if (isNaN(product.price)) newErrors.price = 'Price must be a number';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        if (id) {
            await updateProduct(id, product);
        } else {
            await createProduct(product);
        }
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom>
                {id ? 'Edit Product' : 'Add Product'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price}
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    {id ? 'Update' : 'Add'}
                </Button>
            </Box>
        </Container>
    );
}

export default ProductForm;
