import { CopyItemContentEvent } from "@/types";
import mitt, { Emitter } from "mitt";
import { ReactNode, createContext, useEffect } from "react";

type EventBusContextType = {
    emitter: Emitter<CopyItemContentEvent>,
};

export const EventBusContext = createContext<EventBusContextType>(
    {} as EventBusContextType);

export default function EventBusContextProvider(
    { children }: { children: ReactNode }
) {

    const emitter: Emitter<CopyItemContentEvent> = mitt<CopyItemContentEvent>();

    useEffect(() => {
        return () => {
            emitter.all.clear();
        };
    }, []);

    return <EventBusContext.Provider value={{
        emitter,
    }}>
        {children}
    </EventBusContext.Provider>
};
