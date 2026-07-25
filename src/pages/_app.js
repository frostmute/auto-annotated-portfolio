import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`html { scroll-behavior: smooth; }`}</style>
            <Component {...pageProps} />
        </>
    );
}
