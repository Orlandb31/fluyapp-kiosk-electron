

import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { GeneralText, Lottie } from './general';
import { Branch, Department, Entity, EntityTreeUuid, Service, Subscriber, Ticket } from '@fluyappgo/commons';
import { EntitiesServices } from '../services';
import { GenerateTicketDTO } from '../helpers/dtos';
import { GeneralButton } from './general/button';
import { PrintButton } from './print';
import moment from 'moment';
import Printer from '../assets/lottie/print.json'
import { PosPrintData } from 'electron-pos-printer';


type Props = {
    setStep: Function;
    subscriber: Subscriber;
    service: Service;
    department: Department;
}




const Index = (props: Props) => {

    const { setStep, subscriber, service, department } = props;
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorName, setErrorName] = useState("")
    const [ticket, setTicket] = useState<Ticket>({})
    const [entity, setEntity] = useState<Entity>({});
    const [branch, setBranch] = useState<Branch>({});
    const [printing, setPrinting] = useState(false)

    const log = (data: string) => {
        (window as any).ipcRenderer.send('log', data)
    }

    const getEntity = async (ticket: Ticket) => {
        try {
            let msEntitiesApi = new EntitiesServices(null);
            const response = await msEntitiesApi.getEntity(ticket?.entityUuid || '');
            setEntity(response.data)
        } catch (e) {
            setEntity({})
        }
    }

    const getBranch = async (ticket: Ticket) => {
        try {
            let msEntitiesApi = new EntitiesServices(null);
            const response = await msEntitiesApi.getEntity(ticket?.entityUuid || '');
            setBranch(response.data)
        } catch (e) {
            setBranch({})
        }
    }

    useEffect(() => {

        if (ticket?.entityUuid) {
            getEntity(ticket)
        }

        if (ticket?.branchUuid) {
            getBranch(ticket)
        }

    }, [ticket?.entityUuid, ticket?.branchUuid])

    async function testPrint() {

        log("print request");

        try {
            setPrinting(true);

            let data: PosPrintData[] = [
                {
                    type: 'image',
                    url: entity?.config?.logo || 'https://fluyapp.com/images/logo.png',     // file path
                    position: 'center',                                  // position of image: 'left' | 'center' | 'right'
                    width: '200px',                                             // width of image in px; default: 50 or '50px'
                },
                {
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: branch?.branchName || '',
                    style: { textAlign: 'center', fontSize: "14px", marginTop: '15px' }
                },
                {
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: 'BIENVENIDO',
                    style: { textAlign: 'center', fontSize: "14px" }
                },
                {
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: `${ticket?.subscriber?.name} ${ticket?.subscriber?.lastname}`,
                    style: { fontWeight: "700", textAlign: 'center', fontSize: "18px" }
                },
                {
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: `${ticket?.ticketLabel}`,
                    style: { fontWeight: "700", textAlign: 'center', fontSize: "22px" }
                },
                {
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: `${department?.departamentName} - ${service?.serviceName}`,
                    style: { fontWeight: "700", textAlign: 'center', fontSize: "14px" }
                },
                {
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: `FECHA Y HORA DE EMISIÓN:`,
                    style: { fontWeight: "700", textAlign: 'center', fontSize: "14px" }
                },
                {
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: moment(ticket.dateRaw).format("DD/MM/YYYY hh:mm a"),
                    style: { fontWeight: "700", textAlign: 'center', fontSize: "14px", marginBottom: '30px' }

                }

            ];

            service?.requirements?.forEach((req: any, index: any) => {


                data.push({
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: req?.value,
                    style: { fontWeight: "700", textAlign: 'left', fontSize: "12px" }

                })


            });


            data.push({
                type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                value: '.',
                style: { fontWeight: "700", textAlign: 'left', fontSize: "12px", marginTop: '20px' }

            });

            (window as any).ipcRenderer.send('print', JSON.stringify(data))


            setTimeout(() => {
                setPrinting(false)
            }, 1500);

            log("print completed");

        } catch (e) {
            log(`print failed ${e?.message} `);
            console.log('Error:', e)
            setPrinting(false)
        }
    }




    const getTicket = async () => {

        try {
            log(`getTicket request`);
            setLoading(true)
            const msEntitiesApi = new EntitiesServices(null)

            const entityTree: EntityTreeUuid = {
                entityUuid: '',
                branchUuid: '',
                departmentUuid: '',
                serviceUuid: service?.uuid || ''
            }

            const data: GenerateTicketDTO = {
                entityTree: entityTree,
                ticket: {
                    subscriber: {
                        ...subscriber,
                        email: 'hola@aaa.com',
                        phones: ['']
                    },
                    comment: ''
                },
                nextBlock: 1
            };

            console.log(data)

            const ticketx = await msEntitiesApi.generateTicket(data);
            setError(false)
            setLoading(false)

            setTicket(ticketx.data)

            log(`getTicket completed - ${ticketx?.data?.uuid} // ${ticketx?.data?.ticketLabel}`);

        } catch (e: any) {
            log(`getTicket failed - ${e?.message}`);
            setErrorName(e?.message)
            setError(true)
        }

    }

    useEffect(() => {

        getTicket()

        const xxx = setTimeout(() => {

            setStep(false)

        }, 60000);


        return () => {
            clearTimeout(xxx)
        }

    }, [])

    useEffect(() => {

        let timer: any;

        if (error) {
            timer = setTimeout(() => {
                setStep(true)
            }, 7500);
        }

        return () => {
            if (timer)
                clearTimeout(timer)
        }
    }, [error])


    if (error) {
        return <div style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Lottie source={require('../assets/lottie/error.json')}
            />
            <GeneralText size={40} label={errorName} />
        </div>
    }


    if (loading) {
        return <div style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Lottie source={require('../assets/lottie/loading.json')}
            />
        </div>
    }


    return (
        <div style={{ marginTop: 20 }}>
            <div className='flex flex-col justify-center items-center' >

                <GeneralText size={40} label='Es un gusto servirte, tu turno fue asignado.' />
                <GeneralText size={40} label='selecciona:' />

                <div className='flex flex-rows'>

                    <div className='w-100'>
                        <GeneralText size={40} label='Escanear turno' />
                        <div style={{ marginTop: 20 }}>
                            <QRCode
                                value={`https://fluyapp.com/ticket-tracking/${ticket.uuid}`}
                                size={250}
                            />
                        </div>
                    </div>
                    <div className='w-100' style={{ marginLeft: 20, marginRight: 20 }}>
                        <GeneralText size={40} label='o' />
                    </div>
                    <div className='w-100' >
                        <GeneralText size={40} label='Imprimir turno' />
                        <div style={{ marginTop: 20, marginLeft: 20 }}>
                            <Lottie height={175} width={150} source={Printer} />
                        </div>
                        <div
                            style={{
                                borderWidth: 1,
                                borderColor: 'white',
                                borderRadius: 20,
                                padding: 15,
                                marginTop: 20
                            }}
                            onClick={() => {
                                if (!printing)
                                    testPrint()
                            }}>
                            <GeneralText size={20} label='Imprimir ticket' />
                        </div>
                    </div>
                </div>
            </div>


            <div style={{ marginTop: 20 }}>
                {printing && <GeneralText size={25} label='Imprimiendo...' />}
            </div>


            <div style={{
                marginTop: 30, alignItems: 'center',
                justifyContent: 'center'
            }}>

                <GeneralButton title='Finalizar' onPress={async () => {

                    setStep(false)

                }} />
            </div>
        </div>
    );
};

export const Ticketx = Index;
