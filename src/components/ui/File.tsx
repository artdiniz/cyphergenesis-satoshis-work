import { useState } from "react"

export function File(props: {
    file: {
        path: string,
        content: string,
    }
}) {
    const file = props.file

    const [isPreview, setIsPreview] = useState(true)

    const onClickPreviewToggle = () => {
        setIsPreview(isPreview => !isPreview)
    }

    return (
        <>

            <div className="prompt">
                <div className="command">{file.path}</div>
                <div className="commandControls">
                    <div className="commandControlsItem" onClick={onClickPreviewToggle}>
                        {isPreview && 'expand' || 'collapse'}
                    </div>
                </div>
            </div>
            {!isPreview && (
                <div className="output">
                    {file.content}
                </div>
            )}
            {isPreview && (
                <div className="output preview">
                    {file.content} 
                </div>
            )}
        </>
    )
}