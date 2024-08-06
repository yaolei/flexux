export async function generateMetadata ({params}: {params:{id:string}}) {
    return {
        title: "This is posts page."
    }
}

const Blog = ({params}: {params:{id:string}}) => {
    return <h1>This is Blog{params.id}</h1>
}

export default Blog;