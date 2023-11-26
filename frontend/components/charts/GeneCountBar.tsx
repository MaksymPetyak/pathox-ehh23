import {FHIRModel} from "@/types/FHIRModel";
import React from "react";
import {Bar} from "react-chartjs-2";
import {randomInt} from "@/components/charts/utils";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

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
            text: 'Gene count',
        },
    },
};

export function GeneCountBar({models}: { models: FHIRModel[] }) {
    const mutationTypeCounts = React.useMemo(() => models.reduce((acc, item) => {
        acc[item.gene_name] = (acc[item.gene_name] || 0) + 1 + randomInt(0, 10);
        return acc;
    }, {}), [models]);

    const data = {
        labels: Object.keys(mutationTypeCounts),
        datasets: [
            {
                label: 'Total',
                data: Object.values(mutationTypeCounts),
                backgroundColor: 'rgba(50, 50, 255, 0.8)',
            },
            {
                label: 'Highlighted',
                data: Object.values(mutationTypeCounts).map((count) => Math.max(count - randomInt(0, 4), 0)),
                backgroundColor: 'rgba(255, 50, 50, 0.8)',
            }
        ]
    }

    return (
        <div className={"flex justify-center items-center border border-gray-300 rounded-xl p-8"}>
            <Bar options={options} data={data} />
        </div>
    )
}
