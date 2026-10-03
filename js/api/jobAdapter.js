// 1. Parameterized Base Sanitizer
const sanitizeString = (value, toLower = false) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;

  return toLower ? trimmed.toLocaleLowerCase() : trimmed;
};

// 2. Specialized Resolvers
// Categorical fields for filters: always lowercase (toLower = true)
const resolveCategoricalField = (value) => {
  const clean = (val) => sanitizeString(val, true);

  if (Array.isArray(value)) {
    const validValues = value
      .map(clean)
      .filter((item) => item !== null);

    return validValues.length === 1 ? validValues[0] : '';
  }

  return clean(value) ?? '';
};

// Technologies: flat array, no duplicates, always lowercase (toLower = true)
const resolveTechnologyField = (value) => {
  const rawList = typeof value === 'string' ? [value] : value;
  if (!Array.isArray(rawList)) return [];

  const sanitized = rawList
    .flat(Infinity)
    .map((item) => sanitizeString(item, true))
    .filter((item) => item !== null);

  return [...new Set(sanitized)];
};


// 3. Adapter (normalizeJob)
const normalizeJob = (rawJob, logger = console.warn) => {
  
  if (!rawJob || typeof rawJob !== 'object' || Array.isArray(rawJob)) {
    logger('[ACL] Record discarded: invalid payload structure', { rawJob });
    return null;
  }

  const rawId = typeof rawJob.id === 'number' ? String(rawJob.id) : rawJob.id;
  const id = sanitizeString(rawId);
  const title = sanitizeString(rawJob.title);

  if (!id || !title) {
    logger('[ACL] Record discarded: missing or invalid critical fields (id or title)', {
      id: rawJob.id,
      title: rawJob.title,
    });
    return null;
  }

  return {
    id,
    title,

    company: sanitizeString(rawJob.company) ?? '',
    description: sanitizeString(rawJob.description) ?? '',

    technology: resolveTechnologyField(rawJob.technology),
    location: resolveCategoricalField(rawJob.location),
    contract: resolveCategoricalField(rawJob.contract),
    level: resolveCategoricalField(rawJob.level),
  };
};

export const normalizeVariousJobs = (jobs, logger = console.warn) => {
  if (!Array.isArray(jobs)) {
    logger('[ACL] Batch discarded: input is not an array', { received: typeof jobs });
    return [];
  }

  const validJobs = [];
  let discardedCount = 0;

  for (const rawJob of jobs) {
    const normalized = normalizeJob(rawJob, logger);
    if (normalized) {
      validJobs.push(normalized);
    } else {
      discardedCount++;
    }
  }

  if (discardedCount > 0) {
    logger(`[ACL] Batch processed with warnings: ${discardedCount} of ${jobs.length} records were discarded.`);
  }

  return validJobs;
};