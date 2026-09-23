export const filterJobs = (jobs, selectedFilters) => {

  const selectedCategories = Object.keys(selectedFilters).filter(
    category => selectedFilters[category].size > 0
  )

  if (selectedCategories.length === 0) return jobs;

  return jobs.filter(job => {

    return selectedCategories.every(category => {

      const rawValue = job[category] ;
      if (rawValue == null) return false;

      const categoryData = [rawValue]
        .flat(Infinity)
        .map(elem => String(elem).toLowerCase().trim())
        .filter(Boolean);

      const selectedValues = selectedFilters[category];
  
      // Salvaguarda: si se iteran categorías sin filtros activos, retorna true para evitar que .every() descarte el trabajo por no tener qué comparar.
      // if (!selectedValues || selectedValues.size === 0) return true;

      return categoryData.some(elem => selectedValues.has(elem))
    })
  });
};

