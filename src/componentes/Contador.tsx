import estilos from './Contador.module.css'
import {useState} from 'react'

export function Contador(){

    const [clique, setClique] = useState(0)

    function contarCliques(){
        setClique( clique + 1 )
        console.log(clique)
    }
    
    return(
        <div 
            className={estilos.conteiner}
            onClick={contarCliques}
        >
            <p className={estilos.texto}>
                {clique}
            </p>
        </div>
    )
}
