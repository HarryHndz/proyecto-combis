import React from 'react';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Ícono de éxito
import ErrorIcon from '@mui/icons-material/Error'; // Ícono de error
import InfoIcon from '@mui/icons-material/Info'; // Ícono de información
import WarningIcon from '@mui/icons-material/Warning'; // Ícono de advertencia
import CloseIcon from '@mui/icons-material/Close'; // Ícono de cerrar

interface AlertProps {
    severity: 'error' | 'warning' | 'info' | 'success';
    title?: string;
    message: string;
    onClose?: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({ severity, title, message, onClose }) => {
    // Definir íconos según la severidad
    const getSeverityIcon = () => {
        switch (severity) {
            case 'success':
                return <CheckCircleIcon style={{ fontSize: 30, color: 'green' }} />;
            case 'error':
                return <ErrorIcon style={{ fontSize: 30, color: 'red' }} />;
            case 'info':
                return <InfoIcon style={{ fontSize: 30, color: 'blue' }} />;
            case 'warning':
                return <WarningIcon style={{ fontSize: 30, color: 'orange' }} />;
            default:
                return null;
        }
    };

    return (
        <Alert
            severity={severity}
            action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={{ display: 'flex', alignItems: 'center' }}
        >
            {/* Mostrar el ícono según la severidad */}
            {getSeverityIcon()}
            <div style={{ marginLeft: 10 }}>
                {title && <AlertTitle>{title}</AlertTitle>}
                {message}
            </div>
        </Alert>
    );
};

export default CustomAlert;
