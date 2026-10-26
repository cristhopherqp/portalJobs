const createJobCard = (job) => {

  const template = document.getElementById("job-card-template");
  const jobCard = template.content.cloneNode(true);
  const datasetValues = jobCard.querySelectorAll("[data-field]");

  datasetValues.forEach(element => {

    const fieldName = element.dataset.field;
    element.textContent = job[fieldName] || "";
  });

  return jobCard;
};

const createEmptyState = () => {

  const title = Object.assign(document.createElement("h3"), {
    className: "empty-state-title",
    textContent: "No obtuvimos resultados"
  });

  return title;
};

export const updateResultCounter = (jobsCount, isFiltering) => {

  const resultsCounter = document.querySelector("#results-counter");
  const resultsCount = resultsCounter?.querySelector("#results-count");

  if (!resultsCounter || !resultsCount) return;

  if (!isFiltering){
    resultsCounter.hidden = true;
    return;
  }

  resultsCounter.hidden = false;
  resultsCount.textContent = jobsCount

};

export const renderJobs = (jobs) => {

  const jobsContainer = document.querySelector(".job-list")
  if (!jobsContainer) return;

  
  if (jobs.length === 0) {
    jobsContainer.replaceChildren(createEmptyState());
    return;
  }

  const fragment = document.createDocumentFragment();

  jobs.forEach(job => {
    fragment.appendChild(createJobCard(job));
  });

  jobsContainer.replaceChildren(fragment);
};
