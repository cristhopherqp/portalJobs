import { fetchJobs } from "./api/jobsApi.js";
import { extractFilters } from "./utils/filters.js"
import { filterJobs } from "./utils/jobFilters.js";
import { renderFilters, renderFiltersError } from "./ui/filterView.js";
import { initDropdownEvents } from "./ui/dropdown.js";

const FILTER_CATEGORIES = ["technology", "location", "contract", "level"];

export const activeFilters = {
  technology: null,
  location: null,
  contract: null,
  level: null
};

let allJobs = [];

const init = async () => {

  initDropdownEvents((category, value) => {
    activeFilters[category] = value;

    const filteredJobs = filterJobs(allJobs, activeFilters);
    //console.log("Resultados filtrados:", filteredJobs);
    console.log("Filtros actuales:", activeFilters);
    console.log("Total de empleos disponibles para filtrar:", allJobs.length);
    console.log("\n\n\n\n __________")
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

