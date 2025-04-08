import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface BotonAgregarProps {
  onClick?: () => void;
}

const BotonAgregar: React.FC<BotonAgregarProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      Agregar
    </Button>
  );
};

export default BotonAgregar;
