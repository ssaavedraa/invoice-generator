import CustomerInformation from './forms/CustomerInformation';
import InvoiceItems from './forms/InvoiceItems';
import PersonalInformation from './forms/PersonalInformation';

export default function FormCarousel({
	currentStep,
	openModal,
}: {
	currentStep: number;
	openModal?: (view: string) => void;
}) {
	return (
		<div className='flex flex-row flex-nowrap gap-4'>
			<PersonalInformation openModal={openModal} />
			<CustomerInformation />
			<InvoiceItems isActive={currentStep === 3} />
		</div>
	);
}
