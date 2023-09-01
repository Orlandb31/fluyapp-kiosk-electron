import React from 'react';

type Props = {
    onPress: Function;
    title: string;
    theme?: number;
    disabled?: boolean;
}

const Index = (props: Props) => {
    const { onPress, title = 'Save', theme = 1,disabled } = props;
    return (
        <div className="flex flex-col justify-center items-center">
            <button 
                disabled={disabled || false}
                type="button"
                className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold
             text-gray-900 shadow-sm ring-1 ring-inset 
             ring-gray-300 hover:bg-gray-50 ${theme == 1 ? '' : ''}`}
                style={{
                    width: 800,
                    fontSize: 40,
                    padding: 30
                }}
                onClick={() => { onPress() }}
            >
                {title}
            </button>
        </div>
    );
}


export const GeneralButton = Index;