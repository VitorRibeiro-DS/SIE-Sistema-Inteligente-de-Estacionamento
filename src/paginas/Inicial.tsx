import estilos from './Inicial.module.css'
import {Cabecalho} from '../componentes/Cabecalho'
import {Rodape} from '../componentes/Rodape'
import {Sumario} from '../componentes/Sumario'
import {Metodologia} from '../componentes/Metodologia'
import {Resultados} from '../componentes/Resultados'
import {Mapa} from '../componentes/Mapa'

export function Inicial(){
    return(
        <div className={estilos.gridConteiner}>
            <Cabecalho />
            <main className={estilos.conteudo}>
                <Sumario />
                <Metodologia />
                <Mapa />
                <Resultados />
            </main>
            <Rodape />
        </div>
    )
}       