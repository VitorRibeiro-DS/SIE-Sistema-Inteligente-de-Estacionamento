import estilos from './Rodape.module.css'
import ds from "../assets/desenvolvedores.jpg";
import { useState } from 'react'

export function Rodape(){
const [showLightbox, setShowLightbox] = useState(false);

    return(
        <footer className={estilos.footer}>
      <div className={estilos.container}>
        <div>
          <strong className={estilos.brand}>Sistema Inteligente de Estacionamento — TCC</strong>
          <div className={estilos.info}>
            <button
              onClick={() => setShowLightbox(true)}
              className={estilos.imageLink}
            >
              Desenvolvimento — Desenvolvedores Kayque Teixeira, Leonardo Gomes, Renan Ortiz, Vitor Ribeiro.
            </button>
          </div>
        </div>
        <div className={estilos.info}></div>
      </div>

      {showLightbox && (
        <div className={estilos.lightbox} onClick={() => setShowLightbox(false)}>
          <div className={estilos.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={ds} className={estilos.lightboxImage} />
            <button className={estilos.closeButton} onClick={() => setShowLightbox(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </footer>
    )
}