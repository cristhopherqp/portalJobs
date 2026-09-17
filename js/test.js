const activeFilters = {
  technology: new Set(),
  location: new Set(),
  contract: new Set(),
  level: new Set()
};

activeFilters.contract.add("Kim Minjeong");

console.log(activeFilters)