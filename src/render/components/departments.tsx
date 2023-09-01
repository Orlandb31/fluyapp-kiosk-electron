

import React, { useEffect, useState } from 'react';
import { GeneralInput, GeneralText, Lottie } from './general';
import { GeneralButton } from './general/button';
import { Department, Subscriber } from '@fluyappgo/commons';
import { Item } from './item';
import { EntitiesServices } from '../services';
import Laoding from '../assets/lottie/loading.json'

type Props = {
  setStep: Function;
  setDepartment: Function;
  subscriber: Subscriber;
}

const Index = (props: Props) => {

  const { setStep, setDepartment, subscriber } = props;
  const [departments, setDepartments] = useState<Department[]>([])
  const [departmentsPreferencial, setDepartmentsPreferencial] = useState<Department[]>([])
  const [preferencial, setPreferencial] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const [settings, setSettings] = useState<any>({})

  const log = (data: string) => {
    (window as any).ipcRenderer.send('log', data)
  }

  const listen = () => {

    (window as any).ipcRenderer.onResponse((json: any) => { setSettings(json);  setReady(true);  });
    (window as any).ipcRenderer.send('readconfig', {})
  }

  const getDepartments = async () => {

    try {

      setLoading(true)
      let msEntitiesApi = new EntitiesServices(null);

      log(`getDepartments requested ${settings.branchUuid}`);

      const response = await msEntitiesApi.getDepartments(settings.branchUuid);

      log(`getDepartments completed ${settings.branchUuid}`);

      let departments = response?.data?.rows;
      let resultTickets: any = []
      let resultTicketsx: any = []

      departments?.forEach((department: Department) => {

        if (department.state) {
          if (department.departamentName?.match(/Preferencial/)) {
            resultTicketsx.push(department)
          } else {
            resultTickets.push(department)
          }
        }

      })

      setDepartments(resultTickets)
      setDepartmentsPreferencial(resultTicketsx)

      setTimeout(() => {
        setLoading(false)
      }, 750);

    } catch (e) {
      setTimeout(() => {
        setLoading(false)
      }, 750);
    }

  }


  useEffect(() => {

    listen();

  }, [])


  useEffect(() => {

    if (!ready) {
      return;
    }

    getDepartments()

    let timer1 = setTimeout(() => {

      setStep(true)

    }, 8000 * 1000);

    return () => {
      clearTimeout(timer1);
    };

  }, [ready, settings])

  if (loading) {
    return <div>
      <Lottie source={Laoding} />
    </div>
  }

  return (
    <div style={{}}>
      <div>
        <GeneralText label={`Hola ${subscriber?.name}, elige el servicio requerido:`} />
        <div className='grid grid-cols-2 pt-10'>
          {
            !preferencial && departments && departments?.length > 0 && departments?.sort((a, b) => (a.order || 100) - (b.order || 100)).map((department: Department, index: number) => {
              return <Item title={department.departamentName || ''} onPress={() => {
                setStep()
                setDepartment(department)
              }} i={index} />
            })
          }
          {
            preferencial && departmentsPreferencial && departmentsPreferencial?.length > 0 && departmentsPreferencial?.sort((a, b) => (a.order || 100) - (b.order || 100)).map((department: Department, index: number) => {
              return <Item title={department.departamentName?.replace('Preferencial', '') || ''} onPress={() => {
                setStep()
                setDepartment(department)
              }} i={index + 4} />
            })
          }
        </div>
      </div>
      {
        !preferencial && <div style={{ marginTop: 20 }}>
          <div style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Item title={'Preferencial'} onPress={() => { setPreferencial(true) }} i={0} />
          </div>
        </div>
      }
    </div>
  );
};

export const Departments = Index;
