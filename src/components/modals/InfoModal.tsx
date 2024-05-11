import ButtonWithLoader from '@/libs/components/ButtonWithLoader';
import { ContextModalProps } from '@mantine/modals';

const InfoModal = ({
    context,
    id,
    innerProps,
}: ContextModalProps <{ leftSection: React.ReactNode, modalBody: string }>) => (
    <div className="Modal">
        <div className="Modal__FlexWrapper">
            {innerProps.leftSection}
            <p>{innerProps.modalBody}</p>
        </div>
        <div className="Modal__BtnContainer">
            <ButtonWithLoader onClick={() => context.closeModal(id)}>
                Close
            </ButtonWithLoader>
        </div>
    </div>
);

export default InfoModal;