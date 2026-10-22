export const initSearchEvents = (onSearch) => {
  const searchForm = document.querySelector("#search-form");
  if (!searchForm) return;

  const searchInput = searchForm.querySelector("#search-input");
  if (!searchInput) return;

  let timeoutId = null;

  // 1. Búsqueda en tiempo real mientras escribe
  searchInput.addEventListener("input", (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (onSearch) {
        onSearch(e.target.value.trim());
      }
    }, 2000);
  });

  // 2. Si presiona Enter, cancelamos la espera y buscamos de inmediato
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearTimeout(timeoutId);
    if (onSearch) {
      onSearch(searchInput.value.trim());
    }
  })
  
};