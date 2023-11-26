import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


export function GeneWarning({ geneName }: {geneName: string }) {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <ExclamationTriangleIcon className={"text-yellow-500 w-8 h-8"} />
                </TooltipTrigger>
                <TooltipContent className={"w-64"}>
                    <p>Previously the same mutation with gene "{geneName}" has been highlighted red. </p>
                    <p className={"text-blue-500 underline hover:cursor-pointer"}>Learn more</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}