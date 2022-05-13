import { isX } from './isX';

export interface CtattArrival {
	staId: string;
	stpId: string;
	staNm: string;
	stpDe: string;
	rn: string;
	rt: string;
	destSt: string;
	destNm: string;
	trDr: string;
	prdt: string;
	arrT: string;
	isApp: isX;
	isSch: isX;
	isDly: isX;
	isFlt: isX;
	flags: null;
	lat: string;
	lon: string;
	heading: string;
}
