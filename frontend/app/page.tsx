"use client"

import Navbar from "@/components/Navbar";
import {PatientUpload} from "@/components/uploads/PatientUpload";

export default function Home() {
  return (
      <div>
      <Navbar />
      <main className="flex flex-col justify-between p-24">
          <div className={"flex justify-center"}>
              <PatientUpload />
          </div>
      </main>
      </div>
  )
}
