

import React from 'react';
import { GeneralInput, GeneralText } from './general';
import { GeneralButton } from './general/button';
import { Subscriber } from '@fluyappgo/commons';


type Props = {
  setStep: Function;
  setSubscriber: Function;
  subscriber: Subscriber;
}

const Index = (props: Props) => {

  const { setStep, setSubscriber, subscriber } = props;

  return (
    <div style={{ marginTop: 60 }}>
      <div style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ marginTop: 10 }}>
          <GeneralText label='Ingresa tu nombre:' />
          <GeneralInput value={subscriber.name} label='Ingresa tu nombre' type='default'
            onChange={(e: any) => {
              setSubscriber((prev: any) => ({ ...prev, name: e.toUpperCase() }))
            }}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <GeneralText label='Ingresa tu apellido:' />
          <GeneralInput value={subscriber.lastname} label='Ingresa tu apellido' type='default'
            onChange={(e: any) => {
              setSubscriber((prev: any) => ({ ...prev, lastname: e.toUpperCase() }))
            }}
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <GeneralButton title='Continuar' onPress={() => {
            setStep()
          }}
          />
        </div>
      </div>

    </div>
  );
};

export const NameLastName = Index;
