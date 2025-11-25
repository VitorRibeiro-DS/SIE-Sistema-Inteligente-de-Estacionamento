import estilos from './ModalConfirmacao.module.css'

interface ModalConfirmacaoProps {
    exibir: boolean
    titulo: string
    texto: string
    resposta: (opcao: string) => void
}

export function ModalConfirmacao({exibir, titulo, texto, resposta, }: ModalConfirmacaoProps) {

    if (exibir) {

        return(
            <div className={estilos.conteiner}>

                <p className={estilos.titulo}>{titulo}</p>

                <div className={estilos.conteinerMensagem}>
                    <div className={estilos.mensagem}>{
                        texto.split('\n').map( linha => <p key={linha.length}>{String(linha).slice(0,60)}</p> )
                    }</div>
                </div>
                
                <div className={estilos.conteinerBotoes}>
                    <button 
                        className={estilos.botao}
                        onClick={() => resposta('sim')}
                    >Confirmar</button>

                    <button 
                        className={estilos.botao}
                        onClick={() => resposta('nao')}
                    >Cancelar</button>
                </div>

            </div>
        )    
    }
}
