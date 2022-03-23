// import AnimalService from "../../Models/AnimalsService";

// export function Home() {
//   AnimalService.GetAnimals();
//   return (
//     <>
//       <div>home</div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import AnimalService from "../../Models/AnimalsService";
import { IAnimals } from "../../Models/IAnimals";
import { Animal } from "../Animal/Animal";
import "./Home.css";

export function Home() {
  const [animalArray, setAnimalArray] = useState<IAnimals[]>([]);
  let getData = false;

  if (localStorage.length === 0) {
    AnimalService.GetAnimals();
    getData = true;
  }

  useEffect(() => {
    if (animalArray.length === 0) {
      setAnimalArray(JSON.parse(localStorage.getItem("animal") || "[]"));
      getData = false;
    }
  }, [getData]);

  return (
    <>
      <div className="animalContent">
        {animalArray.map((animals) => {
          return (
            <Animal
              key={animals.id}
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
      </div>
    </>
  );
}
