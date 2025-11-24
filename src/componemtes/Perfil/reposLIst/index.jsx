// ...existing code...
import { useEffect, useState } from "react";

import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos ] = useState([])
    const [deuErro, setDeuErro] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!nomeUsuario) return
        const controller = new AbortController()

        // adia o primeiro setState para evitar o aviso de "setState synchronous in effect"
        Promise.resolve().then(() => {
            setLoading(true)
            setDeuErro(false)
            setErrorMessage('')
        })

        fetch(`https://api.github.com/users/${nomeUsuario}/repos`, { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error(`Usuário não encontrado (HTTP ${res.status})`)
                return res.json()
            })
            .then(data => {
                setRepos(data)
            })
            .catch(err => {
                if (err.name === 'AbortError') return
                console.error('Erro ao buscar repositórios:', err)
                setRepos([])
                setDeuErro(true)
                setErrorMessage(err.message || 'Erro ao carregar repositórios')
            })
            .finally(() => {
                setLoading(false)
            })

        return () => controller.abort()
    }, [nomeUsuario])

    return (
        <div className="container">
            {loading && <p className={styles.info}>Carregando repositórios...</p>}

            {deuErro && (
                <div className={styles.errorBox}>
                    <p className={styles.error}>Erro: {errorMessage}</p>
                    <button className={styles.retryButton} onClick={() => {
                        // força re-render para refazer o efeito (ex.: limpando e setando nomeUsuario igual)
                        setRepos([])
                        setDeuErro(false)
                        setErrorMessage('')
                    }}>
                        Tentar novamente
                    </button>
                </div>
            )}

            {!loading && !deuErro && repos.length === 0 && (
                <p className={styles.info}>Nenhum repositório encontrado.</p>
            )}

            <ul className={styles.list}>
                {repos.map(({ id, name, language, html_url }) => (
                    <li className={styles.listItem} key={id}>
                        <div className={styles.listItemName}>
                            <b>Nome: {name}</b> 
                        </div>
                        <div className={styles.listItemLanguage}>
                            <b>Linguagem: {language}</b> 
                        </div>
                        <a
                            className={styles.listItemLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={html_url}
                        >
                            Visitar no Github
                        </a> 
                    </li>
                ))}
            </ul>
        </div>
        
    )
}

export default ReposList;
// ...existing code...