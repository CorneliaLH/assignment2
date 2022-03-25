import axios from "axios";
import { IAnimals } from "./IAnimals";
class AnimalService {
  async getAnimals() {
    await axios
      .get<IAnimals[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        localStorage.setItem("animal", JSON.stringify(response.data));
        window.dispatchEvent(new Event("storage"));
        return response.data;
      })
      .catch((error) => console.log("error" + error));
    return;
  }
}

export default AnimalService;
