import { Box, Text } from "@mantine/core";

export default function DemoUserNotice() {
    return <Box className="demo-user-notice">
        <Text fs="italic" ta="center">
            You are using the test account. Data are periodically reset.
        </Text>
    </Box>
};
