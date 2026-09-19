const closeAllMenus = () => {
  document.querySelectorAll(".dropdown-menu.show").forEach(el => el.classList.remove("show"));
};

export const initDropdownEvents = () => {
  document.addEventListener("click", (e) => {
    const item = e.target.closest(".dropdown-menu");
    const toggleBtn = e.target.closest(".dropdown-btn");

    if (item) return;

    if (toggleBtn) {
      const menu = toggleBtn.closest(".dropdown").querySelector(".dropdown-menu");
      const wasOpen = menu.classList.contains("show");
      closeAllMenus();
      if (!wasOpen) menu.classList.add("show");
      return;
    }
    
    closeAllMenus();
  });
};

export const initFilterChangeEvents = (onFilterChange) => {
  document.addEventListener("change", (e) => {
    if (!e.target.matches(".dropdown-checkbox")) return;

    const category = e.target.name;
    const value = e.target.value;
    const isChecked = e.target.checked;

    if(onFilterChange){
      onFilterChange(category, value, isChecked)
    }
    
  });
};

  // const dropdown = item.closest(".dropdown");
  // const category = dropdown.querySelector(".dropdown-menu").dataset.filter;
  // const selectedValue = item.textContent.trim();

  // console.log(item);

  // if (onSelect) {
  //   onSelect(category, selectedValue);
  // }
