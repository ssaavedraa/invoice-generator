import { ChangeEvent, useContext } from 'react';
import { InvoiceDataContext, InvoiceItem } from '../context/InvoiceDataContext';

export const useInvoiceData = () => {
	const {
		currentStep,
		invoiceItemList,
		setPersonalInformation,
		setCustomerInformation,
		setInvoiceItemList,
		personalInformation,
		setCurrentStep,
		customerInformation,
	} = useContext(InvoiceDataContext);

	const updateFormData = (
		event?: ChangeEvent<HTMLInputElement>,
		invoiceItemData: InvoiceItem = {} as InvoiceItem
	) => {
		const { name, value } = event?.target ?? {};

		if ((name === 'abn' || name === 'phoneNumber') && isNaN(Number(value))) {
			return; // Don't update the state
		}

		switch (currentStep) {
			case 1:
				setPersonalInformation((prevState) => ({
					...prevState,
					[name as string]: value,
				}));
				break;
			case 2:
				setCustomerInformation((prevState) => ({
					...prevState,
					[name as string]: value,
				}));
				break;
			case 3:
				setInvoiceItemList((prevState) => [
					...prevState,
					{ ...invoiceItemData, key: invoiceItemList.length },
				]);
		}
	};

	const setAddress = (fullAddress: string) => {
		switch (currentStep) {
			case 1:
				setPersonalInformation((prevState) => ({
					...prevState,
					address: fullAddress,
				}));
				break;
			case 2:
				setCustomerInformation((prevState) => ({
					...prevState,
					address: fullAddress,
				}));
				break;
		}
	};

	return {
		updateFormData,
		personalInformation,
		currentStep,
		setCurrentStep,
		customerInformation,
		setCustomerInformation,
		invoiceItemList,
		setAddress,
	};
};
