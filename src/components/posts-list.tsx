'use client'
const PostsList = ({postdata}:any) => {
    return (
        <>
            <div className="w-full overflow-x-auto">            
            {postdata.map((item:any) => (
            <li key={item.id}>
                <h1 className="text-4xl md:text-5xl font-bold mb-5">{item.title}</h1>
                <p className=" max-auto leading-8 m-20">
                    {item.body}
                </p>
            </li>
            ))}
            </div>
        </>
    )
}
export default PostsList;