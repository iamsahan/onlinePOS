import React, { useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
    useEffect(() => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#scanner-container'),
                constraints: {
                    width: 900,
                    height: 600,
                    facingMode: "environment" // or "user" for front camera
                },
            },
            decoder: {
                readers: ["ean_reader"]
            }
        }, (err) => {
            if (err) {
                console.error("Failed to initialize Quagga: ", err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected(data => {
            onDetected(data.codeResult.code);
        });

        return () => {
            Quagga.stop();
        };
    }, [onDetected]);

    return <div id="scanner-container" style={{ display: 'none' }}></div>;
};

export default BarcodeScanner;
