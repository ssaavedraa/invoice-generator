import { generatePDF } from '../utils';
import { useInvoiceData } from './useInvoiceData';

export const usePdf = () => {
	const baseUrl = import.meta.env.VITE_API_URL;

	const { personalInformation, customerInformation, invoiceItemList } =
		useInvoiceData();

	const date = new Date();

	const day = date.getDate();
	const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
	const year = date.getFullYear();

	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedMonth = month < 10 ? `0${month}` : month;

	const currentDate = `${formattedDay}/${formattedMonth}/${year}`;

	const amountDue = invoiceItemList.reduce(
		(acc, item) => acc + +item.quantity * +item.price,
		0
	);

	const emailBody = `
Dear ${customerInformation.fullname},

I hope this email finds you well.

Attached to this email, please find the invoice provided to you on ${currentDate}. The invoice details are as follows:

Invoice Date: ${currentDate}
Amount Due: $${amountDue}

If you have any questions or concerns regarding the invoice, please do not hesitate to contact me at ${personalInformation.email} or ${personalInformation.phoneNumber}.

Thank you for your prompt attention to this matter.

Best regards,

${personalInformation.fullname}
${personalInformation.email}
${personalInformation.phoneNumber}

*This is an unattended email address, for any inquire please use the contact information provided above.
`;

	const sendInvoice = () => {
		const invoiceFile = generatePDF({
			personalInformation,
			customerInformation,
			invoiceItemList,
		});

		const formData = new FormData();
		formData.append('file', invoiceFile, `invoice - ${currentDate}.pdf`);
		formData.append('to', customerInformation.email);
		formData.append('subject', `Invoice from ${personalInformation.fullname}`);
		formData.append('body', emailBody);

		fetch(`${baseUrl}/email`, {
			method: 'POST',
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					console.log('PDF invoice uploaded successfully!');
				} else {
					console.error('Failed to upload PDF invoice');
				}
			})
			.catch((error) => {
				console.error('Error uploading PDF invoice:', error);
			});
	};

	return { sendInvoice };
};
