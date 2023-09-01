import React from 'react';

type Props = {
    label: string;
    size?: number;
    color?: string;
}


export const GeneralText = (props: Props) => {

    const { label, size, color } = props;

    return <div className='flex flex-col'>
        <label style={{
            color: color || 'white',
            fontSize: size || 40,
            fontWeight: "bold",
            fontFamily: 'Roboto',
            textAlign: 'center'
        }}>
            {label}
        </label>
    </div>
}

