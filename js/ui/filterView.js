export const renderFilters = (filters) => {
  Object.entries(filters).forEach(([key, values]) => {
    const menuList = document.querySelector(`[data-filter="${key}"]`);
    
    if (!menuList) {
      console.warn(`Container not found for category: ${key}`);
      return;
    }
    
    const fragment = document.createDocumentFragment();

    const options = ["Todos",...values]

    options.forEach(value => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      
      button.type = "button";
      button.className = "dropdown-item";
      button.textContent = value;

      li.appendChild(button);
      fragment.appendChild(li);
    });
    
    menuList.replaceChildren(fragment);
  });
};

export const renderFiltersError = () => {
  document.querySelectorAll(".dropdown").forEach(dropdown => {  
    const btn = dropdown.querySelector(".dropdown-btn");
    const textSpan = dropdown.querySelector("span");

    if (textSpan) textSpan.textContent = "No disponible";
    if (btn) btn.disabled = true;
  });
};

