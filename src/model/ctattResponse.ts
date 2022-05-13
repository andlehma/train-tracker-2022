import { CtattArrival } from './ctattArrival';

export interface CtattResponse {
	ctatt: {
		tmst: string;
		errCd: string;
		errNm: string;
		eta: CtattArrival[];
	};
}
