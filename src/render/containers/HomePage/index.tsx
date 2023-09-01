

import React, { useEffect, useRef, useState } from 'react';


import { Department, Service, Subscriber } from '@fluyappgo/commons';
import { Header } from '@/render/components/Header';
import { DocumentId } from '@/render/components/documentId';
import { NameLastName } from '@/render/components/name';
import { Departments } from '@/render/components/departments';
import { Services } from '@/render/components/services';
import { Ticketx } from '@/render/components/ticket';
import { Done } from '@/render/components/done';
import { Footer } from '@/render/components/footer';


const HomePage = () => {

  const [step, setStep] = useState(0);
  const [department, setDepartment] = useState<Department>({});
  const [service, setService] = useState<Service>({});
  const [subscriber, setSubscriber] = useState<Subscriber>({ name: '', lastname: '' });
  const ref = useRef(null)



  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='mx-20'>
        {
          step == 0 && <DocumentId subscriber={subscriber} setSubscriber={setSubscriber} setStep={(data: any) => {

            console.log(data)

            if (data?.type == 'nonAuth') {
              setStep(1)
            } else if (data?.type == 'done') {
              setSubscriber((aaa) => ({
                ...aaa,
                name: data.name,
                lastname: data.lastname
              }))
              setStep(2)
            } else {

            }


          }} />
        }
        {
          step == 1 && <NameLastName subscriber={subscriber} setSubscriber={setSubscriber} setStep={(auth: any) => {
            setStep(2)


          }} />
        }
        {
          step == 2 && <Departments subscriber={subscriber} setDepartment={setDepartment} setStep={(timeout: any) => {

            if (!timeout) {
              setStep(3)


            } else {

              setStep(0);
            }


          }} />
        }

        {
          step == 3 && <Services
            subscriber={subscriber}
            setService={setService}
            setStep={(e: boolean, timeout: any) => {

              if (!timeout) {
                if (e) {
                  setStep(2)
                } else {
                  setStep(4)
                }


              } else {
                setStep(0)
              }


            }}
            department={department}
          />
        }

        {
          step == 4 && <Ticketx
            department={department}
            service={service}
            subscriber={subscriber}
            setStep={(e: boolean) => {
              if (e) {
                setStep(0)
              } else {
                setStep(5)
              }

            }}
          />
        }
        {
          step == 5 && <Done
            service={service}
            subscriber={subscriber}
            setStep={() => {
              setStep(0)

              setSubscriber({ name: '', lastname: '' })


            }}
          />
        }
      </div>
      <div className='fixed bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 '>
          <Footer />
      </div>
    </div>
  );
};

export default HomePage;
