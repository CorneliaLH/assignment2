import { useEffect, useState } from "react";
import AnimalService from "../../Models/AnimalsService";
import { IAnimals } from "../../Models/IAnimals";
import { Animal } from "../Animal/Animal";
import "./Home.css";

export function Home() {
  const services = new AnimalService();
  const [animalArray, setAnimalArray] = useState<IAnimals[]>([]);
  const [localStorageLength, setLocalStorageLength] = useState(0);
  const [isFed, setIsFed] = useState(false);

  if (localStorage.length === 0) {
    services.GetAnimals();
    setTimeout(() => {
      setLocalStorageLength(localStorage.length);
    }, 1000);
  }

  useEffect(() => {
    let arrayStringLS = localStorage.getItem("animal") || "[]";

    let arrayFromLS = JSON.parse(arrayStringLS);
    setIsFed(false);
    callFuction(arrayFromLS);
  }, [localStorageLength, isFed]);

  function callFuction(arrayFromLS: IAnimals[]) {
    setAnimalArray(arrayFromLS);
  }

  window.addEventListener("storage", () => {
    setIsFed(true);
  });

  return (
    <>
      <section className="animalContent">
        <article>
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
        </article>
        <aside>
          <h2>Hungriga djur som behöver matas:</h2>
          <ul className="hungryAnimals">
            {animalArray.map((animalFed) => {
              if (!animalFed.isFed) {
                return <li key={animalFed.id}> {animalFed.name}</li>;
              }
            })}
          </ul>
          <h2>Mätta djur!!</h2>
          <ul className="fedAnimals">
            {animalArray.map((animalFed) => {
              if (animalFed.isFed) {
                return <li key={animalFed.id}> {animalFed.name}</li>;
              }
            })}
          </ul>
        </aside>
      </section>
    </>
  );
}
