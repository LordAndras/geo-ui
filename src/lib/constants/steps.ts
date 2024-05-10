interface EditorStep {
    index: number,
    label: string,
    selected: boolean,
}

export const editorSteps: EditorStep[] = [
    {
        index: 0,
        label: 'Upload CSV',
        selected: true
    }, {
        index: 1,
        label: 'Map',
        selected: false
    }, {
        index: 2,
        label: 'Finalize',
        selected: false
    },
]
