import { fetchJobs } from "./api/jobsApi.js";
import { extractFilters } from "./utils/filters.js"
import { filterJobs } from "./utils/jobFilters.js";
import { renderFilters, renderFiltersError, updateFilterButtonLabel } from "./ui/filterView.js";
import { initDropdownEvents, initFilterChangeEvents } from "./ui/dropdown.js";
import { renderJobs } from "./ui/jobView.js"

const FILTER_CATEGORIES = ["company", "technology", "location", "contract", "level"];

const activeFilters = {
  company: new Set(),
  technology: new Set(),
  location: new Set(),
  contract: new Set(),
  level: new Set()
};

let allJobs = [];

const applyAndRender = () => {
  const visibleJobs = filterJobs(allJobs, activeFilters);
  renderJobs(visibleJobs);
};

const init = async () => {

  initDropdownEvents();

  //Podriamos cambiar el evento change por un pa  trón observer.
  initFilterChangeEvents((category, value, isChecked) => {
    const categorySet = activeFilters[category];
    if(!categorySet) return;

    const action = isChecked ? "add" : "delete";
    categorySet[action](value.toLowerCase());
    
    updateFilterButtonLabel(category, categorySet.size);

    applyAndRender();
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