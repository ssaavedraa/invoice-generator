import { Input } from '@nextui-org/react';
import { useInvoiceData } from '../../hooks/useInvoiceData';

export default function CustomerInformation({
	openModal,
}: {
	openModal?: (view: string) => void;
}) {
	const { customerInformation, updateFormData, currentStep } = useInvoiceData();

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
						tabIndex={currentStep === 2 ? 1 : -1}
						onChange={updateFormData}
					/>
					<Input
						type='text'
						label='ABN'
						className='w-1/2'
						size='sm'
						value={customerInformation.abn}
						name='abn'
						tabIndex={currentStep === 2 ? 2 : -1}
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
					tabIndex={currentStep === 2 ? 3 : -1}
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
					tabIndex={currentStep === 2 ? 4 : -1}
					onChange={updateFormData}
				/>
				<Input
					type='text'
					label='Phone Number'
					className='w-full'
					size='sm'
					value={customerInformation.phoneNumber}
					name='phoneNumber'
					tabIndex={currentStep === 2 ? 5 : -1}
					onChange={updateFormData}
				/>
			</form>
		</div>
	);
}
