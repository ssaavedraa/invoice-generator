import {
	Button,
	Input,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useInvoiceData } from '../../hooks/useInvoiceData';

interface Address {
	streetName: string;
	detail: string;
	postCode: string;
	suburb: string;
	state: string;
}
export default function Address({
	setIsOpenModal,
}: {
	setIsOpenModal: (value: boolean) => void;
}) {
	const [addressData, setAddressData] = useState<Address>({} as Address);
	const [fullAddress, setFullAddress] = useState<string>('');

	const { setAddress } = useInvoiceData();

	const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setAddressData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const onSave = () => {
		setAddress(fullAddress);
		setIsOpenModal(false);
	};

	useEffect(() => {
		setFullAddress(
			`${addressData.detail ?? ''} ${addressData.streetName ?? ''}, ${
				addressData.suburb ?? ''
			}, ${addressData.state ?? ''}, ${addressData.postCode ?? ''}, Australia`
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addressData]);

	return (
		<ModalContent>
			<ModalHeader className='flex flex-col gap1'>
				Edit Your Address
			</ModalHeader>
			<ModalBody>
				<form className='flex flex-col gap-4 capitalize'>
					<Input
						type='text'
						label='Street Name'
						className='w-full'
						size='sm'
						name='streetName'
						value={addressData.streetName}
						onChange={handleDataChange}
					/>
					<Input
						type='text'
						label='Unit, Apartment, Office, etc.'
						className='w-full'
						size='sm'
						name='detail'
						value={addressData.detail}
						onChange={handleDataChange}
					/>
					<div className='flex flex-row gap-4'>
						<Input
							type='text'
							label='Post Code'
							className='w-1/2'
							size='sm'
							name='postCode'
							value={addressData.postCode}
							onChange={handleDataChange}
						/>
						<Input
							type='text'
							label='Suburb'
							className='w-1/2'
							size='sm'
							name='suburb'
							value={addressData.suburb}
							onChange={handleDataChange}
						/>
					</div>
					{/* this should be select option */}
					<Input
						type='text'
						label='State'
						className='w-full'
						size='sm'
						name='state'
						value={addressData.state}
						onChange={handleDataChange}
					/>
				</form>
				<small>{fullAddress}</small>
			</ModalBody>
			<ModalFooter>
				<Button
					color='danger'
					variant='light'
					onPress={() => setIsOpenModal(false)}
				>
					Cancel
				</Button>
				<Button color='primary' onPress={onSave}>
					Save
				</Button>
			</ModalFooter>
		</ModalContent>
	);
}
