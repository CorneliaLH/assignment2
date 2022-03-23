import { allowedNodeEnvironmentFlags } from "process";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimals } from "../../Models/IAnimals";
import { Animals } from "../Animals/Animals";
import "./ShowAnimal.css";

export function ShowAnimal() {
  const [animalArray2, setAnimalArray2] = useState<IAnimals[]>([]);
  const [animalId, setAnimalId] = useState(0);
  const [animal, setAnimal] = useState<IAnimals>();
  const [button, setButton] = useState(<></>);
  const [isFed, setIsFed] = useState("");
  let params = useParams();

  useEffect(() => {
    setAnimalId(Number(params.id));
  }, []);

  useEffect(() => {
    if (localStorage.length > 0) {
      console.log("hejhå");
      let arrayFromLS = JSON.parse(localStorage.getItem("animal") || "[]");
      setAnimalArray2(arrayFromLS);
    }
  }, [animalId]);
  useEffect(() => {
    for (let i = 0; i < animalArray2.length; i++) {
      if (animalArray2[i].id === animalId) {
        let animalItem = animalArray2[i];
        setAnimal(animalItem);
      }
    }
  }, [animalArray2]);

  useEffect(() => {
    if (animal?.isFed === false) {
      setButton(
        <button
          onClick={() => {
            feedAnimal();
          }}
        >
          Mata {animal?.name}
        </button>
      );
    } else {
      setButton(<button disabled={true}>Mata {animal?.name} 2</button>);
    }
  }, [animalArray2, animal?.isFed]);

  function feedAnimal() {
    if (animal != undefined) {
      animal.isFed = true;
      console.log(animal.isFed);
      if (animal?.isFed === true) {
        setButton(<button disabled={true}>Mata {animal?.name} 2</button>);
        animal.lastFed = new Date();
        let stringArrayLs: string = localStorage.getItem("animal") || "[]";
        let animalLSArray = JSON.parse(stringArrayLs);
        let index = animalLSArray.findIndex(
          (animalLS: IAnimals) => animalLS.id === animal.id
        );
        console.log(index);
        animalLSArray.splice(index, 1);
        animalLSArray.push({
          id: animal.id,
          name: animal.name,
          latinName: animal.latinName,
          yearOfBirth: animal.yearOfBirth,
          shortDescription: animal.shortDescription,
          longDescription: animal.longDescription,
          imageUrl: animal.imageUrl,
          medicine: animal.medicine,
          isFed: true,
          lastFed: animal.lastFed,
        });
        localStorage.setItem("animal", JSON.stringify(animalLSArray));

        setIsFed(animal.lastFed.toString());
      }
    }
  }

  return (
    <>
      <section className="showAnimalSection">
        <article>
          <ul>
            <li>{animal?.name}</li>
            <li>
              {isFed
                ? animal?.name + " är mätt!"
                : animal?.name + " är hungrig!"}
            </li>
            <li>Född: {animal?.yearOfBirth}</li>
            <li>Information om arten: {animal?.longDescription}</li>
          </ul>
          <img src={animal?.imageUrl} alt={animal?.name} />
          {button}
          <p>Senast matad: {animal?.lastFed}</p>
        </article>
      </section>
    </>
  );
}
