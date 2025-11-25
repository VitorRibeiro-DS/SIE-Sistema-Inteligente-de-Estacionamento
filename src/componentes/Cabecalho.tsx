import estilos from './Cabecalho.module.css'
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from 'react-router-dom'
import { MdLogout } from "react-icons/md"
import { MdMenu, MdClose } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useAutenticacao } from '../contextos/AutenticacaoContexto'
import { ModalMensagem } from '../componentes/ModalMensagem'

export function Cabecalho(){

  const { usuarioLogado, deslogar } = useAutenticacao()

  const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
  const [modalMensagemTitulo, setModalMensagemTitulo] = useState('')
  const [modalMensagemTexto, setModalMensagemTexto] = useState('')

  const navegacao = useNavigate()
  const local = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleScrollTo(id: string){
    if(local.pathname !== '/inicial'){
      navegacao('/inicial')
      setTimeout(() => {
        const el = document.getElementById(id)
        if(el) el.scrollIntoView({behavior: 'smooth', block: 'start'})
      }, 120)
    }else{
      const el = document.getElementById(id)
      if(el) el.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
    // close mobile menu after navigation
    setMenuOpen(false)
  }

  const sair = async () => {

    let sucesso = await deslogar()

    if(sucesso){ 
      navegacao('/')
    }else{
      setModalMensagemTitulo('Identificação')
      setModalMensagemTexto('Falha ao deslogar usuário!')
      exibirModal()
    }
  }

  function exibirModal(){
    setModalMensagemVisivel(true)
  }

  function ocultarModal(){
    setModalMensagemVisivel(false)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent){
      if(e.key === 'Escape') setMenuOpen(false)
    }
    if(menuOpen){
      document.addEventListener('keydown', onKey)
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return(
    <header className={estilos.header}>
      <div className={estilos.container}>
        <div>
          <img className={estilos.logo} src={logo} />
        </div>

        <div className={estilos.right}>

          <nav className={estilos.nav}>
            <button className={estilos.botao} onClick={() => handleScrollTo('sumario')}>
              Inicio
            </button>

            <button className={estilos.botao} onClick={() => handleScrollTo('metodologia')}>
              Metodologia
            </button>

            <button className={estilos.botao} onClick={() => handleScrollTo('mapa')}>
              Mapa
            </button>

            <button className={estilos.botao} onClick={() => handleScrollTo('resultados')}>
              Resultados
            </button>

            <div className={estilos.botao} onClick={sair}>
              <MdLogout className={estilos.icone} size={18} color="#58C4DC" />
              Deslogar
            </div>
          </nav>

          <button
            className={estilos.hamburger}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            {menuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>

        </div>
      </div>

      <ModalMensagem 
        exibir={modalMensagemVisivel}
        ocultar={() => ocultarModal()}
        titulo={modalMensagemTitulo}
        texto={modalMensagemTexto}
      />

      {/* Mobile menu overlay */}
      <div className={`${estilos.mobileMenu} ${menuOpen ? estilos.open : ''}`} role="dialog" aria-modal={menuOpen}>
        <nav className={estilos.mobileNav}>
          <button className={estilos.mobileItem} onClick={() => handleScrollTo('sumario')}>Início</button>
          <button className={estilos.mobileItem} onClick={() => handleScrollTo('metodologia')}>Metodologia</button>
          <button className={estilos.mobileItem} onClick={() => handleScrollTo('mapa')}>Mapa</button>
          <button className={estilos.mobileItem} onClick={() => handleScrollTo('resultados')}>Resultados</button>
          <button className={estilos.mobileItem} onClick={sair}><MdLogout className={estilos.icone} size={18} color="#58C4DC" /> Deslogar</button>
        </nav>
      </div>

      <div className={estilos.user}>
        <span className={estilos.nomeUsuario}>{usuarioLogado?.nome}</span>
      </div>

    </header>
  )
}
