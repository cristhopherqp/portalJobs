const closeAllMenus = () => {
  document.querySelectorAll(".dropdown-menu.show").forEach(el => el.classList.remove("show"));
};

export const initDropdownEvents = (onSelect) => {
  document.addEventListener("click", e => {
    const item = e.target.closest(".dropdown-item");
    const toggleBtn = e.target.closest(".dropdown-btn");
  
    if (item) {
      const dropdown = item.closest(".dropdown");
      const spanText = dropdown.querySelector("span");
      const defaultLabel = dropdown.querySelector(".dropdown-btn").dataset.default;
      const isReset = item.textContent.trim() === "Todos";
      spanText.textContent = isReset ? defaultLabel : item.textContent;
      
      const category = dropdown.querySelector(".dropdown-menu").dataset.filter;
      const selectedValue = isReset ? null : item.textContent.trim();

      if (onSelect) {
        onSelect(category, selectedValue);
      }

      closeAllMenus();
      return;

      // if(item.textContent === "Todos"){
      //   spanText.textContent = test;
      //   closeAllMenus();
      //   return;
      // }

      // spanText.textContent = item.textContent;
      // closeAllMenus();
      // return;
    };

    if (toggleBtn) {
      const menu = toggleBtn.closest(".dropdown").querySelector(".dropdown-menu");
      const wasOpen = menu.classList.contains("show");
      closeAllMenus();
      if (!wasOpen) menu.classList.add("show");
      return;
    };

    closeAllMenus();
  });
};