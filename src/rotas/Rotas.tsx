import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../paginas/Login'
import { Inicial } from '../paginas/Inicial'
import { ListaFilmes } from '../paginas/ListaFilmes'
import { Usuario } from '../paginas/Usuario'
import { Fundamentos } from '../paginas/Fundamentos'
import { AvaliacaoFilme } from '../paginas/AvaliacaoFilme'
import { ProtecaoRotas } from './ProtecaoRotas'

export function Rotas(){
    return(
        <BrowserRouter>
        
            <Routes>

                <Route path='/' element={ <Login /> } />
                <Route path='usuarioNovo' element={ <Usuario operacao='novo' /> } />
                <Route path='fundamentos' element={ <Fundamentos /> } />
                <Route path='inicial' element={ <ProtecaoRotas><Inicial /></ProtecaoRotas>   } >
                    <Route index element={ <ProtecaoRotas><ListaFilmes /></ProtecaoRotas> } />
                    <Route path='usuarioExistente' element={ 
                        <ProtecaoRotas><Usuario operacao='perfil' /></ProtecaoRotas> 
                    } />
                    <Route path='avaliacao' element={ <ProtecaoRotas><AvaliacaoFilme /></ProtecaoRotas> } />
                </Route>

            </Routes>

        </BrowserRouter>
    )
}
