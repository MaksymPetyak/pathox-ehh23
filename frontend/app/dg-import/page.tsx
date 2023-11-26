"use client"

import Navbar from "@/components/Navbar";
import {PatientUpload} from "@/components/uploads/PatientUpload";
import {CLCUpload} from "@/components/uploads/CLCUpload";
import {DGUpload} from "@/components/uploads/DGUpload";

export default function DGImportPage() {
  return (
      <div>
      <Navbar />
      <main className="flex flex-col justify-between p-24">
          <div className={"flex justify-center"}>
              <DGUpload />
          </div>
      </main>
      </div>
  )
}
