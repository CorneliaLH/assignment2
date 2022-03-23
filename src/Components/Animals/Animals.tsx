import { useEffect, useState } from "react";
import AnimalService from "../../Models/AnimalsService";
import { IAnimals } from "../../Models/IAnimals";
import { Animal } from "../Animal/Animal";
import "./Animals.css";

export function Animals() {
  // const [animalArray, setAnimalArray] = useState<IAnimals[]>([]);

  // if (localStorage.length === 0) {
  //   AnimalService.GetAnimals();
  // }

  // useEffect(() => {
  //   if (animalArray.length === 0) {
  //     console.log("hejhå");
  //     setAnimalArray(JSON.parse(localStorage.getItem("animal") || "[]"));
  //   }
  // }, []);
  // console.log(animalArray);

  return (
    <>
      {/* <div className="animalContent">
        {animalArray.map((animals) => {
          return (
            <Animal
              name={animals.name}
              latinName={animals.latinName}
              yearOfBirth={animals.yearOfBirth}
              shortDescription={animals.shortDescription}
              imageUrl={animals.imageUrl}
              id={animals.id}
              longDescription={animals.longDescription}
              medicine={animals.medicine}
              isFed={animals.isFed}
              lastFed={animals.lastFed}
            ></Animal>
          );
        })}
      </div> */}
    </>
  );
}
