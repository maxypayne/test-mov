import React from "react";
import { Link } from "react-router-dom";
import { ActorInterface } from "../../interfaces/Interfaces";
import { getImage } from "../../lib/api";
import Review from "./Review";

interface Props {
  actor: ActorInterface;
}
const ActorCard: React.FC<Props> = ({ actor }) => {
  return (
    <Link className="actorCard" to={`/actors/${actor.id}`}>
      <div className="actorCardImage" style={{backgroundImage: `url(${getImage(actor.profile_path, 'face')})`}}></div>
      <div className="actorCardInfos">
        <p className="actorCardName">{actor.name}</p>
      </div>
    </Link>
  )
}

export default ActorCard;