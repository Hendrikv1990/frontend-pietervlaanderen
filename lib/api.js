import NProgress from 'nprogress';
import axios from 'axios';

axios.defaults.headers.common["Authorization"] = process.env.BACKEND_SECRET_API_TOKEN;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = 'application/json';

export function postForm(formData) {
	return new Promise((resolve, reject) => {
		NProgress.start();
		axios.post(process.env.FORM_APN, formData).then(({data}) => {
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