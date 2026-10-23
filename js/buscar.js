import { fetchJobs } from "./api/jobsApi.js";
import { extractFilters } from "./utils/filters.js"
import { filterJobs, getActiveCategories } from "./utils/jobFilters.js";
import { renderFilters, renderFiltersError, updateFilterButtonLabel } from "./ui/filterView.js";
import { initDropdownEvents, listenFilterChanges } from "./ui/dropdown.js";
import { renderJobs, updateResultCounter } from "./ui/jobView.js";
import { initSearchEvents } from "./ui/searchView.js";


const FILTER_CATEGORIES = ["company", "technology", "location", "contract", "level"];

const activeFilters = {
  company: new Set(),
  technology: new Set(),
  location: new Set(),
  contract: new Set(),
  level: new Set()
};

let allJobs = [];
let currentSearchText = "";

const applyAndRender = () => {
  const visibleJobs = filterJobs(allJobs, activeFilters, currentSearchText);

  let jobsCount = visibleJobs.length;
  console.log(jobsCount);
  
  //const hasActiveFilters = Object.values(activeFilters).some(set => set.size > 0);
  
  if (getActiveCategories(activeFilters).length === 0 && currentSearchText === ""){
    jobsCount = null;
  };
  
  updateResultCounter(jobsCount);

  renderJobs(visibleJobs);
};

const init = async () => {

  initDropdownEvents();
  
  //Podriamos cambiar el evento change por un patrón observer.
  listenFilterChanges((category, value, isChecked) => {
    const categorySet = activeFilters[category];
    
    if(!categorySet) return;
    
    const action = isChecked ? "add" : "delete";
    //add data in activeFilters
    categorySet[action](value);
    
    updateFilterButtonLabel(category, categorySet.size);

    applyAndRender();
  });

  initSearchEvents((searchText) => {
    currentSearchText = searchText;
    applyAndRender();
  });

  try {
    allJobs = await fetchJobs();
    const filters = extractFilters(allJobs, FILTER_CATEGORIES);
    renderFilters(filters);
    applyAndRender();
  } catch (error) {
    console.error("Error al iniciar filtros", error);
    renderFiltersError();
  }
};

init();