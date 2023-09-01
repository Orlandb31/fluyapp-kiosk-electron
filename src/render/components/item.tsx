import React from 'react';


type Props = {
    onPress: Function;
    title: string;
    i: number;
    maxi?: number;
}



const Index = (props: Props) => {

    const { onPress, title = 'Save', i = 1, maxi = 2 } = props;

    const cardGap = 16;

    return (
        <div
            className='pointer bg-white m-4 rounded p-4 text-center'
            key={i}
            onClick={() => { onPress() }}
            
            >
            <h2 style={{
                fontSize: 60,
                fontWeight: 'bold',
                letterSpacing: 0.25,
                color: '#002a64'
            }}>{title}</h2>
        </div>
    );
}




export const Item = Index;