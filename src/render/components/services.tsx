

import React, { useEffect, useState } from 'react';
import { GeneralInput, GeneralText, Lottie } from './general';
import { Department, Service, Subscriber } from '@fluyappgo/commons';
import { EntitiesServices } from '../services';
import { ItemService } from './itemService';
import { GeneralButton } from './general/button';
import Laoding from '../assets/lottie/loading.json'

type Props = {
  setStep: Function;
  department: Department;
  setService: Function;
  subscriber: Subscriber;
}

const Index = (props: Props) => {

  const { setStep, department, setService, subscriber } = props;
  const [services, setServices] = useState<Service[]>([])
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [loading, setLoading] = useState(true)
  
  const log = (data: string) => {
    (window as any).ipcRenderer.send('log', data)
  }

  const getServices = async (uuid: string) => {

    try {

      log(`services request - ${uuid}`)

      let msEntitiesApi = new EntitiesServices(null);
      const response = await msEntitiesApi.getServices(uuid);
      setLoading(true)

      let services = response?.data?.rows;

      console.log(JSON.stringify(services));

      setServices(services)

      setTimeout(() => {
        setLoading(false)
      }, 750);


      log(`services completed - ${uuid}`)


    } catch (e) {

      log(`services failed ${e?.message}`)

      setTimeout(() => {
        setLoading(false)
      }, 750);

    }

  }


  useEffect(() => {
    getServices(department?.uuid || '')

    let timer1 = setTimeout(() => {

      setStep(true, true)

    }, 6000 * 1000);

    return () => {
      clearTimeout(timer1);
    };

  }, [department?.uuid])

  if (loading) {
    return <div>
      <Lottie source={Laoding} />
    </div>
  }


  return (

    <div style={{ marginTop: 0 }}>
      <div style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <GeneralText label={`Selecciona tu aseguradora`} />
        <div className='grid grid-cols-5 gap-4 pt-10'>
          {
            services && services?.length > 0
            && services?.sort((a, b) => (a.order || 100) - (b.order || 100)).map((service: Service, index: number) => {
              return <ItemService selected={service.uuid == selectedItem?.uuid} title={service.serviceName || ''} onPress={() => {
                setSelectedItem(service)
              }} i={index} maxi={6} url={service?.config?.logo || ''} />
            })
          }
        </div>
        <div style={{ marginTop: 30 }}>
          {
            selectedItem?.uuid && <GeneralButton title='Continuar' onPress={async () => {

              setService(selectedItem)
              setStep()

            }} />
          }
        </div>
        <div style={{ marginTop: 30 }}>
          {
            <GeneralButton theme={2} title='Atrás' onPress={async () => {

              setService(selectedItem)
              setStep(true)

            }} />
          }
        </div>
      </div>


    </div>

  );
};

export const Services = Index;
