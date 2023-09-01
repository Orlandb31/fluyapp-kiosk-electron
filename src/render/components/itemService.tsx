import React from 'react';

type Props = {
    onPress: Function;
    title: string;
    i: number;
    maxi?: number;
    url: string;
    selected?: boolean;
}



const Index = (props: Props) => {

    const { onPress, title = 'Save', i = 1, maxi = 2, url, selected } = props;



    return (
        <div
            className={`rounded-lg flex align-items-center justify-center text-center p-2 ${selected ? 'bg-gray-400' : 'bg-white'}`}
            key={i}
            onClick={() => { onPress() }}>
            <img src={url} style={{ width: 240, height: 80, opacity: selected ? 0.7 : 1 }} />
        </div>
    );
}


export const ItemService = Index; 