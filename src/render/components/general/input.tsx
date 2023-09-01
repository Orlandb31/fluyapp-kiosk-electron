import React from 'react';

type Props = {
    label: string;
    type: string;
    onChange: any;
    value?: any;
    size?: any;
}


export const GeneralInput = (props: Props) => {

    const { label, type, onChange, value, size } = props;

    return <div className="flex flex-col justify-center items-center">
        <input
            className='mx-auto '
            value={value}
            maxLength={16}
            placeholder={label}
            style={{
                borderColor: 'white',
                borderWidth: 2, 
                borderRadius: 10,
                marginTop: 20,
                color: 'black',
                fontSize: size || 30,
                width: 800,
                padding: 30,
            }}
            onChange={(e)=>{
                onChange(e?.target?.value || '')
            }}
        />
    </div>


}

