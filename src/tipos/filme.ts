import {GeneroTipo} from './genero'

export type FilmeTipo = {
    id: string
    poster_path: string
    title: string
    release_date: string
    genres: GeneroTipo[]
    overview: string
}