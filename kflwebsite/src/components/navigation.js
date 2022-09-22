import React from 'react'
import { Link } from 'gatsby'

import * as styles from './navigation.module.css'

const Navigation = () => (
  <nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <span className={styles.logo} />
      <span className={styles.navigationItem}>Kamratförbundet Lärkorna</span>
    </Link>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Hem
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/" activeClassName="active">
          Nyheter
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Bli medlem
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
