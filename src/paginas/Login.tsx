import estilos from './Login.module.css'
import logo from '../assets/logo.png'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ModalMensagem } from '../componentes/ModalMensagem'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdLogIn, IoMdPersonAdd } from "react-icons/io"
import { useAutenticacao } from '../contextos/AutenticacaoContexto'


interface FormValues {
    email: string
    senha: string
}

const loginSchema = z.object({

    email: z.string()
            .email({message: 'Informe um e-mail válido!'}),

    senha: z.string()
            .length(6, {message: 'Defina uma senha com 6 caracteres'})
})

export function Login(){

    const { validarUsuario } = useAutenticacao()

    const [modalMensagemVisivel, setModalMensagemVisivel] = useState(false)
    const [modalMensagemTitulo, setModalMensagemTitulo] = useState('')
    const [modalMensagemTexto, setModalMensagemTexto] = useState('')

    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm<FormValues>({
        resolver: zodResolver(loginSchema)
    })

    const navegacao = useNavigate()

    
    const verificarUsuario = async (data: FormValues) => {
        
        let sucesso = await validarUsuario(data.email, data.senha)

        if(sucesso){
            navegacao('inicial')
        }else{
            setModalMensagemTitulo('Identificação')
            setModalMensagemTexto('Falha na autenticação do usuário!')
            exibirModal()
        }

    }

    


    function exibirModal(){
        setModalMensagemVisivel(true)
    }

    function ocultarModal(){
        setModalMensagemVisivel(false)
    }

    return(
        <div className={estilos.conteiner}>
     
            <div className={estilos.tituloContainer}>
                <img src={logo} alt="logo" className={estilos.logo} />
            </div>

            <form 
                className={estilos.formulario}
                onSubmit={handleSubmit(verificarUsuario)}
            >
                <input 
                    {...register('email')}
                    className={estilos.campo}
                    placeholder='E-mail'            
                />
                { errors?.email && (
                    <p className={estilos.mensagem}>
                        {errors.email.message}
                    </p>
                ) }

                <input 
                    {...register('senha')}
                    className={estilos.campo}
                    placeholder='Senha'      
                    type='password'      
                />
                { errors?.senha && (
                    <p className={estilos.mensagem}>
                        {errors.senha.message}
                    </p>
                ) }

                <button
                    className={estilos.botao}
                >
                    <IoMdLogIn className={estilos.icone}/>
                    Entrar
                </button>

            </form>

            <Link 
                to={'usuarioNovo'}
                className={estilos.novoUsuario}
            >
                <IoMdPersonAdd className={estilos.icone}/>
                Cadastre-se
            </Link>



            <ModalMensagem 
                exibir={modalMensagemVisivel}
                ocultar={() => ocultarModal()}
                titulo={modalMensagemTitulo}
                texto={modalMensagemTexto}
            />

        </div>
    )
}
