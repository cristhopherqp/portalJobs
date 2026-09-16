const newArray = ["Minjeong", "Winter", "Kim", "Roy"]; 

const saludar = (data) => {
  data.forEach(elem => {
    console.log(`Hola ${elem}`)
  })
};

const decirHola = (callback) => {
  console.log("Esta es la primera función: ");
  callback(newArray);
}

decirHola(saludar);