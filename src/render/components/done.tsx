

import React, { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import { EntityTreeUuid, Service, Subscriber, Ticket } from '@fluyappgo/commons';
import { GeneralText } from './general';

type Props = {
    setStep: Function;
    subscriber: Subscriber;
    service: Service;
}

const Index = (props: Props) => {

    const { setStep, subscriber, service } = props;
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [ticket, setTicket] = useState<Ticket>({})



    useEffect(() => {

        const xxx = setTimeout(() => {
            setStep()
        }, 7000);

        return  () =>{
            clearTimeout(xxx)
        }

    }, [])





    return (
        <div style={{ marginTop: 20 }}>
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 40
            }}>
                <GeneralText size={50} label={`Es un gusto poder servirte, guarda tu ticket y espera ser llamado por tu nombre.`} />
            </div>
            <div style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <GeneralText size={90} label='¡BIENVENIDO!' />
            </div>
        </div>
    );
};

export const Done = Index;
