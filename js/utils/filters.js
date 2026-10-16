export const extractFilters = (jobs, categories) => { 

  const filterEntries = categories.map(key => {
  
    const rawValues = jobs.flatMap(job => job[key]);

    const uniqueValues = [...new Set(rawValues.filter(Boolean))]
    
    return [key, uniqueValues];
    
  });
  return Object.fromEntries(filterEntries);
};