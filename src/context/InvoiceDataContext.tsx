import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from 'react';

export interface PersonalInformation {
	fullname: string;
	abn: string;
	address: string;
	email: string;
	phoneNumber: string;
}

export interface CustomerInformation {
	fullname: string;
	abn?: string;
	address: string;
	email: string;
	phoneNumber: string;
}

export interface InvoiceItem {
	description: string;
	quantity: string;
	price: string;
	key: number;
}

interface InvoiceDataContextInterface {
	personalInformation: PersonalInformation;
	customerInformation: CustomerInformation;
	invoiceItemList: InvoiceItem[];
	currentStep: number;
	setPersonalInformation: Dispatch<SetStateAction<PersonalInformation>>;
	setCustomerInformation: Dispatch<SetStateAction<CustomerInformation>>;
	setInvoiceItemList: Dispatch<SetStateAction<InvoiceItem[]>>;
	setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const InvoiceDataContext = createContext<InvoiceDataContextInterface>({
	personalInformation: {} as PersonalInformation,
	customerInformation: {} as CustomerInformation,
	invoiceItemList: [] as InvoiceItem[],
	currentStep: 1,
	setPersonalInformation: () => {},
	setCustomerInformation: () => {},
	setInvoiceItemList: () => {},
	setCurrentStep: () => {},
});

export default function InvoiceDataContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [personalInformation, setPersonalInformation] = useState(
		{} as PersonalInformation
	);
	const [customerInformation, setCustomerInformation] = useState(
		{} as CustomerInformation
	);
	const [invoiceItemList, setInvoiceItemList] = useState<InvoiceItem[]>([]);
	const [currentStep, setCurrentStep] = useState<number>(1);

	return (
		<InvoiceDataContext.Provider
			value={{
				personalInformation,
				customerInformation,
				invoiceItemList,
				currentStep,
				setPersonalInformation,
				setCustomerInformation,
				setInvoiceItemList,
				setCurrentStep,
			}}
		>
			{children}
		</InvoiceDataContext.Provider>
	);
}
