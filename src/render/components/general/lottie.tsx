import React from "react";
import LottieD from 'react-lottie';

type Props = {
    source: any;
    height?: number;
    width?: number;
}

export const Lottie = (props: Props) => {

    const { source, height, width } = props;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: source,
        rendererSettings: {   
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <LottieD
                options={defaultOptions}
                height={height || 400}
                width={width || 400}
            />
        </div>
    );
}