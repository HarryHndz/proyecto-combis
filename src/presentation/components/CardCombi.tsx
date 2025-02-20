import { Card, CardContent, Typography, Box } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CardCombis = () => {
return (
    <Card
    style={{
        width: '300px',
        padding: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        border: '2px solid white', 
        borderRadius: '8px',  
    }}
    >
    <CardContent>
        <Box display="flex" alignItems="center">
            <DirectionsBusIcon color="primary" style={{ marginRight: '8px' }} />
            <Typography variant="body2">Autobús</Typography>
        </Box>

        <Box display="flex" alignItems="center" style={{ marginTop: '10px' }}>
            <AccessTimeIcon color="secondary" style={{ marginRight: '8px' }} />
            <Typography variant="body2">Tiempo estimado: 8 minutos</Typography>
        </Box>
    </CardContent>
    </Card>
);
};

export default CardCombis;
