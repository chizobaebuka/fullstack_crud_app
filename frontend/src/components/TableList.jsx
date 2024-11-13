export default function TableList({ handleOpen }) {
    const clients = [
        {
            id: 1,
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            rate: 700,
            isactive: true,
        },
        {
            id: 2,
            name: "Lorrie Bagnal",
            job: "Senior Sales Associate",
            rate: 800,
            isactive: true,
        },
        {
            id: 3,
            name: "Cathlene Trowler",
            job: "Human Resources Assistant III",
            rate: 600,
            isactive: false,
        },
    ]

    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {/* row 1 */}
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <th>{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.job}</td>
                                <td>{client.rate}</td>
                                <td>
                                    <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary` : `btn-outline-primary`}`}>
                                        {client.isactive ? `Active` : `Inactive`}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleOpen('edit')} className="btn btn-secondary">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-accent">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}