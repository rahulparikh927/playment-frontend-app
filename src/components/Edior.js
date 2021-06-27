import React from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";


function Editor(props) {
    const {
        language,
        displayName,
        value,
        theme,
        onChange
    } = props

    // const [open, setOpen] = useState(true)


    function handleChange(value) {
        onChange(value)
    }

    return (
        <div className="editor-container">
            <p>{displayName}</p>
            <AceEditor
                mode={language}
                theme={theme ? "monokai" : "github"}
                onChange={handleChange}
                name={language}
                editorProps={{ $blockScrolling: true }}
                fontSize={14}
                value={value}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </div>
    )
}

export default Editor