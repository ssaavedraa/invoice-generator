import { Button, Input } from '@nextui-org/react';
import { ChangeEvent, useState } from 'react';
import { InvoiceItem } from '../../context/InvoiceDataContext';
import { useInvoiceData } from '../../hooks/useInvoiceData';
import InvoiceList from '../tables/InvoiceList';

export default function InvoiceItems({ isActive }: { isActive: boolean }) {
	const [invoiceItemData, setInvoiceItemData] = useState<InvoiceItem>(
		{} as InvoiceItem
	);

	const { invoiceItemList, updateFormData, currentStep } = useInvoiceData();

	const handleFormDataChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setInvoiceItemData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const addInvoiceItem = () => {
		updateFormData(undefined, invoiceItemData);
		setInvoiceItemData({
			description: '',
			price: '',
			quantity: '',
			key: invoiceItemList.length,
		});
	};

	return (
		<div className='min-w-full scroll-snap-align-start'>
			<h1 className='font-bold text-3xl'>Invoice Items</h1>
			<form className='mt-4 w-full flex flex-col gap-4 p-1 mb-4'>
				<Input
					type='text'
					label='Description'
					className='w-full'
					size='sm'
					value={invoiceItemData.description}
					name='description'
					tabIndex={currentStep === 3 ? 1 : -1}
					onChange={handleFormDataChange}
				/>
				<div className='flex flex-row gap-4 items-center'>
					<Input
						type='text'
						label='Quantity'
						className='w-1/2'
						size='sm'
						value={invoiceItemData.quantity}
						name='quantity'
						tabIndex={currentStep === 3 ? 2 : -1}
						onChange={handleFormDataChange}
					/>
					<Input
						type='text'
						label='Price'
						className='w-1/2'
						size='sm'
						value={invoiceItemData.price}
						name='price'
						tabIndex={currentStep === 3 ? 3 : -1}
						onChange={handleFormDataChange}
					/>
				</div>
				<Button
					color='primary'
					onClick={addInvoiceItem}
					tabIndex={currentStep === 3 ? 4 : -1}
				>
					Add Item
				</Button>
			</form>
			{isActive && <InvoiceList />}
		</div>
	);
}
