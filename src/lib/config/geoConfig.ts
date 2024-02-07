/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
export const geoNames = {
	W04: { label: 'community', plural: 'communities', childGroup: true },
	E06: { label: 'unitary authority', plural: 'unitary authorities' },
	W06: { label: 'unitary authority', plural: 'unitary authorities', childGroup: true },
	E07: {
		label: 'non-metropolitan district',
		plural: 'non-metropolitan districts',
		childGroup: true
	},
	E08: { label: 'metropolitan district', plural: 'metropolitan districts' },
	E09: { label: 'borough', plural: 'boroughs', childGroup: true },
	E10: { label: 'county', plural: 'counties' },
	E11: { label: 'metropolitan county', plural: 'metropolital counties' },
	S12: { label: 'council area', plural: 'council areas', childGroup: true },
	N09: {
		label: 'local government district',
		plural: 'local government districts',
		childGroup: true
	}
};

export const noIndex = ['E00', 'W00', 'E01', 'W01', 'E02', 'W02', 'E04', 'W04', 'E05', 'W05'];
export const essGeocodes = [
	'E06',
	'E07',
	'E08',
	'E09',
	'E10',
	'E12',
	'E47',
	'E92',
	'N09',
	'N92',
	'S12',
	'S92',
	'W06',
	'W92'
];

export const sources = [
	{ id: 'uk', type: 'geojson' },
	{ id: 'ctry', type: 'geojson' },
	{ id: 'rgn', type: 'geojson' },
	{
		id: 'la',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2023/authorities-all/v1/boundaries/{z}/{x}/{y}.pbf',
		layer: 'boundaries',
		minzoom: 4
	},
	{
		id: 'wpc',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2010/wpc/v2/boundaries/{z}/{x}/{y}.pbf',
		layer: 'boundaries',
		minzoom: 4
	},
	{
		id: 'sener',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2022/sen/v1/boundaries/{z}/{x}/{y}.pbf',
		layer: 'region'
	},
	{
		id: 'senc',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2022/sen/v1/boundaries/{z}/{x}/{y}.pbf',
		layer: 'constituency'
	},
	{
		id: 'wd',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2023/wd/v1/boundaries/{z}/{x}/{y}.pbf',
		layer: 'boundaries',
		minzoom: 6
	},
	{
		id: 'par',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2022/par/v1/boundaries/{z}/{x}/{y}.pbf',
		layer: 'par',
		minzoom: 6
	},
	{
		id: 'msoa',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2021/msoa/v2/boundaries/{z}/{x}/{y}.pbf',
		layer: 'msoa',
		minzoom: 6
	},
	{
		id: 'lsoa',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2021/lsoa/v2/boundaries/{z}/{x}/{y}.pbf',
		layer: 'lsoa',
		minzoom: 7
	},
	{
		id: 'oa',
		type: 'vector',
		url: 'https://cdn.ons.gov.uk/maptiles/administrative/2021/oa/v2/boundaries/{z}/{x}/{y}.pbf',
		layer: 'oa',
		minzoom: 8
	}
];

const notInTypes = (cds) => cds.map((cd) => ['!', ['in', cd, ['get', 'areacd']]]);

export const geoTypes = [
	{
		key: 'uk',
		codes: ['K02'],
		source: 'uk',
		label: 'United Kingdom',
		plural: 'United Kingdom'
	},
	{
		key: 'ctry',
		codes: ['E92', 'S92', 'N92', 'W92'],
		pcio: 'country',
		label: 'country',
		plural: 'countries',
		source: 'ctry'
	},
	{
		key: 'rgn',
		codes: ['E12'],
		pcio: 'region',
		label: 'region',
		plural: 'regions',
		source: 'rgn'
	},
	{
		key: 'cauth',
		codes: ['E06', 'E09', 'E10', 'E47', 'N09', 'S12', 'W06'],
		label: 'upper-tier/combined authority',
		plural: 'upper-tier/combined authorities',
		source: 'la',
		filter: ['all', ...notInTypes(['E07', 'E08']), ['!', ['==', ['get', 'cauth'], 'true']]]
	},
	{
		key: 'utla',
		codes: ['E06', 'E08', 'E09', 'E10', 'N09', 'S12', 'W06'],
		pcio: 'admin_county',
		label: 'upper-tier/unitary authority',
		plural: 'upper-tier/unitary authorities',
		source: 'la',
		filter: ['all', ...notInTypes(['E07', 'E47'])]
	},
	{
		key: 'ltla',
		codes: ['E06', 'E07', 'E08', 'E09', 'N09', 'S12', 'W06'],
		pcio: 'admin_district',
		label: 'lower-tier/unitary authority',
		plural: 'lower-tier/unitary authorities',
		source: 'la',
		filter: ['all', ...notInTypes(['E10', 'E47'])]
	},
	{
		key: 'wpc',
		codes: ['E14', 'N06', 'S14', 'W07'],
		pcio: 'parliamentary_constituency',
		label: 'parliamentary constituency',
		plural: 'parliamentary constituencies',
		source: 'wpc'
	},
	{
		key: 'sener',
		codes: ['W10'],
		label: 'Senedd electoral region',
		plural: 'Senedd electoral regions',
		source: 'sener'
	},
	{
		key: 'senc',
		codes: ['W09'],
		label: 'Senedd constituency',
		plural: 'Senedd constituencies',
		source: 'senc'
	},
	{
		key: 'wd',
		codes: ['E05', 'W05'],
		pcio: 'admin_ward',
		label: 'ward',
		plural: 'wards',
		source: 'wd'
	},
	{
		key: 'par',
		codes: ['E04', 'W04'],
		pcio: 'parish',
		label: 'parish',
		plural: 'parishes',
		source: 'par'
	},
	{
		key: 'msoa',
		codes: ['E02', 'W02'],
		pcio: 'msoa',
		label: 'MSOA',
		plural: 'MSOAs',
		source: 'msoa'
	},
	{
		key: 'lsoa',
		codes: ['E01', 'W01'],
		pcio: 'lsoa',
		label: 'LSOA',
		plural: 'LSOAs',
		source: 'lsoa'
	},
	{
		key: 'oa',
		codes: ['E00', 'W00'],
		label: 'output area',
		plural: 'output areas',
		source: 'oa'
	}
];

export const mapSources = sources.map((s) => {
	return {
		...s,
		layers: geoTypes.filter((l) => l.source === s.id)
	};
});

export const geoCodesLookup = (() => {
	const lkp = {};
	for (const g of geoTypes) {
		for (const c of g.codes) {
			lkp[c] = { ...g };
			const geoName = geoNames[c];
			if (geoName?.childGroup) {
				lkp[c].label = geoName.label;
				lkp[c].plural = geoName.plural;
			}
		}
	}
	return lkp;
})();

export const geoTypesLookup = (() => {
	const lkp = {};
	for (const g of geoTypes) lkp[g.key] = g;
	return lkp;
})();

export const regionLookup = {
	E12000001: 'North East',
	E12000002: 'North West',
	E12000003: 'Yorkshire and The Humber',
	E12000004: 'East Midlands',
	E12000005: 'West Midlands',
	E12000006: 'East of England',
	E12000007: 'London',
	E12000008: 'South East',
	E12000009: 'South West',
	E92000001: 'England',
	N92000002: 'Northern Ireland',
	S92000003: 'Scotland',
	W92000004: 'Wales'
};

export const regionReverseLookup = (() => {
	const lkp: { [key: string]: string } = {};
	for (const key of Object.keys(regionLookup)) lkp[regionLookup[key]] = key;
	return lkp;
})();