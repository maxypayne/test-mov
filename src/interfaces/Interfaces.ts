export interface ActorInterface {
  adult?: false
  biography?: string;
  birthday?: string;
  cast_id?: number;
  character?:  string;
  credit_id?:  string;
  combined_credits?: {
    cast?: [
      {title?: string; character?: string; release_date?: string}
    ]
  }
  gender?: number;
  id?: number;
  known_for?: [{}];
  known_for_department?:  string;
  name?: string;
  order?: number;
  original_name?:  string;
  place_of_birth?: string;
  popularity?: number;
  profile_path?: string;
}

export interface ReviewInterface {
  author?: string;
  author_details?: {
    name?: string;
    username?: string;
    avatar_path?: string;
    rating?: number;
  }
  content?: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
  url?: string;
}
export interface MovieInterface {
  id?: number;
  title?: string;
  name?: string;
  adult?: boolean
  backdrop_path?: string
  belongs_to_collection?: {
    id?: number,
    name?: string,
    poster_path?: string, 
    backdrop_path?: string
  }
  budget?: number
  credits?: {
    cast?: Array<ActorInterface>;
    crew?: Array<ActorInterface>;
  }
  genres?: [{id: string; name: string}];
  homepage?: string;
  images?: {
    backdrops?: [];
    logos?: [];
    posters?: []
  }
  imdb_id?: string
  original_language?: string
  original_title?: string
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: []
  production_countries?: []
  release_date?: string;
  first_air_date?: string;
  revenue?: number
  reviews?: {
    results?: Array<ReviewInterface>;
  };
  runtime?: number
  spoken_languages?: []
  status?: string;
  tagline?: string;
  video?: false;
  vote_average?: number;
  vote_count?: number;
}


export interface User {
  username?: string;
  email?: string;
  password?: string;
  token?: string;
  isLog?: boolean;
}