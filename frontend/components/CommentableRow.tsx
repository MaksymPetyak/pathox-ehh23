import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Textarea} from "@/components/ui/textarea";

export const CommentableRow = ({children, rowId, text, setRowText}: {
    children: React.ReactNode,
    rowId: string,
    text: string,
    setRowText: (a: any) => void;
}) => {
    const [tempText, setTempText] = React.useState(text);

    const updateText = (text: string) => {
        setRowText(prev => ({
            ...prev,
            [rowId]: text
        }));
    };

    return (
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <Textarea
                    value={tempText}
                    rows={5}
                    onChange={(e) => setTempText(e.target.value)}
                    onBlur={(e) => {
                        updateText(e.target.value);
                        e.preventDefault();
                    }}/>
            </PopoverContent>
        </Popover>
    );
};
