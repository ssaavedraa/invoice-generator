import { Input } from '@nextui-org/react';
import { useInvoiceData } from '../../hooks/useInvoiceData';

export default function CustomerInformation({
	openModal,
}: {
	openModal?: (view: string) => void;
}) {
	const { customerInformation, updateFormData } = useInvoiceData();

	return (
		<div className='min-w-full scroll-snap-align-start'>
			<h1 className='font-bold text-3xl'>Customer Information</h1>
			<form className='mt-4 w-full flex flex-col gap-4 p-1'>
				<div className='flex flex-row gap-4'>
					<Input
						type='text'
						label='Name'
						className='w-1/2'
						size='sm'
						value={customerInformation.fullname}
						name='fullname'
						onChange={updateFormData}
					/>
					<Input
						type='text'
						label='ABN'
						className='w-1/2'
						size='sm'
						value={customerInformation.abn}
						name='abn'
						onChange={updateFormData}
					/>
				</div>
				<Input
					type='text'
					label='Address'
					className='w-full'
					size='sm'
					value={customerInformation.address}
					name='address'
					onClick={() => (openModal ? openModal('address') : () => {})}
					onChange={updateFormData}
				/>
				<Input
					type='email'
					label='Email'
					className='w-full'
					size='sm'
					value={customerInformation.email}
					name='email'
					description='This is the email where we are going to send your invoice'
					onChange={updateFormData}
				/>
				<Input
					type='text'
					label='Phone Number'
					className='w-full'
					size='sm'
					value={customerInformation.phoneNumber}
					name='phoneNumber'
					onChange={updateFormData}
				/>
			</form>
		</div>
	);
}
