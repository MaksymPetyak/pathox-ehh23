"use client"

import Navbar from "@/components/Navbar";
import {CLCUpload} from "@/components/uploads/CLCUpload";

export default function CLCImportPage() {
  return (
      <div>
      <Navbar />
      <main className="flex flex-col justify-between p-24">
          <div className={"flex justify-center"}>
              <CLCUpload />
          </div>
      </main>
      </div>
  )
}
