export default function CollectionHotkey({index}: {index: number}) {
   switch (true) {
    case index === 9:
        return <kbd>0</kbd>
    case index < 9:
        return <kbd>{index + 1}</kbd>
    default:
        return <div className="CollectionNumberPlaceholder"/>
    }
}