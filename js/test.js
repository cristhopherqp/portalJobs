const array  = ["value1", "value2", ["value3", null, "value 5"], "value5"];


array.forEach(element => {

  let value;

  if (Array.isArray(element)){

    value = element.reduce(element => {
      
      if (element){
        return element
      }
    
    })

    console.log(value);
    return;
  };

  value = element;

  console.log(value)

})

