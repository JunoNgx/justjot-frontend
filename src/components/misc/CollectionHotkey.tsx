import { Box, Kbd } from "@mantine/core"

export default function CollectionHotkey({index}: {index: number}) {
   switch (true) {
    case index === 9:
        return <Kbd>0</Kbd>
    case index < 9:
        return <Kbd>{index + 1}</Kbd>
    default:
        return <Box className="collection-number-placeholder"/>
    }
}