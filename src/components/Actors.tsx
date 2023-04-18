import { useCallback, useEffect, useState } from "react";
import { ActorInterface } from "../interfaces/Interfaces";
import { getData } from "../lib/api";
import ActorCard from "./common/ActorCard";

const Actors = () => {
  const [actors, setActors]: [ActorInterface[], any] = useState([]);
  const getDataHandler = useCallback(async () => {
    const data: any = await getData(`/person/popular`);
    setActors(data.results);
  }, []);
  useEffect((): any => {
    getDataHandler();
  }, [getDataHandler]);
  return <div className="actors">
    <div className="actorsContainer">
      {!!actors.length && actors.map((actor, key) => <ActorCard key={'card' + key} actor={actor}/>)}
    </div>
  </div>
}

export default Actors;