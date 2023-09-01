

import React, { useEffect, useRef, useState } from 'react';


import { Department, Service, Subscriber } from '@fluyappgo/commons';
import { Header } from '@/render/components/Header';
import { DocumentId } from '@/render/components/documentId';
import { NameLastName } from '@/render/components/name';
import { Departments } from '@/render/components/departments';
import { Services } from '@/render/components/services';
import { Ticketx } from '@/render/components/ticket';
import { Done } from '@/render/components/done';


const HomePage = () => {

  const [step, setStep] = useState(0);
  const [department, setDepartment] = useState<Department>({});
  const [service, setService] = useState<Service>({});
  const [subscriber, setSubscriber] = useState<Subscriber>({ name: '', lastname: '' });
  const ref = useRef(null)
  const scrollRef = useRef<any>();



  return (
    <div style={{ backgroundColor: '#002a64' }}>
      <Header />
      <div style={{}}>
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

            scrollRef.current?.scrollTo({
              y: 0,
              animated: true
            });

          }} />
        }
        {
          step == 1 && <NameLastName subscriber={subscriber} setSubscriber={setSubscriber} setStep={(auth: any) => {
            setStep(2)

            scrollRef.current?.scrollTo({
              y: 0,
              animated: true
            });

          }} />
        }
        {
          step == 2 && <Departments subscriber={subscriber} setDepartment={setDepartment} setStep={(timeout: any) => {

            if (!timeout) {
              setStep(3)

              scrollRef.current?.scrollTo({
                y: 0,
                animated: true
              });
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

                scrollRef.current?.scrollTo({
                  y: 0,
                  animated: true
                });
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

              scrollRef.current?.scrollTo({
                y: 0,
                animated: true
              });

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

              scrollRef.current?.scrollTo({
                y: 0,
                animated: true
              });

            }}
          />
        }
      </div>
    </div>
  );
};

export default HomePage;
