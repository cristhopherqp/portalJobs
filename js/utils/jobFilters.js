export const filterJobs = (jobs, selectedFilters) => {
  const selectedCategories = [];
  Object.entries(selectedFilters).forEach(([key, value]) => {
    if (value.size > 0){
      selectedCategories.push(key)
    }
  });
  Object.entries(jobs).forEach(([key, job]) => {
    selectedCategories.forEach(category => {

      const techSet = [job[category]].flat(Infinity).map(elem => String(elem).toLowerCase().trim());
      const selectedValues = selectedFilters[category];

      if (techSet.some(elem => selectedValues.has(elem))){
        return key;
      };
    })
  });
};