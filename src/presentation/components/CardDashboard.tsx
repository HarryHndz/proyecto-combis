import { Card, CardContent, Typography, Box } from '@mui/material';
import SearchBar from '@/presentation/components/searchbar';  
import CardCombis from '@/presentation/components/CardCombi';  

const MapCard = () => {
    return (
    <Card
        style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
            minWidth: '300px',  
            maxWidth: '350px',  
            padding: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',  
            justifyContent: 'flex-start',  
            overflow: 'hidden',  
            maxHeight: '80vh',  
        }}
        >
        <CardContent>
            <Typography variant="h6" gutterBottom>
                Busque la ruta deseada
            </Typography>
        <Box
            display="flex"
            justifyContent="center" 
            alignItems="center"  
            width="100%"  
            marginBottom="20px"  
            >
        <SearchBar/>
        </Box>

            <Typography variant="body2" style={{ marginTop: '10px' }}>
                Transporte mas cercano
            </Typography>
        <Box
            display="flex"
            justifyContent="center"  
            style={{ marginTop: '20px' }}
        >
        <CardCombis />
        </Box>
    </CardContent>
    </Card>
);
};

export default MapCard;
