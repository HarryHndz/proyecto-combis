import { Card, CardContent, Typography, Box, Autocomplete, TextField, CircularProgress } from '@mui/material';
import CardCombis from '@/presentation/components/CardCombi';  
import { IRoute } from '@/domain/entities/IPlaces';
import { useState } from 'react';
import { PlaceUseCases } from '@/domain/useCases/placeUseCases';

interface PropsMapCard{
	setRouteValue:(value:IRoute | null)=>void
	routeValue:IRoute | null
}

type Status = 'idle' | 'loading' | 'completed' | 'error'

const MapCard = ({setRouteValue,routeValue}:PropsMapCard) => {
	const [status,setStatus] = useState<Status>('idle')
  const [routes,setRoutes] = useState<IRoute[]>([])

	const handleOpen = async()=>{
    try {
      setStatus('loading')
      const repository = new PlaceUseCases()
      const routes = await repository.getRoutes()
      console.log("rutas",routes);
      setRoutes(routes)
      setStatus('completed')
    } catch (error) {
      setStatus('error')
      console.log("error",error);
    }
  }
	const handleClose = () => {
    setStatus('idle');
    setRoutes([])
  };

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
					<Autocomplete
						disablePortal
						open={status === 'completed'}
						onOpen={handleOpen}
						onClose={handleClose}
						options={routes}
						getOptionLabel={(option)=>option.name}
						isOptionEqualToValue={(option,value)=>option.name === value.name}
						getOptionKey={(option)=>option.id}
						value={routeValue}
						onChange={(event,newValue)=>{
							setRouteValue(newValue)
							console.log("cambio",newValue);
							
						}}
						loading={status === 'loading'}
						sx={{ width: 300 }}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Asynchronous"
								slotProps={{
									input: {
										...params.InputProps,
										endAdornment: (
											<>
												{status === 'loading' ? <CircularProgress color="inherit" size={20} /> : null}
												{params.InputProps.endAdornment}
											</>
										),
									},
								}}
							/>
						)}
						/>
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
