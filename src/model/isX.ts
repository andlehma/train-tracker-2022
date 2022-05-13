export type isX = '1' | '0';

export const isXToBool = (input: isX): boolean => {
	if (input === '1') return true;
	else return false;
};

export const boolToIsX = (input: boolean): isX => {
	if (input) return '1';
	else return '0';
};
