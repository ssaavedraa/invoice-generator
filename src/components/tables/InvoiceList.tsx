import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useInvoiceData } from '../../hooks/useInvoiceData';

export default function InvoiceList() {
	const columns = [
		{
			key: 'description',
			label: 'DESCRIPTION',
		},
		{
			key: 'quantity',
			label: 'QUANTITY',
		},
		{
			key: 'price',
			label: 'PRICE (E.A)',
		},
	];

	const [invoiceTotal, setInvoiceTotal] = useState<number>(0);

	const { invoiceItemList } = useInvoiceData();

	const getInvoiceTotal = () =>
		invoiceItemList.reduce(
			(acc, item) => acc + +item.quantity * +item.price,
			0
		);

	useEffect(() => {
		setInvoiceTotal(getInvoiceTotal());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invoiceItemList]);

	return (
		invoiceItemList.length > 0 && (
			<>
				<Table
					className='shadow-md'
					classNames={{
						wrapper: 'p-0',
					}}
				>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn key={column.key}>{column.label}</TableColumn>
						)}
					</TableHeader>
					<TableBody items={invoiceItemList}>
						{(item) => (
							<TableRow key={item.key}>
								{(columnKey) => (
									<TableCell
										className={`${
											columnKey === 'price' ? 'w-1/6 text-right' : ''
										}`}
									>{`${columnKey === 'price' ? '$' : ''}${getKeyValue(
										item,
										columnKey
									)}`}</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
				<div className='w-full bg-default-100 rounded-b-xl pt-3 px-3 pb-1 -mt-2 font-bold flex flex-row flex-nowrap justify-between'>
					<span>Total</span>
					<span>${invoiceTotal}</span>
				</div>
			</>
		)
	);
}
