import faker from '@faker-js/faker';
import { CtaService } from '../../src/server/ctaService';
import { Mock } from 'moq.ts';
import { Arrivals } from '../../src/model/arrivals';
import { CtattResponse } from '../../src/model/ctattResponse';
import { generateFakeArrival } from '../helpers/mockGenerators/generateFakeArrival';

describe('ctaService', () => {
	describe('apiResponseToArrivals', () => {
		it('maps an empty response', () => {
			const timestamp = faker.date.recent().toISOString();
			const validResp = new Mock<CtattResponse>()
				.setup((c) => c.ctatt.tmst)
				.returns(timestamp)

				.setup((c) => c.ctatt.eta)
				.returns([]);

			const validOutput: Arrivals = {
				timestamp: new Date(timestamp),
				arrivals: []
			};

			expect(CtaService.apiResponseToArrivals(validResp.object())).toEqual(
				validOutput
			);
		});

		it('maps a response with arrivals', () => {
			const timestamp = faker.date.recent();
			const mockedArrivals = [
				generateFakeArrival(timestamp),
				generateFakeArrival(timestamp),
				generateFakeArrival(timestamp)
			];
			const validResp = new Mock<CtattResponse>()
				.setup((c) => c.ctatt.tmst)
				.returns(timestamp.toISOString())

				.setup((c) => c.ctatt.eta)
				.returns(mockedArrivals.map((tuple) => tuple[0]));

			const validOutput: Arrivals = {
				timestamp: timestamp,
				arrivals: mockedArrivals.map((tuple) => tuple[1])
			};

			expect(CtaService.apiResponseToArrivals(validResp.object())).toEqual(
				validOutput
			);
		});

		it('if train is due, eta is 0', () => {
			const timestamp = faker.date.recent();
			const mockedArrival = generateFakeArrival();
			mockedArrival[0].isApp = '1';
			mockedArrival[1].isDue = true;
			mockedArrival[1].eta = 0;
			const mockedArrivals = [mockedArrival];
			const validResp = new Mock<CtattResponse>()
				.setup((c) => c.ctatt.tmst)
				.returns(timestamp.toISOString())

				.setup((c) => c.ctatt.eta)
				.returns(mockedArrivals.map((tuple) => tuple[0]));

			const validOutput: Arrivals = {
				timestamp: timestamp,
				arrivals: mockedArrivals.map((tuple) => tuple[1])
			};

			expect(CtaService.apiResponseToArrivals(validResp.object())).toEqual(
				validOutput
			);
		});
	});

	describe('minutesDifference', () => {
		it('calculates the minutes between two dates', () => {
			const fakeDate1 = faker.date.soon();
			const minsDiff = faker.datatype.number();
			const fakeDate2 = new Date(fakeDate1.getTime() + minsDiff * 1000 * 60);
			expect(CtaService.minutesDifference(fakeDate1, fakeDate2)).toEqual(
				minsDiff
			);
		});

		it('does not return a negative number', () => {
			const fakeDate1 = faker.date.soon();
			const minsDiff = faker.datatype.number();
			const fakeDate2 = new Date(fakeDate1.getTime() - minsDiff * 1000 * 60);
			expect(CtaService.minutesDifference(fakeDate1, fakeDate2)).toEqual(
				minsDiff
			);
		});

		it('does not return a decimal', () => {
			const fakeDate1 = faker.date.soon();
			const minsDiff = faker.datatype.number();
			const fakeDate2 = new Date(
				fakeDate1.getTime() + minsDiff * 1000 * 60 + 0.5
			);
			expect(CtaService.minutesDifference(fakeDate1, fakeDate2)).toEqual(
				minsDiff
			);
		});
	});
});
