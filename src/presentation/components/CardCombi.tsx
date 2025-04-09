import { Card, CardContent, Typography, Box } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import { IRoute } from '@/domain/entities/IPlaces';

interface Combi {
	idCombi: string;
	latitude: number;
	longitude: number;
}

interface CardCombisProps {
	combis: Combi[];
	userLocation: { lat: number, lng: number } | null;
	selectedRoute: IRoute | null;
}

const CardCombis = ({ combis, userLocation, selectedRoute }: CardCombisProps) => {
	const [nearestCombi, setNearestCombi] = useState<Combi | null>(null);
	const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

	const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
		const R = 6371; // Radio de la Tierra en km
		const dLat = (lat2 - lat1) * Math.PI / 180;
		const dLon = (lon2 - lon1) * Math.PI / 180;
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c;
	};

	useEffect(() => {
		if (!userLocation || combis.length === 0) {
			setNearestCombi(null);
			setEstimatedTime(null);
			return;
		}

		// Encontrar la combi más cercana
		let minDistance = Infinity;
		let closestCombi: Combi | null = null;

		combis.forEach(combi => {
			const distance = calculateDistance(
				userLocation.lat,
				userLocation.lng,
				combi.latitude,
				combi.longitude
			);

			if (distance < minDistance) {
				minDistance = distance;
				closestCombi = combi;
			}
		});

		setNearestCombi(closestCombi);

		// Calcular tiempo estimado (asumiendo velocidad promedio de 40 km/h)
		if (closestCombi) {
			const speedKmH = 40; // Velocidad promedio en km/h
			const timeHours = minDistance / speedKmH;
			const timeMinutes = Math.round(timeHours * 60);
			setEstimatedTime(timeMinutes);
		}
	}, [combis, userLocation]);

	if (!selectedRoute) {
		return (
			<Card style={styles.card}>
				<CardContent>
					<Typography variant="body2">
						Selecciona una ruta para ver las combis disponibles
					</Typography>
				</CardContent>
			</Card>
		);
	}

	if (!nearestCombi) {
		return (
			<Card style={styles.card}>
				<CardContent>
					<Typography variant="body2">
						No hay combis disponibles en esta ruta
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card style={styles.card}>
			<CardContent>
				<Box display="flex" alignItems="center">
					<DirectionsBusIcon color="primary" style={{ marginRight: '8px' }} />
					<Typography variant="body2">
						{selectedRoute.name} - Combi {nearestCombi.idCombi}
					</Typography>
				</Box>

				<Box display="flex" alignItems="center" style={{ marginTop: '10px' }}>
					<AccessTimeIcon color="secondary" style={{ marginRight: '8px' }} />
					<Typography variant="body2">
						Tiempo estimado: {estimatedTime} minutos
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

const styles = {
	card: {
		width: '300px',
		padding: '10px',
		boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
		border: '2px solid white',
		borderRadius: '8px',
	}
};

export default CardCombis;
