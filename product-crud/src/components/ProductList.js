import React, { useEffect, useState } from 'react';
import axios from './api';
import { Container, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
            setError('Не удалось загрузить продукты');
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(products.filter((product) => product.id !== id)); // Обновляем список продуктов после удаления
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
            setError('Не удалось удалить продукт');
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    if (loading) return <Container sx={{ mt: 4 }}><CircularProgress /></Container>;
    if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Список продуктов
            </Typography>
            <List>
                {products.map((product) => (
                    <div key={product.id}>
                        <ListItem
                            secondaryAction={
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    Удалить
                                </Button>
                            }
                        >
                            <ListItemText
                                primary={product.name}
                                secondary={`Описание: ${product.description} | Цена: $${product.price}`}
                            />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </Container>
    );
};

export default ProductList;
