import {Doughnut} from "react-chartjs-2";
import {FHIRModel} from "@/types/FHIRModel";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {colorScheme} from "@/components/charts/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            font: {
                size: 18,
            },
            text: 'Mutation types',
        },
    },
};


export function MutationType({models}: { models: FHIRModel[] }) {
    const mutationTypeCounts = React.useMemo(() => models.reduce((acc, item) => {
        acc[item.type_of_mutation] = (acc[item.type_of_mutation] || 0) + 1;
        return acc
    }, {}), [models])

    const data = {
        labels: Object.keys(mutationTypeCounts),
        datasets: [
            {
                label: 'Mutation types',
                data: Object.values(mutationTypeCounts),
                backgroundColor: colorScheme.slice(0, Object.keys(mutationTypeCounts).length),
            },
        ],
    };

    return (
        <div className={"flex justify-center items-center border border-gray-300 rounded-xl p-8"}>
            <Doughnut data={data} options={options}/>
        </div>
    )
}