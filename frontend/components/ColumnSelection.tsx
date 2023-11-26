"use client"

import {SimpleModal} from "@/components/SimpleModal";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTriggerNoStyle,
} from "@/components/ui/select"
import {cn} from "@/lib/utils";
import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import useSendFile from "@/hooks/useSendFile";
import {useRouter} from "next/navigation";


interface ColumnSelectionProps {
    headers: string[]
    rows: any[][]
    file: File | null,
    requiredColumns: string[]
    redirectUrl: string
    name_map: { [key: string]: string }
}



function SelectHeaderMenu({children, selectionOptions, onSelect}: {
    children: React.ReactNode,
    selectionOptions: string[],
    onSelect: (value: string) => void;
}) {
    return (
        <Select onValueChange={onSelect}>
            <SelectTriggerNoStyle className="w-fit min-w-[100px]">
                {children}
            </SelectTriggerNoStyle>
            <SelectContent>
                {selectionOptions.map((option, index) => (
                    <SelectItem key={index} value={option} className={"text-xs"}>
                        <span>{option}</span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

function normaliseString(s: string) {
    return s.replace(/\s+/g, '').toLowerCase();

}


function getDefaultTags(headers: string[], selectionOptions: string[], name_map: { [key: string]: string }): Record<number, string | undefined> {
    const defaultTags: Record<number, string | undefined> = {};
    headers.forEach((header, index) => {
        if (selectionOptions.map((name) => normaliseString(name)).includes(normaliseString(header))) {
            defaultTags[index] = header;
        } else if (name_map[header] !== undefined) {
            defaultTags[index] = name_map[header];
        }

    });
    return defaultTags;
}


function anyColumnMissing(columnTags: Record<number, string | undefined>, requiredColumns: string[]) {
    const presentOptions = Object.values(columnTags).filter((value) => value !== undefined).map((value) => normaliseString(value ?? ""));
    const missingOptions = requiredColumns.filter((option) => !presentOptions.includes(normaliseString(option)));

    return missingOptions.length > 0;
}

function RequiredColumns({columnTags, requiredColumns}: { columnTags: Record<number, string | undefined>, requiredColumns: string[]}) {
    const presentOptions = Object.values(columnTags).filter((value) => value !== undefined).map((value) => normaliseString(value ?? ""));
    const missingOptions = requiredColumns.filter((option) => !presentOptions.includes(normaliseString(option)));

    if (missingOptions.length === 0) {
        return null;
    }

    return (
        <div className={"flex flex-wrap gap-1 items-center m-1"}>
            <p className={"text-sm"}>You are missing the following required fields:</p>
            {missingOptions.map((option, index) => (
                <div key={index} className={"flex flex-row gap-2 items-center"}>
                    <Badge variant={"destructive"} className={"text-xs w-fit"}>{option}</Badge>
                </div>
            ))}
        </div>
    )
}

export function ColumnSelection({headers, rows, file, requiredColumns, redirectUrl, name_map}: ColumnSelectionProps) {
    const {sendFile, isLoading, error, response} = useSendFile();

    const [columnTags, setColumnTags] = useState<Record<number, string | undefined>>(
        getDefaultTags(headers, requiredColumns, name_map)
    );

    const router = useRouter();

    if (!file) {
        return null;
    }

    const handleSelect = (columnIndex: number, option: string) => {
        if (columnTags[columnIndex] === option) {
            setColumnTags(prevTags => ({...prevTags, [columnIndex]: undefined}));
            return;
        }

        setColumnTags(prevTags => ({...prevTags, [columnIndex]: option}));
    };

    const handleSubmit = async () => {
        if (file) {
            await sendFile(file, columnTags);
            router.push(redirectUrl);
        }
    };

    const isAnyColumnMissing = anyColumnMissing(columnTags,  requiredColumns)

    return (
        <SimpleModal title={"Select columns for import"} onSubmit={handleSubmit} isDisabled={isAnyColumnMissing}>
            <RequiredColumns columnTags={columnTags} requiredColumns={requiredColumns}/>
            <Table>
                <TableCaption></TableCaption>
                <TableHeader className={"text-sm bg-gray-100"}>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index} className={cn(
                                "p-0 w-full h-full",
                                index === headers.length - 1 ? "text-right" : "text-left"
                            )}>
                                <div className={"flex flex-col gap-2 items-center m-1"}>
                                    <SelectHeaderMenu
                                        selectionOptions={requiredColumns}
                                        onSelect={(value: string) => handleSelect(index, value)}>
                                        {header}
                                    </SelectHeaderMenu>
                                    {columnTags[index] && <Badge
                                        className={"text-xs w-fit"}>{columnTags[index]}</Badge>}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex} className={"text-xs h-20"}>
                            {row.map((cell, cellIndex) => (
                                <TableCell
                                    key={cellIndex}
                                    className={cn(
                                        cellIndex === row.length - 1 ? "text-right" : "",
                                        "max-w-xs overflow-ellipsis overflow-hidden",
                                    )}
                                >
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </SimpleModal>
    )
}