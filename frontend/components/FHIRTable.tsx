"use client"

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, {useState} from "react";
import {FHIRModel} from "@/types/FHIRModel";
import {
    getHighlight,
    Highlight,
    HighlightDropdownMenu
} from "@/components/HighlightableRow";
import {GeneWarning} from "@/components/GeneWarning";
import {CommentableRow} from "@/components/CommentableRow";


interface DataTableProps {
    data: FHIRModel[],
}

export function FHIRTable({
                              data,
                          }: DataTableProps) {
    const [rowHighlights, setRowHighlights] = useState<Record<string, Highlight>>({});
    const [rowComments, setRowComment] = useState<Record<string, string>>({});

    let columns = Object.keys(data[0]).map(key => ({
        accessorKey: key,
        header: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Converts snake_case to Title Case
        cell: ({row}) => {

            return (
                <CommentableRow
                    rowId={row.id}
                    text={rowComments[row.id] || ""}
                    setRowText={setRowComment}
                >
                    <HighlightDropdownMenu
                        rowId={row.id}
                        setRowHighlights={setRowHighlights}
                    >
                        <div className="capitalize">{row.getValue(key)}</div>
                    </HighlightDropdownMenu>
                </CommentableRow>
            )
        }
    }))
    // TODO: For now just have hard coded value for where to throw the warning
    columns.unshift({
        accessorKey: "comment",
        header: "",
        cell: ({row}) => {
            if (rowComments[row.id] === undefined) {
                return null
            }

            return (
                <ChatBubbleBottomCenterTextIcon className={"w-6 h-6"} />
            )
        }
    })
    columns.unshift({
        accessorKey: "warning",
        header: "",
        cell: ({row}) => {
            if (row.index != 2 || rowHighlights[row.id] === "red") {
                return null
            }

            return (
                <GeneWarning geneName={row.original.gene_name}/>
            )
        }
    })

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border text-xs">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => {
                                return (
                                    <TableHead key={index}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, index) => (
                            <TableRow
                                key={index}
                                className={getHighlight(rowHighlights[row.id])}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell, index) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
