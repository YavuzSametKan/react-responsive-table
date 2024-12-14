import './index.css'
import Table from "./components/table"
import { patients } from "./mockData.js"

function App() {
    const handleDelete = (patientData) => {
        console.log("Deleted patient with ID:", patientData)
    }

    const handleUpdate = (rowData) => {
        console.log("Update patient with ID:", rowData)
    }

    const handleDetail = (rowData) => {
        console.log("View details for patient with ID:", rowData)
    }

    return(
        <Table
            head={[
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
            ]}
            body={patients.map(patient => ({
              id: { data: patient.id, visibility: false },
              name: patient.name,
              age: patient.age,
              gender: patient.gender,
              diagnosis: patient.diagnosis,
              admissionDate: patient.admissionDate,
              dischargeDate: patient.dischargeDate,
              doctor: patient.doctor,
              contact: patient.contact,
              address: patient.address,
              status: {
                  content: (
                      <span
                          className={`h-8 max-md:h-6 inline-flex text-nowrap px-3 max-md:px-2 items-center justify-center rounded-[2rem] border-2 
                        ${patient?.status === "Discharged" && "bg-red-400 border-red-600 text-white"} 
                        ${patient.status === "Under Treatment" && "bg-green-600 border-green-700 text-white"}`}
                      >
                          {patient?.status}
                      </span>
                  ),
                  searchableText: patient?.status,
              },
            }))}
            searchable={true}
            selectable={true}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onDetail={handleDetail}
            textSize="text-sm"
        />
    )
}

export default App
