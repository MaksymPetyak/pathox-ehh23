"use client"

import Navbar from "@/components/Navbar";
import {useFHIRModels} from "@/hooks/useFHIRModel";
import React from "react";
import {GeneCountBar} from "@/components/charts/GeneCountBar";
import {MutationType} from "@/components/charts/MutationType";




function AnalysisViz() {
    const {models, isLoading, isError} = useFHIRModels()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError || !models) {
        return <div>Error loading data</div>
    }

    return (
        <div className={"w-full grid grid-cols-2 gap-16"}>
            <GeneCountBar models={models} />
            <MutationType models={models} />
        </div>
    )
}


export default function Analytics() {
    return (
        <div>
            <Navbar/>
            <main className="flex flex-col justify-between px-24 py-12">
                <div className={"flex justify-center"}>
                    <AnalysisViz/>
                </div>
            </main>
        </div>
    )
}
