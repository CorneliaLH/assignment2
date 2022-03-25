import { useEffect, useState } from "react";
import AnimalService from "../../Models/AnimalsService";
import { IAnimals } from "../../Models/IAnimals";
import { Animal } from "../Animal/Animal";
import "./Home.css";

export function Home() {
  const services = new AnimalService();
  const [animalArray, setAnimalArray] = useState<IAnimals[]>([]);
  const [isFed, setIsFed] = useState(false);
  const [hungry, setHungry] = useState(false);

  //hämtar från api
  useEffect(() => {
    if (localStorage.length === 0) {
      services.getAnimals();
    }
  }, []);
  //läser in från localstorage
  useEffect(() => {
    let arrayStringLS = localStorage.getItem("animal") || "[]";
    let arrayFromLS = JSON.parse(arrayStringLS);
    setAnimalArray(arrayFromLS);
    setIsFed(true);
  }, [isFed, hungry]);

  // lyssnar efter event när localStorage uppdaterats.
  let eventListenerLocalStorage: any = window.addEventListener(
    "storage",
    () => {
      setIsFed(false);
    }
  );
  //lyssnar efter när djur blir jättahungrigt
  window.addEventListener("hungry", () => {
    if (hungry === false) {
      setHungry(true);
    } else {
      setHungry(false);
    }
  });

  //ta bort violation meddelande
  Promise.resolve().then(eventListenerLocalStorage);

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
          <h2>Vrålhungriga djur som behöver matas:</h2>
          <ul className="hungryAnimals">
            {animalArray.map((animalFed) => {
              if (!animalFed.isFed) {
                if (
                  new Date(animalFed.lastFed).setSeconds(
                    new Date(animalFed.lastFed).getSeconds() + 14400
                  ) -
                    new Date().getTime() <
                  0
                ) {
                  return <li key={animalFed.id}> {animalFed.name}</li>;
                }
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
