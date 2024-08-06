export default function Loading () {
    return(
        <ul className="list-disc pl-6 mt-4 space-y-2 ">
        {[...Array(20).keys()].map((i) => (
            <li key={i} >
                <span className=" inline-block h-5 animate-pulse w-[200px] bg-black rounded"
                
                style={{
                    animationDelay: "0.05s",
                    animationDuration: "1s"
                }}>
                </span>
            </li>
        ))}
    </ul>
    )

}