import {
	Button,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { useInvoiceData } from '../../hooks/useInvoiceData';
import InvoiceList from '../tables/InvoiceList';

export default function Review({
	setOpenModal,
	onAction,
}: {
	setOpenModal: (value: boolean) => void;
	onAction: () => void;
}) {
	const { personalInformation, customerInformation } = useInvoiceData();

	return (
		<ModalContent>
			{() => (
				<>
					<ModalHeader className='flex flex-col gap-1'>
						Final Review
					</ModalHeader>
					<ModalBody>
						<p className='text-sm'>
							Please review the information entered before submitting. Accuracy
							is key!
						</p>
						<div>
							<span className='text-lg font-semibold'>
								Personal Information
							</span>
							<p className='bg-gray-700 bg-opacity-50 rounded-lg py-2 px-3 text-sm flex flex-col gap-2'>
								<span>Full Name: {personalInformation.fullname}</span>
								<span>ABN: {personalInformation.abn}</span>
								<span>Address: {personalInformation.address}</span>
								<span>Email: {personalInformation.email}</span>
								<span>Phone Number: {personalInformation.phoneNumber}</span>
							</p>
						</div>
						<div>
							<span className='text-lg font-semibold'>
								Customer Information
							</span>
							<p className='bg-gray-700 bg-opacity-50 rounded-lg py-2 px-3 text-sm flex flex-col gap-2'>
								<span>Full Name: {customerInformation.fullname}</span>
								<span>ABN: {customerInformation.abn}</span>
								<span>Address: {customerInformation.address}</span>
								<span>Email: {customerInformation.email}</span>
								<span>Phone Number: {customerInformation.phoneNumber}</span>
							</p>
						</div>
						<div>
							<span className='text-lg font-semibold'>
								Invoice item Details
							</span>
							<InvoiceList />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							color='danger'
							variant='light'
							onPress={() => setOpenModal(false)}
						>
							Edit
						</Button>
						<Button color='primary' onPress={onAction}>
							Finish
						</Button>
					</ModalFooter>
				</>
			)}
		</ModalContent>
	);
}
