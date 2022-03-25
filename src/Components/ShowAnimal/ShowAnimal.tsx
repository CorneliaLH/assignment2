import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimals } from "../../Models/IAnimals";

import "./ShowAnimal.css";

export function ShowAnimal() {
  const [animalArray, setAnimalArray] = useState<IAnimals[]>([]);
  const [animalId, setAnimalId] = useState(0);
  const [animal, setAnimal] = useState<IAnimals>();
  const [button, setButton] = useState(<></>);
  const [isFed, setIsFed] = useState("");
  const [clock, setClock] = useState("");
  const [buttonPushed, setButtonPushed] = useState(false);
  const [fed, SetFed] = useState(false);
  const [hungry, setHungry] = useState(false);

  let params = useParams();

  //läser av id från url
  useEffect(() => {
    setAnimalId(Number(params.id));
  }, []);
  //läser in från localstorage
  useEffect(() => {
    if (localStorage.length > 0) {
      let arrayFromLS = JSON.parse(localStorage.getItem("animal") || "[]");
      setAnimalArray(arrayFromLS);
    }
  }, [animalId]);

  //loopar fram korrekt djur och tar reda på om det är hungrigt
  useEffect(() => {
    for (let i = 0; i < animalArray.length; i++) {
      if (animalArray[i].id === animalId) {
        let animalItem = animalArray[i];
        if (
          new Date(animalItem.lastFed).setSeconds(
            new Date(animalItem.lastFed).getSeconds() + 14400
          ) -
            new Date().getTime() <
          0
        ) {
          setHungry(true);
        }
        setAnimal(animalItem);
        setIsFed(animalItem.lastFed.toString());
      }
    }
  }, [animalArray]);

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
      setButton(<button disabled={true}>Mata {animal?.name}</button>);
    }
  }, [animalArray]);

  //knapptryckning matning. Hade en setTimeout först som räkniande ner 3 timmar
  //men ville testa om jag kunde
  //få till en klocka istället. Därför ganska mycket kod.
  useEffect(() => {
    setHungry(false);
    if (animal != undefined) {
      animal.isFed = true;
      if (animal?.isFed === true && buttonPushed === true) {
        SetFed(true);
        setButton(<button disabled={true}>Mata {animal?.name}</button>);
        //Ändra isFed och lastFed samt spara till localStorage
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

        let finish = new Date(animal?.lastFed).setSeconds(
          new Date(animal.lastFed).getSeconds() + 10800
        );
        //Funktion för timer 4 timmar
        setHungerTimer();
        if (finish - new Date().getTime() > 0) {
          let timer: any = setInterval(function () {
            let date = new Date().getTime();
            let distance = finish - date;
            if (distance > 0) {
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
              setClock(
                "Det har gått mer än 3 timmar sedan matning! " +
                  animal.name +
                  " är hungrig!"
              );
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
              //änsra isFed samt spara till localStorage
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
              //Event skickas iväg så home-komponenten visar vilja djur som har matats
              window.dispatchEvent(new Event("storage"));
              setButtonPushed(false);
              //ta bort violation i console
              Promise.resolve().then(timer);
            }
          }, 1000);
        }
      }
    }
  }, [buttonPushed]);

  //Mycket upprepande av kod under, mest för att jag ville försöka
  //få till att nedräkning etc. sker trots uppdatering av sida och i realtid.
  //Kan säkert kortas ner.
  useEffect(() => {
    if (animal?.isFed === true) {
      SetFed(true);
      setButton(<button disabled={true}>Mata {animal?.name}</button>);
      setIsFed(animal.lastFed.toString());
      let finish = new Date(animal?.lastFed).setSeconds(
        new Date(animal.lastFed).getSeconds() + 10800
      );
      //Funktion för timeout efter 4 timmar
      setHungry(true);
      setHungerTimer();

      //Timer 3 timmar som startar klocka
      if (finish - new Date().getTime() > 0) {
        let timer: any = setInterval(function () {
          let date = new Date().getTime();
          let distance = finish - date;
          if (distance > 0) {
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
            setClock(
              "Det har gått mer än 3 timmar sedan matning! " +
                animal.name +
                " är hungrig!"
            );
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
            //Uppdaterar animal.isFed och animal.lastFed samt localStorage
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

            //Event skickas iväg så home-komponenten visar vilja djur som har matats
            window.dispatchEvent(new Event("storage"));
            setButtonPushed(false);
          }
        }, 1000);
        Promise.resolve().then(timer);
      }
    }
  }, [animal]);

  function feedAnimal() {
    setButtonPushed(true);
  }
  //Funktion timeout 4 timmar
  //OM  man trycker på knappen direkt efter den blivit aktiv igen
  //forstätter föregående timeOut, vilket gör att meddelandet
  //blinkar, har inte lyckats lösa detta.
  function setHungerTimer() {
    if (animal != undefined) {
      let finish1 = new Date(animal.lastFed).setSeconds(
        new Date(animal.lastFed).getSeconds() + 14400
      );
      let time1 = finish1 - new Date().getTime();
      setTimeout(() => {
        setHungry(true);
        window.dispatchEvent(new Event("hungry"));
      }, time1);
    }
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
        <p>
          {hungry
            ? "Det har gått mer än 4 timmar sedan matning!! " +
              animal?.name +
              " är JÄTTEHUNGRIG!!"
            : "Det har gått mindre än 4 timmar sedan senaste matning!"}
        </p>
      </section>
    </>
  );
}
