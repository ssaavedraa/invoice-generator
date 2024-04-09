import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import InvoiceDataContextProvider from './context/InvoiceDataContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<NextUIProvider>
			<InvoiceDataContextProvider>
				<App />
			</InvoiceDataContextProvider>
		</NextUIProvider>
	</React.StrictMode>
);
