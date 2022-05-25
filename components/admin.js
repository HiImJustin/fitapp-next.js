export default function AdminPannel({
    dataType,
    header1,
    header2,
    header3,
    header4,
    button,
    data,
    email,
    ip,
    totalReqs,
}) {
    return (
        <main className="w-[98%]">
            <section className="">
                <div className="w-11/12 rounded-md mx-auto flex">
                    <div>{email}</div>
                    <div>{ip}</div>
                    <div>{totalReqs}</div>
                </div>
                <h1>{dataType}</h1>
                <div className="grid grid-cols-[25%_14%_24%_25%_12%] border-t border-r border-l text-center border-black">
                    <div className="border-r border-b border-black">
                        {header1}
                    </div>
                    <div className="border-r border-b border-black">
                        {header2}
                    </div>
                    <div className="border-r border-b border-black">
                        {header3}
                    </div>
                    <div className="border-r border-b border-black">
                        {header4}
                    </div>
                    <div className="border-b border-black">{button}</div>
                    {data}
                </div>
            </section>
        </main>
    );
}
