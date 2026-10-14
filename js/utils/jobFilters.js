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

      const rawValue = job[category];

      if (rawValue == null) return false;

      const selectedValues = filters[category];
      console.log(selectedValues);

      // console.log(selectedValues);

      // category.some(elem => selectedValues.has(elem));


    });
  });
};

