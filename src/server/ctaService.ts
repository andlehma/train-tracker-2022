import { Arrival } from '../model/arrival';
import { Arrivals } from '../model/arrivals';
import { CtattArrival } from '../model/ctattArrival';
import { CtattResponse } from '../model/ctattResponse';
import { isXToBool } from '../model/isX';
import fetch from 'node-fetch';
import 'dotenv/config';

export const ctaApiEndpoint =
	'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?outputType=JSON';
const ctaNoErrorCode = 0;

export class CtaService {
	async getArrivals(id: number): Promise<Arrivals> {
		const jsonified: CtattResponse = await fetch(
			`${ctaApiEndpoint}&key=${process.env.API_KEY}&stpid=${id}`
		).then((j) => j.json());
		if (parseInt(jsonified.ctatt.errCd) !== ctaNoErrorCode) {
			throw new Error(
				`Error in CTA API Request: ${jsonified.ctatt.errCd}: ${jsonified.ctatt.errNm}`
			);
		}
		return CtaService.apiResponseToArrivals(jsonified);
	}

	static apiResponseToArrivals(res: CtattResponse): Arrivals {
		return {
			timestamp: new Date(res.ctatt.tmst),
			arrivals: res.ctatt.eta.map(
				(carrival: CtattArrival): Arrival => ({
					stationId: parseInt(carrival.staId),
					stopId: parseInt(carrival.stpId),
					stationName: carrival.staNm,
					stopDesc: carrival.stpDe,
					destinationId: parseInt(carrival.destSt),
					destinationName: carrival.destNm,
					arrivalTime: new Date(carrival.arrT),
					isDue: isXToBool(carrival.isApp),
					isScheduled: isXToBool(carrival.isSch),
					latitude: parseFloat(carrival.lat),
					longitude: parseFloat(carrival.lon),
					heading: parseInt(carrival.heading),
					eta: isXToBool(carrival.isApp)
						? 0
						: CtaService.minutesDifference(
								new Date(res.ctatt.tmst),
								new Date(carrival.arrT)
						  )
				})
			)
		};
	}

	static minutesDifference(startDate: Date, endDate: Date): number {
		const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
		const minsDiff = timeDiff / (1000 * 60);
		return Math.ceil(minsDiff);
	}
}
