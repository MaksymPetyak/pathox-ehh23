import React from "react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem, ContextMenuTrigger
} from "@/components/ui/context-menu";


export type Highlight = "green" | "yellow" | "red"

export function getHighlight(highlight?: Highlight) {
    if (!highlight) {
        return undefined
    }

    let color = ""
    switch (highlight) {
        case "green":
            color = "bg-green-100 hover:bg-green-200"
            break
        case "yellow":
            color = "bg-yellow-100 hover:bg-yellow-200"
            break
        case "red":
            color = "bg-red-100 hover:bg-red-200"
            break
    }

    return color
}

export const HighlightDropdownMenu = ({children, rowId, setRowHighlights}: {
    children: React.ReactNode,
    rowId: string,
    setRowHighlights: (a: any) => void;
}) => {
    const selectHighlight = (highlight: Highlight) => {
        setRowHighlights(prev => ({
            ...prev,
            [rowId]: prev[rowId] === highlight ? undefined : highlight
        }));
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild className={"w-fit"}>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <div className="flex w-full gap-4 items-center" onClick={() => selectHighlight("green")}>
                        <div
                            className="w-4 h-4 rounded-full bg-green-400 border border-green-500"/>
                        <div>Green</div>
                    </div>
                </ContextMenuItem>
                <ContextMenuItem>
                    <div className="flex w-full gap-4 items-center" onClick={() => selectHighlight("yellow")}>
                        <div
                            className="w-4 h-4 rounded-full bg-yellow-400 border border-yellow-500"/>
                        <div>Yellow</div>
                    </div>
                </ContextMenuItem>
                <ContextMenuItem>
                    <div className="flex w-full gap-4 items-center" onClick={() => selectHighlight("red")}>
                        <div
                            className="w-4 h-4 rounded-full bg-red-400 border border-red-500"/>
                        <div>Red</div>
                    </div>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
