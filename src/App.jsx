import { useState } from 'react'

import Perfil from "./componemtes/Perfil"
import ReposList from './componemtes/Perfil/reposLIst'
import styles from './App.module.css'

function App() {
  const [nomeUsuario, setNomeUsuario] = useState('');

  return(
    <>
    <input className={styles.input} type="text" placeholder='Digite o usuário' onBlur={(e) => setNomeUsuario(e.target.value)} />
    
    {nomeUsuario.length > 4 && (
      <>
        <Perfil nomeUsuario={nomeUsuario}/>
        <ReposList nomeUsuario={nomeUsuario} />
      </>
    )}
    </>
  )
}

export default App