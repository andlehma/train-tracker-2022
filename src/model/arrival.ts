export interface Arrival {
	stationId: number;
	stopId: number;
	stationName: string;
	stopDesc: string;
	destinationId: number;
	destinationName: string;
	arrivalTime: Date;
	isDue: boolean;
	isScheduled: boolean;
	latitude: number;
	longitude: number;
	heading: number;
	eta: number;
}
