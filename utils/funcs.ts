export const asyncDelay = (ms: number) => new Promise(resolve => setTimeout(() => resolve(true), ms));

export const handleize = (strng:string) => {
	try {
		return strng.toLowerCase().trim().replace(/ /g, '-').replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '').replace(/--/, '-')
	} catch (err) {
		console.error(err);
		return null
	}
}

export const diffBetweenNums = (no1:number, no2:number): number => {
	return Math.abs(no1 - no2);
}