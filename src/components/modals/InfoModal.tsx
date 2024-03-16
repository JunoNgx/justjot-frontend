import { Button, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';

const InfoModal = ({
    context,
    id,
    innerProps,
}: ContextModalProps <{ topBanner: React.ReactNode, modalBody: string }>) => (
    <>
        {innerProps.topBanner}
        <Text size="sm">{innerProps.modalBody}</Text>
        <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
                Close
        </Button>
    </>
);

export default InfoModal;