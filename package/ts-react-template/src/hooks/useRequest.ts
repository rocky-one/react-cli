import { useEffect, useState } from 'react';
import { cancelTokenMap } from '../services';

const useRequest = (request: any, params: any, dependencies = []) => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		request(params).then((res: any) => {
			setData(res);
		}).finally(() => {
			setLoading(false);
		});
		return () => {
			if (cancelTokenMap[request.url]) {
				cancelTokenMap[request.url]();
			}
		};
	}, dependencies);

	return {
		data,
		loading,
	};
};
export default useRequest;
