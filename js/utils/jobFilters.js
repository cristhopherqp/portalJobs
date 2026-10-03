const normalizeValues = (values) => {
  if (values == null){
    console.warn(
      `[normalizeValues]: Param 'values' is null or invalid.`, {values}
    );
    return [];
  }

  const result = [];

  for (const elem of [values].flat(Infinity)){
    if (!elem) continue;

    const cleaned = String(elem).trim().toLowerCase();
    if(cleaned){
      result.push(cleaned);
    };
  };
  return result
};

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

      const categoryData = normalizeValues(rawValue);
      const selectedValues = filters[category];

      return categoryData.some(elem => selectedValues.has(elem));
    });
  });
};

