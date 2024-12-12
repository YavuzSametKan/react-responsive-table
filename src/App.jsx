import './index.css'
import Table from "./components/table"
import { patients } from "./mockData.js";

function App() {
  const head = [
      {title: 'Ad-Soyad', sortable: true},
      {title: 'Yaş', sortable: true},
      {title: 'Cinsiyet'},
      {title: 'Teşhis'},
      {title: 'Kabul Tarihi', sortable: true},
      {title: 'Taburcu Tarihi', sortable: true},
      {title: 'Doktor'}, // width parameter optional
      {title: 'İletişim'},
      {title: 'Adres'},
      {title: 'Durum'}
  ]

  return(
      <main className="p-6 bg-gray-100 min-h-screen">
          <Table
              head={head}
              searchable={true}
              selectable={true}
              body={patients.map(patient => [
                  patient.name,
                  patient.age,
                  patient.gender,
                  patient.diagnosis,
                  patient.admissionDate,
                  patient.dischargeDate,
                  patient.doctor,
                  patient.contact,
                  patient.address,
                  {
                      content:
                          <span className={`h-8 max-md:h-6 inline-flex text-nowrap px-3 max-md:px-2 items-center justify-center rounded-[2rem] border-2 ${patient?.status === "Discharged" && "bg-red-400 border-red-600 text-white"} ${patient.status === "Under Treatment" && "bg-green-600 border-green-700 text-white"}`}>
                              {patient?.status}
                          </span>,
                      searchableText: patient?.status
                  }
              ])}
          />
      </main>
  )
}

export default App
