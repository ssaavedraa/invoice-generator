import { useMemo } from 'react';
import {
	CustomerInformation,
	PersonalInformation,
} from '../context/InvoiceDataContext';

export const useInformationValidation = (
	data: PersonalInformation | CustomerInformation,
	allowEmptyAbn: boolean = false
) => {
	const validationStatus = useMemo(() => {
		const abnRegex = /^\d{11}$/;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const fullNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*(?:-[A-Za-z]+)*$/;

		const phoneRegex = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;

		const isFullnameValid = fullNameRegex.test(data?.fullname?.trim());
		const isAbnValid = allowEmptyAbn
			? true
			: data.abn
			? abnRegex.test(data?.abn?.trim())
			: true;
		const isEmailValid =
			emailRegex.test(data?.email?.trim()) || data?.email === undefined;
		const isPhoneNumberValid =
			phoneRegex.test(data?.phoneNumber?.trim()) ||
			data?.phoneNumber === undefined;

		return {
			fullname: isFullnameValid,
			abn: isAbnValid,
			address: !!data?.address?.trim() || data?.address === undefined,
			email: isEmailValid,
			phoneNumber: isPhoneNumberValid,
		};
	}, [data, allowEmptyAbn]);

	return validationStatus;
};
