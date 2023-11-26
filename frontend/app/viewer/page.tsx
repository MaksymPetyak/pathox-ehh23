"use client"

import Navbar from "@/components/Navbar";
import {FHIRTable } from "@/components/FHIRTable";
import { useFHIRModels } from "@/hooks/useFHIRModel";
import { Textarea } from "@/components/ui/textarea"

import React from "react";


function Report() {

    return (
        <div className={"flex flex-col gap-2"}>
            <p className={"text-slate-700 font-semibold text-lg"}>Report</p>
            <Textarea rows={6} className={"max-w-3xl border-2 border-slate-500 focus:n"}/>
        </div>
    )
}

function TableWrapper() {
    const {models, isLoading, isError} = useFHIRModels()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError || !models) {
        return <div>Error loading data</div>
    }


    return (
        <div className={"px-24 py-4"}>
            <div className={"flex flex-col gap-8"}>
                {/*<Report />*/}
                <p className={"text-slate-700 font-semibold text-lg"}>Mutations</p>
                <FHIRTable data={models} />
            </div>
        </div>
    )
}


export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="flex min-h-screen flex-col justify-between">
                <TableWrapper />
            </main>
        </div>
    )
}
