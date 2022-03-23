import axios from "axios";
import { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Home } from "../Components/Home/Home";
import { IAnimals } from "./IAnimals";
const AnimalService = {
  GetAnimals() {
    const [animalArray, setAnimalArray] = useState<IAnimals[]>([]);

    useEffect(() => {
      if (animalArray.length === 0) {
        axios
          .get<IAnimals[]>("https://animals.azurewebsites.net/api/animals")
          .then((response) => {
            setAnimalArray(response.data);
            console.log(response.data);
            localStorage.setItem("animal", JSON.stringify(response.data));

            // let animalsFromApi = response.data.map((animals: IAnimals) => {
            //   return animals;
            Home();
            return;
          });

        //   });
      }
    }, []);
  },
};

export default AnimalService;
