import { Input } from '@nextui-org/react';
import { useInformationValidation } from '../../hooks/useInformationValidation';
import { useInvoiceData } from '../../hooks/useInvoiceData';

export default function PersonalInformation({
	openModal,
}: {
	openModal?: (view: string) => void;
}) {
	const { personalInformation, updateFormData, currentStep } = useInvoiceData();

	const isValid = useInformationValidation(personalInformation);

	return (
		<div className='min-w-full scroll-snap-align-start'>
			<h1 className='font-bold text-3xl'>Personal Information</h1>
			<form className='mt-4 w-full flex flex-col gap-4 p-1'>
				<div className='flex flex-row gap-4'>
					<Input
						type='text'
						label='Full Name'
						className='w-1/2'
						size='sm'
						name='fullname'
						value={personalInformation.fullname}
						errorMessage={!isValid.fullname && 'Please enter a valid full name'}
						isInvalid={!isValid.fullname}
						color={isValid.fullname ? 'default' : 'danger'}
						tabIndex={currentStep === 1 ? 1 : -1}
						onChange={updateFormData}
					/>
					<Input
						type='text'
						label='ABN'
						className='w-1/2'
						size='sm'
						name='abn'
						maxLength={11}
						value={personalInformation.abn}
						errorMessage={
							!isValid.abn && 'Please enter a valid ABN (11 digits)'
						}
						isInvalid={!isValid.abn}
						color={isValid.abn ? 'default' : 'danger'}
						tabIndex={currentStep === 1 ? 2 : -1}
						onChange={updateFormData}
					/>
				</div>
				<Input
					type='text'
					label='Address'
					className='w-full'
					size='sm'
					value={personalInformation.address}
					name='address'
					errorMessage={!isValid.address && 'Please enter a valid address'}
					isInvalid={!isValid.address}
					color={isValid.address ? 'default' : 'danger'}
					tabIndex={currentStep === 1 ? 3 : -1}
					onClick={() => (openModal ? openModal('address') : () => {})}
					onChange={updateFormData}
				/>
				<Input
					type='email'
					label='Email'
					className='w-full'
					size='sm'
					name='email'
					errorMessage={!isValid.email && 'Please enter a valid email'}
					value={personalInformation.email}
					isInvalid={!isValid.email}
					color={isValid.email ? 'default' : 'danger'}
					tabIndex={currentStep === 1 ? 4 : -1}
					onChange={updateFormData}
				/>
				<Input
					type='text'
					label='Phone Number'
					className='w-full'
					size='sm'
					name='phoneNumber'
					maxLength={10}
					errorMessage={
						!isValid.phoneNumber && 'Please enter a valid phone number'
					}
					value={personalInformation.phoneNumber}
					isInvalid={!isValid.phoneNumber}
					color={isValid.phoneNumber ? 'default' : 'danger'}
					tabIndex={currentStep === 1 ? 5 : -1}
					onChange={updateFormData}
				/>
			</form>
		</div>
	);
}
