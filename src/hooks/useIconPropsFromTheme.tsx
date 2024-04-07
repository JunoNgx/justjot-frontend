export default function useIconPropsFromTheme() {

    const itemIcontProps = {
        size: 24,
        stroke: 1,
    }

    const themeModeIconProps = {
        size: 18,
        stroke: 1.5,
    }

    const logoIconProps = {
        size: 24,
        // TODO: figure why the custom icon is acting up
        stroke: "1.5",
    }

    const menuIconProps = {
        size: 18,
        stroke: 1.5,
    }

    return {
        itemIcontProps,
        themeModeIconProps,
        menuIconProps,
        logoIconProps,
    };
};