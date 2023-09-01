

import React, { useEffect, useState } from 'react';

import { Subscriber } from '@fluyappgo/commons';
import { GeneralButton, GeneralInput, GeneralText, Lottie, Modal } from './general';
import { ProvidersServices } from '../services';
import Loading from '../assets/lottie/loading.json'

type Props = {
  setStep: Function;
  setSubscriber: Function;
  subscriber: Subscriber;
}
import data from '../assets/lottie/loading.json'

const Index = (props: Props) => {

  const { setStep, setSubscriber, subscriber } = props;
  const [loading, setLoading] = useState(false);

  const log = (data: string) => {
    (window as any).ipcRenderer.send('log', data)
  }


  useEffect(() => {
    setSubscriber({ name: '', lastname: '', documentId: '' })
  }, [])

  return (
    <div style={{ marginTop: 60 }}>
      <div style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {
          loading && <div className='absolute m-auto left-0 right-0'>
            <div className='mx-auto'>
              <Lottie source={Loading} />
            </div>

          </div>
        }

        <GeneralText label='BIENVENIDOsssss!' size={70} />
        <GeneralText label='Por favor, ingresa tu número de identificación' size={70} />
        <div className='mt-10'>
          <GeneralInput label='Ingresa tu número de cédula' type='phone-pad' size={40}
            onChange={(e: any) => {
              setSubscriber((prev: any) => ({ ...prev, documentId: e }))
            }}
          />
        </div>

        <div style={{ marginTop: 60 }}>
          <GeneralButton disabled={loading} title='Continuar' onPress={async () => {
            //setStep()

            try {

              setLoading(true);
              log('auth request');

              const msProviderAPi = new ProvidersServices(null);
              const responseToken: any = await msProviderAPi.login({
                username: 'xplor',
                password: 'xplor123'
              })

              log('auth completed');


              //await AsyncStorage.setItem('userToken', responseToken?.token)

              log(`getname requested - ${subscriber?.documentId}`);

              const msProviderAPix = new ProvidersServices({
                Authorization: 'Bearer ' + responseToken?.token
              });



              const responseName: any = await msProviderAPix.getName(subscriber?.documentId || '')

              log(`getname reponse - ${JSON.stringify(responseName)}`);

              if (responseName && responseName[0]) {
                log(`getname completed - ${subscriber?.documentId} // response: ${responseName[0].primerNombrePaciente} ${responseName[0].segundoNombrePaciente && responseName[0].segundoNombrePaciente != 'null' ? responseName[0].segundoNombrePaciente : ''}`);
                setStep({
                  type: 'done',
                  name: `${responseName[0].primerNombrePaciente} ${responseName[0].segundoNombrePaciente && responseName[0].segundoNombrePaciente != 'null' ? responseName[0].segundoNombrePaciente : ''}`,
                  lastname: responseName[0].primerApellidoPaciente,
                })
              } else {
                log('getname failed - bad response');
                setStep({ type: 'nonAuth' })
              }

              setLoading(false);

            } catch (e: any) {

              log(`fallo en servicios - ${subscriber?.documentId} - ${e?.message}`);
              setStep({ type: 'nonAuthx', message: e?.message || 'GENERAL' })
              setLoading(false);
              setStep({ type: 'nonAuth' })

            }

          }}
          />
        </div>
      </div>

    </div>
  );
};

export const DocumentId = Index;
