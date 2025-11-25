import estilos from './ListaFilmes.module.css'
import {useState, useEffect} from 'react'
import {Filme} from '../componentes/Filme'

import {FilmeTipo} from '../tipos/filme'

export function ListaFilmes(){

    const [filmesAPI, setFilmesAPI] = useState<FilmeTipo[]>([])
    const [erro, setErro] = useState('')

    let chaveAPI = 'a3159515e3d6ecfbc384656851743daa'
    let idioma ='pt-BR'
    let ordenacao = 'popularity.desc'

    const buscaFilmes = async () => {
        try {
            const respostaJSON = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${chaveAPI}&language=${idioma}&sort_by=${ordenacao}`)
            const respostaJS = await respostaJSON.json()
            setFilmesAPI(respostaJS.results)
        } catch (erro) {
            setErro(`A busca por filmes falhou! (Erro: ${erro})`)
        }
    }

    useEffect(() => {
        buscaFilmes()
    }, [])


    return(
        <main className={estilos.conteiner}>
            { erro ? <p className={estilos.mensagemErro}>{erro}</p>
                   : filmesAPI.map( (cadaFilme, indice) => <Filme key={indice} umFilme={cadaFilme} /> ) }
        </main>
    )
}