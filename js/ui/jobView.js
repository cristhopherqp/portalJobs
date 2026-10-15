const createJobCard = (job) => {

  const template = document.getElementById("job-card-template");
  const jobCard = template.content.cloneNode(true);
  const datasetValues = jobCard.querySelectorAll("[data-field]");

  datasetValues.forEach(element => {
    const fieldName = element.dataset.field;
    
    if (job[fieldName]){
      element.textContent = job[fieldName];
    }
  });

  return jobCard;
};

export const renderJobs = (jobs) => {

  

  const jobsContainer = document.querySelector(".job-list")
  if (!jobsContainer) return;

  const fragment = document.createDocumentFragment();

  jobs.forEach(job => {
    fragment.appendChild(createJobCard(job));
  });

  jobsContainer.replaceChildren(fragment);
};
