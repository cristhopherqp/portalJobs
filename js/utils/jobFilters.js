export const filterJobs = (jobs, selectedFilters) => {

  const selectedCategories = Object.keys(selectedFilters).filter(
    category => selectedFilters[category].size > 0
  )


  Object.entries(jobs).forEach(([key, job]) => {
    selectedCategories.forEach(category => {

      const techSet = [job[category]].flat(Infinity).map(elem => String(elem).toLowerCase().trim());
      const selectedValues = selectedFilters[category];

      if (techSet.some(elem => selectedValues.has(elem))){
        console.log(key)
      };
    })
  });
};

