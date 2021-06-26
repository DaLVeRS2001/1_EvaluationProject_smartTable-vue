export const fetchData = async (url) => {
  const request = await fetch(url);
  return await request.json();
};
