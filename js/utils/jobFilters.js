const getActiveCategories = (filters) => {
  if (!filters || typeof filters !== "object" || Array.isArray(filters)){
    console.warn(
      `[getActiveCategories]: Param 'filters' is undefined or invalid. Defaulting to an empty list.`, {filters}
    );
    return [];
  }

  const activeCategories = [];

  for (const [category, filterSet] of Object.entries(filters)){
    if (filterSet?.size > 0){
      activeCategories.push(category);
    }
  }

  return activeCategories;
};

export const filterJobs = (jobs, filters) => {
  if (!Array.isArray(jobs)) return [];

  const activeCategories = getActiveCategories(filters);

  if (activeCategories.length === 0) return jobs;

  return jobs.filter(job => {

    return activeCategories.every(category => {
      
      const jobValue = job[category];
      const categoryValue = filters[category];

      if (!jobValue) return false;

      if(Array.isArray(jobValue)){
        return jobValue.some(value => categoryValue.has(value))
      }
      
      return categoryValue.has(jobValue);
    });

  });
};


