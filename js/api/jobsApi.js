import { normalizeVariousJobs } from "./jobAdapter.js";

export const fetchJobs = async () => {
  const response = await fetch("./data/buscar.json");

  if(!response.ok){
    throw new Error(`Error HTTP: ${response.status}`)
  }

  const rawJobs = await response.json();

  return normalizeVariousJobs(rawJobs);
};



