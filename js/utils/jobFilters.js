const STOP_WORDS = new Set(["de", "en", "con", "y", "o", "a", "el", "la", "los", "las", "un", "una", "por", "para"]);

const cleanText = (text) => {
  if (typeof text !== "string") return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const tokenizeQuery = (query) => {
  if (typeof query !== "string") return [];
  return cleanText(query)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0 && !STOP_WORDS.has(token));
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

const applyFilters = (jobs, filters) => {
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

const applySearchText = (filteredJobs, currentSearchText) => {
  if (!currentSearchText) return filteredJobs;

  const tokens = tokenizeQuery(currentSearchText);

  if (tokens.length === 0) return filteredJobs;

  return filteredJobs.filter(job => {
    const jobContent = [
      job.title,
      job.company,
      job.description,
      job.location,
      job.contract,
      job.level,
      Array.isArray(job.technology) ? job.technology.join(" ") : job.technology
    ]
      .filter(Boolean)
      .join(" ");

    const normalizedContent = cleanText(jobContent);

    return tokens.every(token => normalizedContent.includes(token));
  });
};

export const filterJobs = (jobs, filters, currentSearchText) => {
  const filteredJobs = applyFilters(jobs, filters);
  const result = applySearchText(filteredJobs, currentSearchText);
  return result;
};

