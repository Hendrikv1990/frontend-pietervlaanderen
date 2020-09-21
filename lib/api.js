import NProgress from 'nprogress';
import axios from 'axios';

export function postForm(formData) {
	return new Promise((resolve, reject) => {
		NProgress.start();
		axios.post(process.env.FORM_APN, {
				headers: {
					'Content-Type': 'application/json',
						'Authorization': process.env.BACKEND_SECRET_API_TOKEN
				}
			},
			formData)
			.then(({data}) => {
				NProgress.done();
				resolve(data);
			})
			.catch(({response}) => {
				NProgress.done();

				reject({
					errors: response?.data?.errors || {}
				});
			});
	});
}