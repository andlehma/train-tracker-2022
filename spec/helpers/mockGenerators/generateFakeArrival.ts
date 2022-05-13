import faker from '@faker-js/faker';
import { Mock } from 'moq.ts';
import { Arrival } from '../../../src/model/arrival';
import { CtattArrival } from '../../../src/model/ctattArrival';
import { boolToIsX, isXToBool } from '../../../src/model/isX';
import { CtaService } from '../../../src/server/ctaService';

export const generateFakeArrival = (
	timestamp?: Date
): [CtattArrival, Arrival] => {
	const fakeStationId = faker.datatype.number();
	const fakeStopId = faker.datatype.number();
	const fakeStationName = faker.random.alpha(10);
	const fakeStopDesc = faker.random.alpha(10);
	const fakeDestId = faker.datatype.number();
	const fakeDestName = faker.random.alpha(10);
	const fakeArrivalTime = faker.date.soon();
	const fakeIsDue = boolToIsX(faker.datatype.boolean());
	const fakeIsScheduled = boolToIsX(faker.datatype.boolean());
	const fakeLatitude = faker.address.latitude();
	const fakeLongitude = faker.address.longitude();
	const fakeHeading = faker.datatype.number();

	const fake = new Mock<CtattArrival>();
	fake.setup((c) => c.staId).returns(fakeStationId.toString());
	fake.setup((c) => c.stpId).returns(fakeStopId.toString());
	fake.setup((c) => c.staNm).returns(fakeStationName);
	fake.setup((c) => c.stpDe).returns(fakeStopDesc);
	fake.setup((c) => c.destSt).returns(fakeDestId.toString());
	fake.setup((c) => c.destNm).returns(fakeDestName);
	fake.setup((c) => c.arrT).returns(fakeArrivalTime.toISOString());
	fake.setup((c) => c.isApp).returns(fakeIsDue);
	fake.setup((c) => c.isSch).returns(fakeIsScheduled);
	fake.setup((c) => c.lat).returns(fakeLatitude);
	fake.setup((c) => c.lon).returns(fakeLongitude);
	fake.setup((c) => c.heading).returns(fakeHeading.toString());

	const real: Arrival = {
		stationId: fakeStationId,
		stopId: fakeStopId,
		stationName: fakeStationName,
		stopDesc: fakeStopDesc,
		destinationId: fakeDestId,
		destinationName: fakeDestName,
		arrivalTime: new Date(fakeArrivalTime),
		isDue: isXToBool(fakeIsDue),
		isScheduled: isXToBool(fakeIsScheduled),
		latitude: parseFloat(fakeLatitude),
		longitude: parseFloat(fakeLongitude),
		heading: fakeHeading,
		eta: isXToBool(fakeIsDue)
			? 0
			: CtaService.minutesDifference(
					timestamp || faker.date.recent(),
					fakeArrivalTime
			  )
	};

	return [fake.object(), real];
};
