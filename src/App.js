import { useEffect, useState } from 'react';
import './css/App.css';
import Editor from './components/Edior';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
    const [html, setHtml] = useLocalStorage('html', '')
    const [css, setCss] = useLocalStorage('css', '')
    const [js, setJs] = useLocalStorage('js', '')
    const [srcDoc, setSrcDoc] = useState('')
    const [theme, setTheme] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
			<html>
				<body>${html}</body>
				<style>${css}</style>
				<script>${js}</script>
			</html
			`)
        }, 250)

        return () => clearTimeout(timeout)
    }, [html, css, js])

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([srcDoc], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
    }

    const toggleTheme = () => {
        setTheme(!theme)
    }

    return (
        <>
            <div className="top-bar">
                <button onClick={toggleTheme}>Toggle Theme ({theme ? "light" : "dark"})</button>
                <button onClick={downloadTxtFile}>Donwload</button>
            </div>
            <div className="pane top-pane">
                <Editor
                    language="html"
                    displayName="HTML"
                    value={html}
                    onChange={setHtml}
                    theme={theme}
                />
                <Editor
                    language="css"
                    displayName="CSS"
                    value={css}
                    onChange={setCss}
                    theme={theme}
                />
                <Editor
                    language="javascript"
                    displayName="JS"
                    value={js}
                    onChange={setJs}
                    theme={theme}
                />
            </div>
            <div className="pane">

                <iframe
                    srcDoc={srcDoc}
                    title="Output"
                    sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                />
            </div>
        </>
    );
}

export default App;
