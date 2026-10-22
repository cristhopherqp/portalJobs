export const initSearchEvents = (onSearch) => {
  const searchForm = document.querySelector("#search-form");
  if (!searchForm) return;

  const searchInput = searchForm.querySelector("#search-input");
  if (!searchInput) return;

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(searchInput.value.trim());
    }

  })
  
};