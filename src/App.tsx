import { Button, Modal, Progress } from '@nextui-org/react';
import { ReactNode, useRef, useState } from 'react';
import FormCarousel from './components/FormCarousel';
import Address from './components/modals/Address';
import Review from './components/modals/Review';
import { useInvoiceData } from './hooks/useInvoiceData';
import { usePdf } from './hooks/usePdf';

function App() {
	const totalSteps = 3;
	const carouselRef = useRef<HTMLElement | null>(null);

	const [isOpenModal, setIsOpenModal] = useState(false);
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);

	const { currentStep, setCurrentStep } = useInvoiceData();

	const { sendInvoice } = usePdf();

	const openModal = (view: string) => {
		switch (view) {
			case 'review':
				setModalContent(
					<Review setOpenModal={setIsOpenModal} onAction={onFinish} />
				);
				break;
			case 'address':
				setModalContent(<Address setIsOpenModal={setIsOpenModal} />);
				break;
		}
		setIsOpenModal(true);
	};

	const onFinish = () => {
		sendInvoice();
		setIsOpenModal(false);
	};

	const goNextStep = () => {
		setCurrentStep((prevState) => {
			if (prevState < totalSteps && carouselRef.current) {
				carouselRef.current.scrollLeft =
					(carouselRef.current.clientWidth + 16) * prevState;
				return prevState + 1;
			} else if (currentStep === 3) {
				openModal('review');
			}

			return prevState;
		});
	};

	const goPrevState = () => {
		setCurrentStep((prevState) => {
			if (prevState > 1 && carouselRef.current) {
				carouselRef.current.scrollLeft =
					(carouselRef.current.clientWidth + 16) * (prevState - 2);
				return prevState - 1;
			}

			return prevState;
		});
	};

	return (
		<main className='dark text-foreground bg-background bg-opacity-95 w-screen h-screen flex justify-center items-center overflow-x-auto'>
			<section className='bg-gray-800 bg-opacity-20 p-4 rounded-lg w-1/3 shadow-lg flex flex-col items-center'>
				<Progress
					value={(currentStep * 100) / totalSteps}
					className='max-w-md my-4'
					size='sm'
				/>

				<section
					className='overflow-x-hidden w-full overflow-y-hidden'
					style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
					ref={carouselRef}
				>
					<FormCarousel currentStep={currentStep} openModal={openModal} />
				</section>
				<section
					className={`w-full flex flex-row mt-4 ${
						currentStep > 1 ? 'justify-between' : 'justify-end'
					}`}
				>
					{currentStep > 1 && (
						<Button variant='light' onClick={goPrevState}>
							Prev
						</Button>
					)}
					<Button color='primary' variant='ghost' onClick={goNextStep}>
						Next
					</Button>
				</section>
			</section>

			<Modal isOpen={isOpenModal} className='dark text-foreground'>
				{modalContent}
			</Modal>
			{/* <iframe className='w-1/2' src={pdfUri} frameBorder='0'></iframe> */}
		</main>
	);
}

export default App;
