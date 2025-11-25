import { createContext, ReactNode, useEffect, useState, useContext } from 'react'
import { onAuthStateChanged, 
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword,
         deleteUser, 
         signOut,
         UserCredential,
         User,
         EmailAuthProvider,
         reauthenticateWithCredential } from 'firebase/auth'
import { autenticacao } from '../firebase/firebaseConexao'
import { UsuarioTipo } from '../tipos/usuario'


interface UsuarioProviderProps {
  children: ReactNode
}

interface UsuarioTipoContexto {
  usuarioLogado: UsuarioTipo | null
  criarAutenticacaoUsuario: (email: string, senha: string) => Promise<UserCredential | null>
  usuarioAutenticado: () => Promise<User | null>
  excluirAutenticacaoUsuario: (usuario: User, email: string, senha: string) => Promise<boolean>
  validarUsuario: (email: string, senha: string) => Promise<boolean>
  deslogar: () => Promise<boolean>
}

const AutenticacaoContexto = createContext<UsuarioTipoContexto | undefined>(undefined)

export const AutenticacaoProvider = ({ children }: UsuarioProviderProps) => {

  // State compartilhado no contexto com os dados do usuario logado
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioTipo | null>(null)

  // Verificação a cada atualização da página
  useEffect(() => {

    // Verifica se existe um usuário autenticado
    const usuarioAutenticacao = onAuthStateChanged(autenticacao, async (usuarioFirebase: any) => {

      // Se existir
      if (usuarioFirebase) {

        const usuarioDados: UsuarioTipo = {
          codigo: usuarioFirebase.uid,
          email: usuarioFirebase.email
        }
        setUsuarioLogado(usuarioDados)

      }
    })

    return () => usuarioAutenticacao()
  }, [])


  const criarAutenticacaoUsuario = async (email: string, senha: string): Promise<UserCredential | null> => {
    try {
      // Cria a autenticação do usuário e retorna suas credenciais
      return await createUserWithEmailAndPassword(autenticacao, email, senha)
    } catch (error: unknown) {
      error instanceof Error 
      ? console.error(`Erro na criação da autenticação do usuário! (${error.message})`)
      : console.error(`Erro imprevisto: ${error}`)
      return null
    }
  }

  const usuarioAutenticado = async (): Promise<User | null> => {
    try {
      // Retorna o usuário logado (como um User)
      return autenticacao.currentUser
    } catch (error: unknown) {
      error instanceof Error
      ? console.error(`Erro ao identificar usuário autenticado o usuário! (${error.message})`)
      : console.error(`Erro imprevisto: ${error}`)
      return null
    }
  }

  /*
  const alterarAutenticacaoUsuario = async (usuario: User, email: string, senha: string): Promise<boolean> => {
    try {    
      // Para alterar o usuário no Authentication é necessário:

        // Reautentica o usuário antes da alteração
        // const credencial = EmailAuthProvider.credential(emailAtual, senhaAtual)
        // await reauthenticateWithCredential(usuario, credencial)

        // Altera e-mail e senha
        // await updateEmail(usuario, emailNovo)
        // await updatePassword(usuario, senhaNovo) 

        // Envia e-mail de verificação
        // await sendEmailVerification(usuario)

        // *** Só depois que o usuário confirma o e-mail que a alteração é concluída

      return true
    } catch (error: unknown) {
      error instanceof Error 
      ? console.error(`Erro na alteração da autenticação do usuário! (${error.message})`)
      : console.error(`Erro imprevisto: ${error}`)
      return false
    }
  }
  */

  const excluirAutenticacaoUsuario = async (usuario: User, email: string, senha: string): Promise<boolean> => {
    try {
      // Recupera as credenciais do usuario logado
      const credencial = EmailAuthProvider.credential(email, senha)
      // Reautentica o usuário logado (por segurança o Authentication exige uma autenticação recente) 
      await reauthenticateWithCredential(usuario, credencial)
      // Exclui a autenticação do usuário
      await deleteUser(usuario)   
      return true
    } catch (error: unknown) {
      error instanceof Error 
      ? console.error(`Erro na exclusão da autenticação do usuário! (${error.message})`)
      : console.error(`Erro imprevisto: ${error}`)
      return false
    }
  }

  const validarUsuario = async (email: string, senha: string): Promise<boolean> => {
    try {
      // Verifica se o email e senha informados condizem com um usuário autenticado
      await signInWithEmailAndPassword(autenticacao, email, senha)

      const usuarioDados: UsuarioTipo = {
        codigo: autenticacao.currentUser?.uid,
        email: email,
        senha: senha
      }
      setUsuarioLogado(usuarioDados)

      return true
    } catch (error: unknown) {
      error instanceof Error
      ? console.error(`Erro na autenticação do usuário! (${error.message})`)
      : console.error(`Erro imprevisto: ${error}`)
      return false
    }
  }

  const deslogar = async (): Promise<boolean> => {
    try {
      await signOut(autenticacao)
      return true
    } catch (error: unknown) {
      error instanceof Error
      ? console.error(`Erro ao deslogar o usuário! (${error.message})`)
      : console.error(`Erro imprevisto: ${error}`)
      return false
    }
  }

  return (
    <AutenticacaoContexto.Provider 
      value={{ usuarioLogado, 
               criarAutenticacaoUsuario, 
               usuarioAutenticado,
               excluirAutenticacaoUsuario,
               validarUsuario, 
               deslogar }}
    >
      {children}
    </AutenticacaoContexto.Provider>
  )
}


export function useAutenticacao() {
  // Verifica se o contexto foi criado antes de disponibilizar o hook
  const contexto = useContext(AutenticacaoContexto)
  if (!contexto) {
    throw new Error("useAutenticacao deve ser usado dentro de AutenticacaoProvider")
  }
  return contexto
}