import { Button, Group, Text, Box, Flex } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';

const InfoModal = ({
    context,
    id,
    innerProps,
}: ContextModalProps <{ leftSection: React.ReactNode, modalBody: string }>) => (
    <Box className="info-modal-body">
        <Flex className="info-modal-body__flex-wrapper"
            justify="space-between"
            gap="xl"
            p="md"
        >
            {innerProps.leftSection}
            <Text>{innerProps.modalBody}</Text>
        </Flex>
        <Group justify="center" mt="xl">
            <Button onClick={() => context.closeModal(id)}>
                Close
            </Button>
        </Group>
    </Box>
);

export default InfoModal;