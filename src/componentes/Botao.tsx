import estilos from './Botao.module.css'

interface BotaoProps {
    texto?: string
}

export function Botao({texto}: BotaoProps){
    return(
        <div className={estilos.conteiner}>
            <p>{texto || 'Ok'}</p>
        </div>
    )
}