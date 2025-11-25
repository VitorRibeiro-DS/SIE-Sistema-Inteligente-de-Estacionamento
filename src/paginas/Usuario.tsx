import estilos from './Usuario.module.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { ModalConfirmacao } from '../componentes/ModalConfirmacao'
import { useAutenticacao } from '../contextos/AutenticacaoContexto'
import { UsuarioTipo } from '../tipos/usuario'

interface UsuarioProps {
    operacao: string
} 

interface FormValues {
    nome: string
    email: string
    senha: string
    permissao: "Administrador" | "Membro" | "Convidado"
}

const permissoes = ["Administrador", "Membro", "Convidado"] as const

const usuariosSchema = z.object({

    nome: z.string()
           .min(2, 'Informe um nome!')
           .max(25, 'Máximo de 25 caracteres!'),
    
    email: z.string()
           .email({message: 'Informe um e-mail válido!'}),

    senha: z.string()
           .length(6, {message: 'Defina uma senha com 6 caracteres!'}),   

    permissao: z.enum(permissoes, { errorMap: () => ({ message: "Selecione uma permissão" }) })
})


export function Usuario({operacao}: UsuarioProps) {

    const { usuarioLogado, 
            usuarioAutenticado,
            criarAutenticacaoUsuario, 
            excluirAutenticacaoUsuario,
            deslogar } = useAutenticacao()

    const [modalConfirmacaoVisivel, setModalConfirmacaoVisivel] = useState<boolean>(false)
    const [modalConfirmacaoTitulo, setModalConfirmacaoTitulo] = useState<string>('')
    const [modalConfirmacaoTexto, setModalConfirmacaoTexto] = useState<string>('')  


    const navegacao = useNavigate()

    const {register, handleSubmit, setValue, formState: {errors}
    } = useForm<FormValues>( { resolver: zodResolver(usuariosSchema) } )


    useEffect(() => {

        if(operacao == 'perfil' && usuarioLogado){
            setValue('nome', 'Nome Temporário')
            setValue('email', usuarioLogado.email!)
            setValue('senha', usuarioLogado.senha!)
            setValue('permissao', 'Membro')  
        }

    }, [])


    const adicionarUsuario = async (data: FormValues) => {     

        // Carrega um objeto JS com os dadoa do usuário
        const dadosUsuario: UsuarioTipo = {
            codigo: '',
            autenticacao: '',
            nome: '',
            email: data.email,
            senha: data.senha,
            permissao: 'Membro',
            dataCriacao: ''
        }

        // Cria a autenticação do usuário (Authentication)
        const usuarioAutenticacao = await criarAutenticacaoUsuario(data.email, data.senha)
        // Se criado com sucesso
        usuarioAutenticacao
        // Salva o código (uid) da autenticação no objeto JS do usuário
        ? dadosUsuario.autenticacao = String(usuarioAutenticacao?.user.uid)
        : console.log('Falha na criação da autenticação do usuário!')      

        // Garante que ao logar os dados estarão completos
        await deslogar()
        navegacao('/')
    }


    const modificarUsuario = async (data: FormValues) => {

        // Obs.: Alternativa a alteração da autenticação que depende de confirmação do usuário por e-mail

        // Carrega um objeto JS com os dadoa do usuário
        const dadosUsuario: UsuarioTipo = {
            codigo: String(usuarioLogado?.codigo),
            autenticacao: '',
            nome: '',
            email: data.email,
            senha: data.senha,
            permissao: 'Membro',
            dataCriacao: ''
        }

        // Obtém a autenticação atual (como User)
        const autenticacaoAtual = await usuarioAutenticado()

        // Cria uma nova autenticação
        const novaAutenticacao = await criarAutenticacaoUsuario(data.email, data.senha)
        // Se criou com sucesso
        novaAutenticacao
        // Substitui o código (uid) da autenticação no objeto JS do usuário
        ? dadosUsuario.autenticacao = String(novaAutenticacao?.user.uid)
        : console.log('Falha na criação do usuário!')        

        // Exclui a autenticação anterior
        autenticacaoAtual && usuarioLogado
        ? await excluirAutenticacaoUsuario(autenticacaoAtual, usuarioLogado?.email!, usuarioLogado?.senha!)
        : console.log('Falha na exclusão do autenticação atual!')


        // Garante que ao logar os dados estarão completos
        await deslogar()
        navegacao('/')
    }


    const removerUsuario = async () => {

        // Obtém a autenticação atual (como User)
        const autenticacaoAtual = await usuarioAutenticado()
        autenticacaoAtual && usuarioLogado
        // Exclui a autenticação do usuário no Authentication
        ? await excluirAutenticacaoUsuario(autenticacaoAtual, usuarioLogado?.email!, usuarioLogado?.senha!)
        : console.log('Falha na exclusão do autenticação atual!')

        await deslogar()
        navegacao('/')
    }


    function cancelar(){  }

    function fechar(){
      navegacao('/')  
    }

    function exibirModal(){
        setModalConfirmacaoVisivel(true)
    }

    const respostaModal = (opcao: string) => {
        
       setModalConfirmacaoVisivel(false)

       opcao == 'sim' ? removerUsuario() : null
    }

    const confirmacaoModal = () => {
        setModalConfirmacaoTitulo('Exclusão')
        setModalConfirmacaoTexto('Confirma a exclusão do usuário?')
        exibirModal()
    }

    return(

        <main className={estilos.root}>

            <p className={estilos.titulo}>{operacao == 'novo' ? 'Novo usuário' : 'Perfil'}</p>

            <form className={estilos.formulario}> 

                <input 
                    {...register('nome')}
                    className={estilos.campo}
                    placeholder='Nome' 
                />
                { errors.nome ?
                    <p className={estilos.mensagem}>
                        {errors.nome.message}
                    </p>
                : null }

                <input 
                    {...register('email')}
                    className={estilos.campo}
                    placeholder='E-mail' 
                />
                { errors.email ? 
                    <p className={estilos.mensagem}>
                        {errors.email.message}
                    </p>
                : null }

                <input 
                    {...register('senha')}
                    className={estilos.campo}
                    placeholder='Senha' 
                />  
                { errors.senha ?
                    <p className={estilos.mensagem}>
                        {errors.senha.message}
                    </p>
                : null }
   
                { operacao == 'novo'  
                    
                    ? <>
                        <select
                            {...register('permissao')}
                            id="permissao"
                            className={estilos.campo}
                        >
                            <option value="">Selecione a permissão</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Membro">Membro</option>
                            <option value="Convidado">Convidado</option>
                        </select>              
                        { errors.permissao ? 
                            <p className={estilos.mensagem}>
                                {errors.permissao.message}
                            </p>
                        : null }

                        <button
                            className={estilos.botao}
                            onClick={handleSubmit(adicionarUsuario)}
                        >Confirmar</button>

                        <button
                            className={estilos.botao}                    
                            onClick={fechar}
                        >Cancelar</button>
                      </>   
                    
                    : <>

                        <input 
                            {...register('permissao')}
                            className={estilos.campoBloqueado}
                            
                        />  

                        <div className={estilos.dataCriacaoConteiner}>
                            <p className={estilos.dataCriacao}>Data criação:</p>
                            <p className={estilos.dataCriacao}>{usuarioLogado ? usuarioLogado.dataCriacao : ''}</p>
                        </div>                        

                        <button
                            className={estilos.botao}
                            onClick={handleSubmit(modificarUsuario)}
                        >Confirmar alteração</button>

                        <button
                            className={estilos.botao}
                            onClick={handleSubmit(confirmacaoModal)}
                        >Excluir conta</button>

                        <button
                            className={estilos.botao}                    
                            onClick={cancelar}
                            type='button'
                        >Cancelar</button>     
                      </>   
                }

            </form>

            <ModalConfirmacao 
                exibir={modalConfirmacaoVisivel}
                resposta={respostaModal}  
                titulo={modalConfirmacaoTitulo}       
                texto={modalConfirmacaoTexto}   
            />

        </main>
    )    
    
}