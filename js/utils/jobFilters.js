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



// const extractCategories = (selectedCategories) => {
//   const result = [];
//   for (const [key, value] of Object.entries(selectedCategories)){
//     if (value.size > 0 ){
//       result.push(key);
//     }
//   }
//   return result;
// };





export const filterJobs = () => {

};














// export const filterJobs = (jobs, selectedFilters) => {

//   const selectedCategories = Object.keys(selectedFilters).filter(
//     category => selectedFilters[category].size > 0
//   )

//   if (selectedCategories.length === 0) return jobs;

//   return jobs.filter(job => {

//     return selectedCategories.every(category => {

//       const rawValue = job[category] ;
//       if (rawValue == null) return false;

//       const categoryData = [rawValue]
//         .flat(Infinity)
//         .map(elem => String(elem).toLowerCase().trim())
//         .filter(Boolean);

//       const selectedValues = selectedFilters[category];
  
//       // Salvaguarda: si se iteran categorías sin filtros activos, retorna true para evitar que .every() descarte el trabajo por no tener qué comparar.
//       // if (!selectedValues || selectedValues.size === 0) return true;

//       return categoryData.some(elem => selectedValues.has(elem))
//     })
//   });
// };



