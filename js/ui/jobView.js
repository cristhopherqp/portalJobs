
export const createJobCard = (job) => {

  const container = document.getElementsByClassName(".job-list");
  const template = document.getElementById("job-card-template");

  const jobCard = template.content.cloneNode(true);


  const datasetValues = jobCard.querySelectorAll("[data-field]");

  datasetValues.forEach(element => {
    
    const fieldName = element.dataset.field;

    // let valueData = job[fieldName] ? ;

    if(job[fieldName]){
      console.log(job[fieldName]);

      job[fieldName]

    };


    // console.log(fieldName);
    // console.log(job[fieldName]);

    //VALORES EN LA LISTA DE DATOS
    //comprobar
    //normalizar
    //aseguramos
    //asignamos

  });

  

};
