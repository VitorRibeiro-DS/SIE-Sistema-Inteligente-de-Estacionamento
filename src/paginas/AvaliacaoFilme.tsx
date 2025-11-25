import estilos from './AvaliacaoFilme.module.css'
import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {Estrela} from '../componentes/Estrela'
import {MdClose} from "react-icons/md"
import {ModalMensagem} from '../componentes/ModalMensagem'

import {FilmeTipo} from '../tipos/filme'
import {GeneroTipo} from '../tipos/genero'

export function AvaliacaoFilme(){

    const location = useLocation()
    const {filme} = location.state

    const [filmeSelecionado, setFilmeSelecionado] = useState<FilmeTipo>({} as FilmeTipo)
    const [generos, setGeneros] = useState<GeneroTipo[]>([])

    const [assistiu, setAssistiu] = useState<string>('')
    const [data, setData] = useState<string>('')

    const [avaliacao, setAvaliacao] = useState<number>(0)
    const [comentario, setComentario] = useState<string>('')

    const [estrelaSelecionada, setEstrelaSelecionada] = useState<number>(-1)
    const vetorEstrelas = Array(5).fill(0)

    const [modalMensagemVisivel, setModalMensagemVisivel] = useState<boolean>(false)
    const [modalMensagemTitulo, setModalMensagemTitulo] = useState<string>('')
    const [modalMensagemTexto, setModalMensagemTexto] = useState<string>('')   

    const navegacao = useNavigate()

    let chaveAPI = 'a3159515e3d6ecfbc384656851743daa'
    let idioma ='pt-BR'
    let codigoFilme = filme.codigo

    const buscaFilme = async () => {
        try {
            const respostaJSON = await fetch(`https://api.themoviedb.org/3/movie/${codigoFilme}?api_key=${chaveAPI}&id=53&language=${idioma}`)
            const respostaJS = await respostaJSON.json()
            setFilmeSelecionado(respostaJS)        
            setGeneros(respostaJS.genres)
        } catch (erro) {
            console.log(`A busca pelo filme selecionado falhou! (Erro: ${erro})`)
        }
    }

    useEffect(() => {
        buscaFilme()
    }, [])


    function salvarAvalicao(){
        let dataFormatada = new Date(data)         
        setModalMensagemTitulo('Salvar avaliação')
        setModalMensagemTexto(`${assistiu} \nData: ${dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC'})} \nAvaliação: ${avaliacao} \nComentário: ${comentario}`)
        exibirModal()
    }


    function avaliarFilme(indice: number){
        setEstrelaSelecionada( (selecaoAnterior: number) => selecaoAnterior == indice ? selecaoAnterior : indice )
        setAvaliacao(indice + 1)
    }

    function opcaoAssistiu(event: React.ChangeEvent<HTMLInputElement>){
        setAssistiu( event.target.value )
    }

    function fechar(){
        navegacao('/inicial')
    }

    function exibirModal(){
        setModalMensagemVisivel(true)
    }

    function ocultarModal(){
        setModalMensagemVisivel(false)
    }


    return(
        <main className={estilos.conteinerGrid}>

            <div className={estilos.posterGrid}>
                <img className={estilos.poster} src={`https://image.tmdb.org/t/p/w500/${filmeSelecionado.poster_path}`} />                
            </div>

            <div className={estilos.tituloGrid}>  
                <MdClose 
                    className={estilos.fechar}
                    onClick={fechar}
                />        
                <p className={estilos.titulo}>{filmeSelecionado.title}</p>
            </div>

            <div className={estilos.dadosFilmeGrid}>
                <p className={estilos.ano}>{`Lançamento: ${String(filmeSelecionado.release_date).slice(0,4)}`}</p>
                <p className={estilos.ano}>{`Gênero: ${generos.map( genero => `${genero.name} ` )}`}</p>
                <p className={estilos.sinopseTitulo}>Sinopse:</p>
                <p className={estilos.sinopse}>{filmeSelecionado.overview ? filmeSelecionado.overview : 'Não disponível'}</p>
            </div>

            <div className={estilos.avaliacaoBotoesGrid}>

                <fieldset className={estilos.conteinerOpcoes}>

                    <div className={estilos.opcao}>
                        <input type="radio" 
                            id="quero_assistir" 
                            name="assistiu" 
                            value="Quero assistir" 
                            checked={assistiu == 'Quero assistir'}
                            onChange={opcaoAssistiu}
                        />
                        <label className={estilos.opcaoRotulo} htmlFor="quero_assistir">Quero assistir</label>
                    </div>                            

                    <div className={estilos.opcao}>
                        <input type="radio" 
                            id="estou_assistindo" 
                            name="assistiu" 
                            value="Estou assistindo" 
                            checked={assistiu == 'Estou assistindo'}
                            onChange={opcaoAssistiu}
                        />
                        <label className={estilos.opcaoRotulo} htmlFor="estou_assistindo">Estou assistindo</label>
                    </div>

                    <div className={estilos.opcao} >
                        <input type="radio" 
                            id="ja_assisti" 
                            name="assistiu" 
                            value="Já assisti" 
                            checked={assistiu == 'Já assisti'}
                            onChange={opcaoAssistiu}                                       
                        />
                        <label className={estilos.opcaoRotulo} htmlFor="ja_assisti">Já assisti</label>
                    </div>

                </fieldset>
            </div>

            <div className={estilos.avaliacaoCamposGrid}>

                <div className={estilos.conteinerAvaliacaoCampos}>

                    <div className={estilos.conteinerAvaliacaoCamposAlinhamento}>

                        <div className={estilos.dataConteiner}>
                            <label htmlFor='data'>Data:</label>
                            <input
                                className={estilos.data} 
                                type='date' 
                                name='data'
                                value={data}
                                onChange={event => setData(event.target.value)}
                            />
                        </div>

                        <div className={estilos.conteinerEstrelas}>
                            <p className={estilos.conteinerEstrelasRotulo}>Avaliação:</p>
                            { vetorEstrelas.map( (_, indice) => <Estrela avaliacao={() => avaliarFilme(indice)} selecao={indice <= estrelaSelecionada} /> ) }
                        </div>

                    </div>

                    <textarea 
                        className={estilos.comentario}
                        value={comentario}
                        onChange={event => setComentario( event.target.value )}
                    >
                        Digite aqui sua análise
                    </textarea>
                </div>

                <div className={estilos.botaoConteiner}>
                    <button 
                        className={estilos.botao}
                        onClick={salvarAvalicao}
                    >Salvar</button>
                </div>

            </div>

            <ModalMensagem 
                exibir={modalMensagemVisivel}
                ocultar={() => ocultarModal()}
                titulo={modalMensagemTitulo}
                texto={modalMensagemTexto}
            />

        </main>
    )
        
}