export const extractFilters = (jobs, categories) => { 

  const filterEntries = categories.map(key => {
  
    const rawValues = jobs.flatMap(job => job[key]);

    const uniqueValues = [...new Set(rawValues.filter(Boolean))]
    // const uniqueMap = new Map();

    // rawValues.forEach(elem => {
    //   //Descarta valores falsy (null, undefined, false, 0, "")
    //   if (!elem) return;
      
    //   if (elem && !uniqueMap.has(elem)) {
    //     const formattedLabel = elem.replace(
    //       /(?:^|[\s-])\p{L}/gu, 
    //       char => char.toUpperCase()
    //     );
        
    //     uniqueMap.set(elem, formattedLabel);
    //   }
    // });
    
    // const result = Array.from(uniqueMap.values());
    
    return [key, uniqueValues];
    
  });
  return Object.fromEntries(filterEntries);
};