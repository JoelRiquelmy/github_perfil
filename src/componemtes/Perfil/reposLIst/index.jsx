import { useEffect, useState } from "react";

import styles from './ReposList.module.css'

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos ] = useState([])
    

    useEffect(() => {
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            setRepos(resJson)
        })
    }, [nomeUsuario])

    return (
        <div className="container">
            <ul className={styles.list}>
                {repos.map(({ id, name, language, html_url }) => (
                    <li className={styles.listItem} key={id}>
                        <div className={styles.listItemName}>
                            <b >Nome: {name}</b> 
                        </div>
                        <div className={styles.listItemLanguage} >
                            <b >Linguagem: {language}</b> 
                        </div>
                        
                        <a className={styles.listItemLink} target="_blank" href={html_url}>Visitar no Github</a> 
                    </li>
                ))}
            </ul>
        </div>
        
    )
}

export default ReposList;