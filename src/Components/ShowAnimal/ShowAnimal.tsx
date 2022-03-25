import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import { clearInterval } from "timers";
import { IAnimals } from "../../Models/IAnimals";

import "./ShowAnimal.css";

export function ShowAnimal() {
  const [animalArray2, setAnimalArray2] = useState<IAnimals[]>([]);
  const [animalId, setAnimalId] = useState(0);
  const [animal, setAnimal] = useState<IAnimals>();
  const [button, setButton] = useState(<></>);
  const [isFed, setIsFed] = useState("");
  const [clock, setClock] = useState("");
  const [buttonPushed, setButtonPushed] = useState(false);
  const [fed, SetFed] = useState(false);

  let params = useParams();

  useEffect(() => {
    setAnimalId(Number(params.id));
  }, []);

  useEffect(() => {
    if (localStorage.length > 0) {
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
  }, [animalArray2]);

  useEffect(() => {
    if (animal != undefined) {
      animal.isFed = true;
      if (animal?.isFed === true && buttonPushed === true) {
        SetFed(true);
        setButton(<button disabled={true}>Mata {animal?.name} 2</button>);
        animal.lastFed = new Date();
        let stringArrayLs: string = localStorage.getItem("animal") || "[]";
        let animalLSArray = JSON.parse(stringArrayLs);
        let index = animalLSArray.findIndex(
          (animalLS: IAnimals) => animalLS.id === animal.id
        );
        setIsFed(animal.lastFed.toString());
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
        let finish = animal.lastFed.setSeconds(
          animal.lastFed.getSeconds() + 10
        );

        if (finish - new Date().getTime() > 0) {
          let timer = setInterval(function () {
            let date = new Date().getTime();
            let distance = finish - date;
            if (distance > 0) {
              let days = Math.floor(distance / (1000 * 60 * 60 * 24));
              let hour: string | number = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              let minutes: string | number = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
              );
              let seconds: string | number = Math.floor(
                (distance % (1000 * 60)) / 1000
              );

              if (hour < 10) {
                hour = "0" + hour;
              }
              if (minutes < 10) {
                minutes = "0" + minutes;
              }
              if (seconds < 10) {
                seconds = "0" + seconds;
              }

              setClock(
                hour +
                  " timmar, " +
                  minutes +
                  " minuter, " +
                  seconds +
                  " sekunder."
              );
            } else {
              clearInterval(timer);
              setClock("0 minuter! " + animal.name + " är jättehungrig!");

              setButton(
                <button
                  onClick={() => {
                    feedAnimal();
                  }}
                >
                  Mata {animal?.name}
                </button>
              );
              let stringArrayLs: string =
                localStorage.getItem("animal") || "[]";
              let animalLSArray = JSON.parse(stringArrayLs);
              let index = animalLSArray.findIndex(
                (animalLS: IAnimals) => animalLS.id === animal.id
              );
              setIsFed(animal.lastFed.toString());
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
                isFed: false,
                lastFed: animal.lastFed,
              });
              localStorage.setItem("animal", JSON.stringify(animalLSArray));
              window.dispatchEvent(new Event("storage"));
              setButtonPushed(false);
            }
            // console.log(clock);
          }, 1000);
        }
        // }
      }
    }
  }, [buttonPushed]);

  useEffect(() => {
    if (animal?.isFed === true) {
      SetFed(true);
      setButton(<button disabled={true}>Mata {animal?.name}</button>);
      setIsFed(animal.lastFed.toString());
      let finish = new Date(animal?.lastFed).setSeconds(
        new Date(animal.lastFed).getSeconds() + 10
      );

      if (finish - new Date().getTime() > 0) {
        let timer = setInterval(function () {
          let date = new Date().getTime();
          let distance = finish - date;
          if (distance > 0) {
            // console.log(distance / 1000 / 60 / 60);
            // console.log(finish + " " + date + " " + distance);
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hour: string | number = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minutes: string | number = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            let seconds: string | number = Math.floor(
              (distance % (1000 * 60)) / 1000
            );

            if (hour < 10) {
              hour = "0" + hour;
            }
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }

            setClock(
              hour +
                " timmar, " +
                minutes +
                " minuter, " +
                seconds +
                " sekunder."
            );
          } else {
            console.log("heluuu");
            clearInterval(timer);
            setClock("0 minuter! " + animal.name + " är jättehungrig!");
            SetFed(false);
            setButton(
              <button
                onClick={() => {
                  feedAnimal();
                }}
              >
                Mata {animal?.name}
              </button>
            );
            let stringArrayLs: string = localStorage.getItem("animal") || "[]";
            let animalLSArray = JSON.parse(stringArrayLs);
            let index = animalLSArray.findIndex(
              (animalLS: IAnimals) => animalLS.id === animal.id
            );
            setIsFed(animal.lastFed.toString());
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
              isFed: false,
              lastFed: animal.lastFed,
            });
            localStorage.setItem("animal", JSON.stringify(animalLSArray));
            window.dispatchEvent(new Event("storage"));
            setButtonPushed(false);
          }
          // console.log(clock);
        }, 1000);
      }
      // }
    }
  }, [animal]);

  function feedAnimal() {
    setButtonPushed(true);
  }

  return (
    <>
      <section className="showAnimalSection">
        <article>
          <ul>
            <li>Namn: {animal?.name}</li>
            <li>Född: {animal?.yearOfBirth}</li>
            <li>Information om arten: {animal?.longDescription}</li>
          </ul>
          <img src={animal?.imageUrl} alt={animal?.name} />
          <p>
            {fed ? animal?.name + " är mätt!" : animal?.name + " är hungrig!"}
          </p>
          {button}
          <p>Senast matad: {isFed}</p>
        </article>
        <div>
          <p>Tid till nästa matning:</p>
          {clock}
        </div>
      </section>
    </>
  );
}
