
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import styles from './page.module.css'


export default function Home() {
  return (
    <div>
      <Navbar>
        <h1>Store</h1>
        <div className={styles.navLink}>
          <Link href='/login'>Iniciar sesión</Link>
          <Link href='/register'>Registrar</Link> 
        </div>
      </Navbar>
      <main>
        <div className={styles.heroSection}>
          <h2 className={styles.titleHero}>Bienvenidos a nuestra tienda</h2>
        </div>
      </main>
    </div>
    
  );
}
