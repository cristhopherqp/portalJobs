import { fetchJobs } from "./api/jobsApi.js";
import { extractFilters } from "./utils/filters.js"
import { filterJobs } from "./utils/jobFilters.js";
import { renderFilters, renderFiltersError, updateFilterButtonLabel } from "./ui/filterView.js";
import { initDropdownEvents, initFilterChangeEvents } from "./ui/dropdown.js";

const FILTER_CATEGORIES = ["company", "technology", "location", "contract", "level"];

const activeFilters = {
  company: new Set(),
  technology: new Set(),
  location: new Set(),
  contract: new Set(),
  level: new Set()
};

let allJobs = [];

const init = async () => {

  initDropdownEvents();

  initFilterChangeEvents((cat, value, isChecked) => {
    const categorySet = activeFilters[cat];
    if(!categorySet) return;

    const action = isChecked ? "add" : "delete";
    categorySet[action](value);

    updateFilterButtonLabel(activeFilters);
  });
  

  
  try {
    allJobs = await fetchJobs();
    const filters = extractFilters(allJobs, FILTER_CATEGORIES);
    renderFilters(filters);
  } catch (error) {
    console.error("Error al iniciar filtros", error);
    renderFiltersError();
  }
};

init();