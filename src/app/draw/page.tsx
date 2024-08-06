export default async function Page () {
 return(

    <div>
        <p className="text-3xl ">Posts</p>
        <ul className="list-disc pl-6 mt-4 space-y-2 ">
            {[...Array(20).keys()].map((i) => (
                <li key={i} >
                    <span className=" inline-block h-5 animate-pulse w-[200px]  rounded"
                    
                    style={{
                        animationDelay: "0.05s",
                        animationDuration: "1s"
                    }}>
                    </span>
                </li>
            ))}
        </ul>
    </div>


 )
}
