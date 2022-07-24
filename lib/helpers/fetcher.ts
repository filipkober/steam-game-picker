const fetchData = async (url: string, options: Object = {}) => {
const res = await fetch(url, options);
if(!res.ok) {
throw new Error(`Could not fetch ${url}, received ${res.status}`);
}else{
return await res.json();
}
}

export default fetchData;