import './global.css'
import { Rotas } from './rotas/Rotas'
import { AutenticacaoProvider } from './contextos/AutenticacaoContexto'

export function App() {
  return (
    <AutenticacaoProvider>
      <Rotas />
    </AutenticacaoProvider>
  )
}
