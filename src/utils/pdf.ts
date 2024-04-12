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
	const headerHeight = 29; // Height of the header image
	const headerImageWidth = 85; // Width of the header image
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
	doc.text(personalInformation.address, headerX, yPos, {
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
	yPos += 20;

	// Add customer details
	doc.setFontSize(12);
	doc.setTextColor(0, 0, 0);
	doc.text(`Customer: ${customerInformation.fullname}`, margin, yPos);
	yPos += 10;
	doc.text(`ABN: ${customerInformation.abn}`, margin, yPos);
	yPos += 10;
	doc.text(`Address: ${customerInformation.address}`, margin, yPos);
	yPos += 10;
	doc.text(`Email: ${customerInformation.email}`, margin, yPos);
	yPos += 10;
	doc.text(`Phone Number: ${customerInformation.phoneNumber}`, margin, yPos);
	yPos += 20;

	// Define table styling
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
	doc.setFillColor(204, 204, 204); // Light gray
	doc.text('Total:', margin + colWidth, yPos + cellPadding);
	doc.text(
		'$' + getInvoiceTotal().toFixed(2),
		margin + 2 * colWidth + cellPadding,
		yPos + cellPadding
	);

	// setPdfUri(doc.output('datauristring'));
	const pdfBlob = doc.output('blob');

	return pdfBlob;
};
