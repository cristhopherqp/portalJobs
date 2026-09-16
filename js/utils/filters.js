export const extractFilters = (jobs, categories) => { 
  
  const filterEntries = categories.map(key => {
  
    const rawValues = jobs.flatMap(job => job[key]);
    
    //v3
    const uniqueMap = new Map();

    rawValues.forEach(elem => {
      //Descarta valores falsy (null, undefined, false, 0, "")
      if (!elem) return;

      const canonicalKey = String(elem).toLowerCase().trim();

      // 3. Formateo bajo demanda: solo si es un valor nuevo
      if (canonicalKey && !uniqueMap.has(canonicalKey)) {
        const formattedLabel = canonicalKey.replace(
          /(?:^|[\s-])\p{L}/gu, 
          char => char.toUpperCase()
        );
        
        uniqueMap.set(canonicalKey, formattedLabel);
      }
    });
    
    const result = Array.from(uniqueMap.values());

    return [key, result];
    
    //v2
    // const cleanValues = rawValues
    // .map(val => (typeof val === "string" ? val.trim() : val))
    // .filter(Boolean);
    
    // return [key, [...new Set(cleanValues)]];

    //v1
    // return [elem, [...new Set(((data.flatMap(dato => dato[elem])).map(elem => elem.trim())).filter(Boolean))]];
    
  });
  return Object.fromEntries(filterEntries);
};