import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const BotonAgregar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate('register')}>
            Agregar
        </Button>
    );
};

export default BotonAgregar;
