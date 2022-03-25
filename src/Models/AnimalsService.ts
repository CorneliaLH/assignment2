import axios from "axios";
import { IAnimals } from "./IAnimals";
class AnimalService {
  GetAnimals() {
    axios
      .get<IAnimals[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("animal", JSON.stringify(response.data));
        return response.data;
      });
  }
}

export default AnimalService;
