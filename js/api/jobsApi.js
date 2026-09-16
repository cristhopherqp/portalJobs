export const fetchJobs = async () => {
  const response = await fetch("../data/buscar.json")
  if(!response.ok){
    throw new Error(`Error HTTP: ${response.status}`)
  }
  return await response.json();
};