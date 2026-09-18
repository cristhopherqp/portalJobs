export const filterJobs = (jobs, selectedFilters) => {


  jobs.forEach(elem => {
    
    Object.entries(selectedFilters).forEach(([key, value]) => {

      const item = elem[key] === value;
      if(item){
        // console.log(elem)
      }


    })
  })

  // Object.entries(selectedFilters).forEach(([key, value]) => {
    
  //   jobs.forEach(elem => {
  //     console.log(elem)

  //   })
  // })

  
};






