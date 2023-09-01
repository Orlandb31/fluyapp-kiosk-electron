import * as React from 'react';



type Props = {

}


export const PrintButton = (props: Props) => {
    const [init, setInit] = React.useState(false);
    const [printer, setPrinter] = React.useState<any>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
       /*  EscPosPrinter.addPrinterStatusListener((status) => {
            console.log('current printer status:', status);
        }); */
    }, []);
    React.useEffect(() => {
        console.log(printer);
    }, [printer]);

    return (
        null
    );
}

