import estilos from './Fundamentos.module.css'
import {Botao} from '../componentes/Botao'
import {Contador} from '../componentes/Contador'
import { Link } from 'react-router-dom'
import { MdArrowBack } from "react-icons/md"

export function Fundamentos(){
    return(
        <main className={estilos.conteiner}>

            <div className={estilos.conteinerCabecalho}>
                <Link
                    className={estilos.link}
                    to={'/'}
                >
                    <MdArrowBack 
                        className={estilos.icone}
                        size={32} 
                        color="#58C4DC" 
                    />                    
                </Link>
                <p className={estilos.titulo}>
                    Fundamentos de React JS
                </p>
            </div>

            <div className={estilos.barraRolagem}>

                <p className={estilos.subtitulo}>
                    <strong>Componentes JSX</strong>
                </p>
                <Botao />

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>Props</strong> (propriedades)
                </p>
                <div className={estilos.conteinerBotoes}>
                    <Botao texto="Confirmar" />
                    <Botao texto="Cancelar" />
                    <Botao texto="Entrar" />
                    <Botao texto="Calcular" />
                </div>

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>State</strong> (estado)
                </p>
                <Contador />

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <p><strong>Comunicação direta</strong> (componente pai para filho) - Passagem de valores por props</p>
                    <p><strong>Comunicação indireta</strong> (componente filho para pai) - Passagem de funções por props</p>
                </p>

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>React-Hook-Form</strong> - Gerenciamento de formulários  
                    (<a href="https://react-hook-form.com/" target='_blank'>documentação</a>)
                </p>
                
                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>Zod</strong> - Regras de validações de entradas 
                    (<a href="https://zod.dev/" target='_blank'>documentação</a>)
                </p>
                
                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>Imagens</strong>
                    <p>&emsp;Repositório remoto</p>
                    <p>&emsp;Repositório interno</p>
                    <strong>Ícones</strong>
                </p>

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>Navegação</strong>
                    <p>&emsp;Rotas e Sub-rotas</p>
                    <p>&emsp;Componentes:</p>
                    <p>&emsp;&emsp;BrowserRouter</p>
                    <p>&emsp;&emsp;Routes</p>
                    <p>&emsp;&emsp;Route</p>
                    <p>&emsp;&emsp;Navigate</p>
                    <p>&emsp;&emsp;Link</p>
                    <p>&emsp;&emsp;Outlet</p>
                </p>

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>Componentes pai-filho (props.children)</strong>
                </p>

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>Comsumo de API (tratamento de resposta)</strong>
                    <p>&emsp;Funções assíncronas</p>
                    <p>&emsp;&emsp;fetch (promise)</p>
                    <p>&emsp;&emsp;Async-Await</p>
                    <p>&emsp;Requisições get</p>
                    <p>&emsp;&emsp;Tratamento de respostas JSON</p>
                </p>

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>Adequações de componentes</strong>
                    <p>&emsp;Renderização condicional</p>
                </p>

                <hr className={estilos.separador} />
                <p className={estilos.subtitulo}>
                    <strong>Passagem de parâmetros entre componentes (páginas)</strong>
                    <p>&emsp;Por props</p>
                    <p>&emsp;Por rotas (parâmetros na url)</p>
                    <p>&emsp;Por rotas (state)</p>
                </p>

            </div>

        </main>
    )
}
