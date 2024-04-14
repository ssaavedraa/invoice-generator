import jsPDF from 'jspdf';
import {
	CustomerInformation,
	InvoiceItem,
	PersonalInformation,
} from '../context/InvoiceDataContext';

export const generatePDF = ({
	personalInformation,
	customerInformation,
	invoiceItemList,
}: {
	personalInformation: PersonalInformation;
	customerInformation: CustomerInformation;
	invoiceItemList: InvoiceItem[];
}) => {
	// Create a new jsPDF instance
	const doc = new jsPDF();

	const date = new Date();

	const day = date.getDate();
	const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
	const year = date.getFullYear();

	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedMonth = month < 10 ? `0${month}` : month;

	const currentDate = `${formattedDay}/${formattedMonth}/${year}`;

	const getInvoiceTotal = () =>
		invoiceItemList.reduce(
			(acc, item) => acc + +item.quantity * +item.price,
			0
		);

	// Set up some initial variables
	let yPos = 20; // Initial y position
	const margin = 10; // Margin for the content

	// Add header image
	const imageURL =
		'https://s3.amazonaws.com/santiagosaavedra.com.co/Firma-03.png'; // Replace with your image URL
	const headerHeight = 32; // Height of the header image
	const headerImageWidth = headerHeight * (85 / 29); // Width of the header image
	doc.addImage(
		imageURL,
		'JPEG',
		margin,
		margin,
		headerImageWidth,
		headerHeight,
		'logo.png',
		'MEDIUM'
	);

	// Add personal details
	const headerX = doc.internal.pageSize.width - margin;
	doc.setFontSize(24);
	doc.text(personalInformation.fullname, headerX, yPos, {
		align: 'right',
	});
	yPos += 5;
	doc.setFontSize(10);
	doc.setTextColor(161, 161, 170);
	doc.text(`ABN ${personalInformation.abn}`, headerX, yPos, {
		align: 'right',
	});
	yPos += 5;
	doc.text(personalInformation.email, headerX, yPos, {
		align: 'right',
	});
	yPos += 5;
	doc.text(personalInformation.phoneNumber, headerX, yPos, {
		align: 'right',
	});
	yPos += 5;
	doc.text(personalInformation.address, headerX, yPos, {
		align: 'right',
	});
	yPos += 20;

	// Add customer details
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text('Invoice For:', margin, yPos);
	yPos += 10;
	doc.setFontSize(24);
	doc.text(`${customerInformation.fullname}`, margin, yPos);
	yPos += 8;
	doc.setFontSize(10);
	doc.setTextColor(161, 161, 170);

	if (customerInformation.abn) {
		doc.text(`ABN: ${customerInformation?.abn}`, margin, yPos);
	}

	if (customerInformation.address) {
		doc.text(
			customerInformation?.address,
			doc.internal.pageSize.getWidth() / 2,
			yPos
		);
	}
	yPos += 5;

	doc.text(customerInformation.email, margin, yPos);

	if (customerInformation.phoneNumber) {
		doc.text(
			customerInformation?.phoneNumber,
			doc.internal.pageSize.getWidth() / 2,
			yPos
		);
	}
	doc.setTextColor(0, 0, 0);

	// Draw horizontal line
	yPos += 8;
	doc.setFillColor(0, 0, 0);
	doc.rect(
		margin,
		yPos,
		doc.internal.pageSize.getWidth() - margin * 2,
		0.5,
		'FD'
	);
	yPos += 8;

	// Define table styling
	doc.setFillColor(255, 255, 255);
	const tableHeaders = ['Description', 'Quantity', 'Price'];
	const colWidth = doc.internal.pageSize.width / tableHeaders.length;
	const rowHeight = 10;
	const cellPadding = 6;

	// Set font and font size for table
	doc.setFont('helvetica', 'bold');

	// Add table headers
	tableHeaders.forEach((header, index) => {
		doc.text(
			header,
			margin + index * colWidth + cellPadding,
			yPos + cellPadding
		);
	});

	// Set font and font size for table content
	doc.setFont('helvetica', 'normal');

	// Add table rows
	invoiceItemList.forEach((item) => {
		yPos += rowHeight;

		doc.text(item.description, margin + cellPadding, yPos + cellPadding);
		doc.text(
			item.quantity.toString(),
			margin + colWidth + cellPadding,
			yPos + cellPadding
		);
		doc.text(
			'$' + (+item.quantity * +item.price).toFixed(2),
			margin + 2 * colWidth + cellPadding,
			yPos + cellPadding
		);
	});

	yPos += 20;
	doc.setFontSize(12);
	doc.setFont('helvetica', 'bold');
	doc.text('Total:', margin + colWidth, yPos + cellPadding);
	doc.text(
		'$' + getInvoiceTotal().toFixed(2),
		margin + 2 * colWidth + cellPadding,
		yPos + cellPadding
	);
	yPos += 40;

	// invoice number
	doc.setFontSize(14);
	doc.setTextColor(0, 0, 0);
	doc.text('Invoice number:', margin, yPos);

	doc.setFontSize(10);
	doc.setTextColor(161, 161, 170);
	yPos += 5;
	doc.text('INV-0001', margin, yPos);
	yPos += 15;

	// Invoice date
	doc.setFontSize(14);
	doc.setTextColor(0, 0, 0);
	doc.text('Invoice date:', margin, yPos);

	doc.setFontSize(10);
	doc.setTextColor(161, 161, 170);
	yPos += 5;
	doc.text(currentDate, margin, yPos);
	yPos += 15;

	// payment details

	doc.setFontSize(14);
	doc.setTextColor(0, 0, 0);
	doc.text('Payment details:', margin, yPos);

	doc.setFontSize(10);
	doc.setTextColor(161, 161, 170);
	yPos += 5;
	doc.text('BSB: 063 010', margin, yPos);
	yPos += 5;
	doc.text('Account Number: 1504 4822', margin, yPos);

	// setPdfUri(doc.output('datauristring'));
	const pdfBlob = doc.output('blob');

	return pdfBlob;
};
