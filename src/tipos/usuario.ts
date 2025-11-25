export type UsuarioTipo = {
    codigo?: string | null
    autenticacao?: string | null
    nome?: string | null
    email?: string | null
    senha?: string | null
    permissao?: "Administrador" | "Membro" | "Convidado"
    dataCriacao?: string | null
}