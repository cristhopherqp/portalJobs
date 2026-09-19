import { fetchJobs } from "./api/jobsApi.js";
import { extractFilters } from "./utils/filters.js"
import { filterJobs } from "./utils/jobFilters.js";
import { renderFilters, renderFiltersError } from "./ui/filterView.js";
import { initDropdownEvents, selectedElements } from "./ui/dropdown.js";

const FILTER_CATEGORIES = ["technology", "location", "contract", "level"];

const activeFilters = {
  technology: new Set(),
  location: new Set(),
  contract: new Set(),
  level: new Set()
};

let allJobs = [];

const init = async () => {

  selectedElements((cat, value, isChecked) => {
    
    isChecked ? activeFilters[cat].add(value) : activeFilters[cat].delete(value);

  });
  
  initDropdownEvents();
  

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