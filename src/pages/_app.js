import '../css/main.css';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('../components/ParticleField'), {
    ssr: false
});

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`html { scroll-behavior: smooth; }`}</style>
            <ParticleField />
            <Component {...pageProps} />
        </>
    );
}
