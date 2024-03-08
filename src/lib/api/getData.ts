import { base } from '$app/paths';

type GetDataResult = { kind: 'Success'; chartData: JSON; metadata: JSON } | { kind: 'Failure' };

function reshapeData(colData) {
	const cols = Object.keys(colData).filter((d) => d !== 'id' && d !== 'code');
	const rowData = [];
	for (let i = 0; i < colData[cols[0]].length; i++) {
		const row: { [key: string]: string | number } = {};
		// id and code are the same for all objects, so they're not stored as arrays in the JSON file.
		row.id = colData.id;
		for (const col of cols) {
			row[col] = colData[col][i];
		}
		rowData.push(row);
	}
	return rowData;
}

export const getData = async (fetch: typeof window.fetch): Promise<GetDataResult> => {
	const dataResult = await fetch(`${base}/insights/column-oriented-data.json`);
	const metadataResult = await fetch(`${base}/insights/config.json`);

	if (dataResult && metadataResult) {
		const dataParsed = await dataResult.json();
		const metadataParsed = await metadataResult.json();

		const reshapedData = {};
		for (const code in dataParsed.combinedDataObjectColumnOriented) {
			reshapedData[code] = reshapeData(dataParsed.combinedDataObjectColumnOriented[code]);
		}

		const clusterData = reshapeData(metadataParsed.clustersLookup.data);

		return {
			kind: 'Success',
			chartData: {
				combinedDataObject: reshapedData,
				beeswarmKeyData: dataParsed.beeswarmKeyData,
				clusterData
			},
			metadata: metadataParsed
		};
	} else {
		return { kind: 'Failure' };
	}
};
