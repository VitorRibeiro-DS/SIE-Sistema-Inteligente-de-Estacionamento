import estilos from './Filme.module.css'
import {Customizador} from './Customizador'
import {useNavigate} from 'react-router-dom'
import {FilmeTipo} from '../tipos/filme'

interface FilmeProps {
    umFilme: FilmeTipo
}

export function Filme({umFilme}: FilmeProps) {

    const navegacao = useNavigate()

    const filme = { 
        codigo: umFilme.id
    }

    function avaliarFilme() {
        navegacao('avaliacao', {state: {filme}})
    }

    return(
        <Customizador>
            <figure 
                className={estilos.conteiner} 
                onClick={avaliarFilme}
            >
                <img className={estilos.poster} src={`https://image.tmdb.org/t/p/w500/${umFilme.poster_path}`} />
                <figcaption className={estilos.titulo}>{umFilme.title}</figcaption>
                <figcaption className={estilos.ano}>{String(umFilme.release_date).slice(0,4)}</figcaption>
            </figure>
        </Customizador>
    )
}