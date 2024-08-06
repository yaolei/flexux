type dataRepository = {
    id:string;
    title:string;
    body:string;
}

const getData = async () => {
    // await new Promise((resolve, reject) => {setTimeout(resolve,5000)})
    const req = await fetch(`https://dummyjson.com/posts?limit=20`, {next:{revalidate:5}})
    if (!req.ok) throw new Error("Error in fetching data!")
    return  req.json();
}
const Posts = async () => {
    const {posts} = await getData();
    return (
        <main className="text-center pt-32 px-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">welcome to Detail page</h1>
        {posts.map((item:dataRepository) => (
            <li key={item.id}>
                <h1 className="text-4xl md:text-5xl font-bold mb-5">{item.title}</h1>
                <p className=" max-auto leading-8 m-20">
                    {item.body}
                </p>
            </li>
            ))}
        </main>
    )
}

export default Posts;





