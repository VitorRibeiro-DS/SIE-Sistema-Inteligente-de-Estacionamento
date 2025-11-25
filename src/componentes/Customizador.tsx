import estilos from './Customizador.module.css'

interface CustomizadorProps {
    children: React.ReactNode
  }

export function Customizador(props: CustomizadorProps) {
    return(
        <div className={estilos.conteiner}>
            {props.children}
        </div>
    );
}