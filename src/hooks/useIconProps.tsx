export default function useIconProps() {

    const itemIconProps = {
        size: 24,
        stroke: 1.5,
    };

    const themeModeIconProps = {
        size: 18,
        stroke: 2,
    };

    const menuIconProps = {
        size: 18,
        stroke: 2,
    };

    const mainInputIconProps = {
        size: 32,
        stroke: 1.5,
    };

    const spotlightIconProps = {
        size: 32,
        stroke: 1.5,
    };

    const logoIconProps = {
        size: 24,
        // TODO: figure why the custom icon is acting up
        stroke: "1.5",
    };

    const keyboardPromptIconProps = {
        size: 24,
        stroke: 1.5,
    }

    return {
        itemIconProps,
        themeModeIconProps,
        menuIconProps,
        mainInputIconProps,
        spotlightIconProps,
        logoIconProps,
        keyboardPromptIconProps,
    };
}