import { useNavigate } from "react-router-dom";
import { IAnimals } from "../../Models/IAnimals";
import "./Animal.css";

export function Animal(props: IAnimals) {
  const navigation = useNavigate();
  function detailsAnimal(id: number) {
    navigation("./showanimal/" + id);
  }
  return (
    <>
      <section>
        <article className="animalCard">
          <ul>
            <li>{props.name}</li>
            <li> {props.latinName}</li>
            <img src={props.imageUrl} alt={props.name} />
          </ul>
          <button
            onClick={() => {
              detailsAnimal(props.id);
            }}
          >
            Mer om {props.name}
          </button>
        </article>
      </section>
    </>
  );
}
