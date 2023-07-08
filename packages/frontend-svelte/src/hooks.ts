// FIXME: This is a potential hack to get proofs to generate on the front end
export async function handle({ event, resolve }) {
	return resolve(event, { ssr: false });
}
