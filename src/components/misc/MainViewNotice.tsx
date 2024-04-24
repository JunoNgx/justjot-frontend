import { Box, Text } from "@mantine/core";

export default function MainViewNotice(
    { content }: { content: string }
) {
    return <Box className="main-view-notice__item">
        <Text fs="italic" ta="center">
            {content}
        </Text>
    </Box>
};
