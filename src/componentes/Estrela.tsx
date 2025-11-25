import estilos from './Estrela.module.css'
import { MdOutlineStar } from "react-icons/md";

interface EstrelaProps {
    selecao: boolean
    avaliacao: () => void
}

export function Estrela({avaliacao, selecao}: EstrelaProps){
    return(
        <MdOutlineStar 
            className={estilos.estrela}
            style={{ color: `${ selecao ? '#ffea00' : '#404756' }` }}   
            onClick={avaliacao}
        />
    )
}
